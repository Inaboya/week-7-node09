import express, { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import path from "path";
import { readFile } from "fs";
import { writejsonFile } from "./books";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
// import dotenv from "dotenv";

import jwt from "jsonwebtoken";

// import jwt from "jsonwebtoken";
// import session from "express-session"
// import flash from "connect-flash";

let flash = require("connect-flash");
let session = require("express-session");
// let flash =
// require("dotenv").config();

// dotenv.config();

// const jwt = require("jsonwebtoken");

let filePath = path.join(__dirname, "../../users.json");

let books = require("../../database.json");

// import { secretOrKey } from "../config/keys";

const router = express.Router();

interface User {
  id: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

//Load input validation

import { validateRegisterInput } from "../validation/register";
import { validateLoginInput } from "../validation/login";

//Load User model
// let Users = require("../../users.json");

// router.post('/register', (req: Request, res : Response) => {
//     const { errors, isValid } = validateRegisterInput(req.body);
// })

let secret: string;

router.use(
  session({
    secret: "Inaboya",
    cookie: { max: 3600 },
    resave: false,
    saveUninitialized: true,
  })
);

router.use(flash());

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("register", {
    message: req.flash("message"),
    messageerror: req.flash("messageerror"),
  });
});

router.post("/register", async (req: Request, res: Response) => {
  // const { fullName, email, password, password2 } = req.body;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  console.log(req.body, "req.body");

  const { fullName, email, dateOfBirth, password, password2 } = req.body;
  if (!fullName || !email || !password || !password2) {
    req.flash("message", "Text fields are required...");
    res.redirect("/register");
    return;
  }

  if (password !== password2) {
    req.flash("message", "Password doesn't not match");
    res.redirect("/register");
    return;
  }

  readFile(filePath, { encoding: "utf-8" }, async (err, data) => {
    if (err) throw new Error("Error reading file");

    let Users: User[] = JSON.parse(data);
    let user = Users.find((user) => user.email === email);

    if (user) {
      req.flash("message", "Choose another email. Email already exists...");
      res.redirect("/register");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: uuid(),
      fullName: fullName,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
      email: email,
      password: hashedPassword,
    };

    const validatedUser = validateRegisterInput(newUser);

    Users.push(validatedUser);

    writejsonFile(filePath, Users);

    // res.status(201).json(Users);

    //Token
    let max = "2h";
    const token = jwt.sign(
      { email: validatedUser.email },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: max }
    );

    res.cookie("jwt", token, { httpOnly: true });

    res.redirect("/login");
  });
});

// Login PAGE with EJS

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("login", {
    message: req.flash("message"),
    messageerror: req.flash("messageerror"),
  });
});

// Login Routes
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("message", "Text fields are required...");
      res.redirect("/login");
      return;
    }
    readFile(filePath, { encoding: "utf-8" }, async (err, data) => {
      if (err) throw new Error("Error reading file");

      let Users: User[] = JSON.parse(data);
      let user = Users.find((user) => user.email === email);

      if (!user) {
        req.flash("message", "Invalid credentials...");
        res.redirect("/login");
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        req.flash("message", "Invalid password...");
        res.redirect("/login");
        return;
      }

      //Token

      let max = "2h";

      secret = process.env.ACCESS_TOKEN_SECRET_KEY as string;
      // console.log(process.env.ACCESS_TOKEN_SECRET_KEY, "LOGIN STRING");

      const token = jwt.sign({ email }, secret as string, {
        expiresIn: max,
      });

      res.cookie("jwt", token, { httpOnly: true });
      if (!token) {
        res.redirect("/login");
      }

      res.status(200).redirect("/books");
    });
  } catch (error) {}
});

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    // console.log(secret, "TOKEN****");

    if (token) {
      jwt.verify(token, secret as string, (err: any, decodedToken: any) => {
        console.log(err);
        if (err) {
          res.redirect("/register");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/register");
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

export default router;
