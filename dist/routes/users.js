"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const books_1 = require("./books");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
// import dotenv from "dotenv";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import jwt from "jsonwebtoken";
// import session from "express-session"
// import flash from "connect-flash";
let flash = require("connect-flash");
let session = require("express-session");
// let flash =
// require("dotenv").config();
// dotenv.config();
// const jwt = require("jsonwebtoken");
let filePath = path_1.default.join(__dirname, "../../users.json");
let books = require("../../database.json");
// import { secretOrKey } from "../config/keys";
const router = express_1.default.Router();
//Load input validation
const register_1 = require("../validation/register");
//Load User model
// let Users = require("../../users.json");
// router.post('/register', (req: Request, res : Response) => {
//     const { errors, isValid } = validateRegisterInput(req.body);
// })
let secret;
router.use(session({
    secret: "Inaboya",
    cookie: { max: 3600 },
    resave: false,
    saveUninitialized: true,
}));
router.use(flash());
router.get("/register", (req, res, next) => {
    res.render("register", {
        message: req.flash("message"),
        messageerror: req.flash("messageerror"),
    });
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    (0, fs_1.readFile)(filePath, { encoding: "utf-8" }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw new Error("Error reading file");
        let Users = JSON.parse(data);
        let user = Users.find((user) => user.email === email);
        if (user) {
            req.flash("message", "Choose another email. Email already exists...");
            res.redirect("/register");
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = {
            id: (0, uuid_1.v4)(),
            fullName: fullName,
            dateOfBirth: new Date(dateOfBirth).toISOString(),
            email: email,
            password: hashedPassword,
        };
        const validatedUser = (0, register_1.validateRegisterInput)(newUser);
        Users.push(validatedUser);
        (0, books_1.writejsonFile)(filePath, Users);
        // res.status(201).json(Users);
        //Token
        let max = "2h";
        const token = jsonwebtoken_1.default.sign({ email: validatedUser.email }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: max });
        res.cookie("jwt", token, { httpOnly: true });
        res.redirect("/login");
    }));
}));
// Login PAGE with EJS
router.get("/login", (req, res, next) => {
    res.render("login", {
        message: req.flash("message"),
        messageerror: req.flash("messageerror"),
    });
});
// Login Routes
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            req.flash("message", "Text fields are required...");
            res.redirect("/login");
            return;
        }
        (0, fs_1.readFile)(filePath, { encoding: "utf-8" }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw new Error("Error reading file");
            let Users = JSON.parse(data);
            let user = Users.find((user) => user.email === email);
            if (!user) {
                req.flash("message", "Invalid credentials...");
                res.redirect("/login");
                return;
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                req.flash("message", "Invalid password...");
                res.redirect("/login");
                return;
            }
            //Token
            let max = "2h";
            secret = process.env.ACCESS_TOKEN_SECRET_KEY;
            console.log(process.env.ACCESS_TOKEN_SECRET_KEY, "LOGIN STRING");
            const token = jsonwebtoken_1.default.sign({ email }, secret, {
                expiresIn: max,
            });
            res.cookie("jwt", token, { httpOnly: true });
            if (!token) {
                res.redirect("/login");
            }
            res.status(200).redirect("/books");
        }));
    }
    catch (error) { }
}));
const authUser = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(secret, "TOKEN****");
        if (token) {
            jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => {
                console.log(err);
                if (err) {
                    res.redirect("/register");
                }
                else {
                    next();
                }
            });
        }
        else {
            res.redirect("/register");
        }
    }
    catch (error) {
        res.sendStatus(401);
    }
};
exports.authUser = authUser;
exports.default = router;
//# sourceMappingURL=users.js.map