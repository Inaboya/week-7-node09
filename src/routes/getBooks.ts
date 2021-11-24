import express, { Request, Response, NextFunction } from "express";
import { writeFileSync, readFileSync, existsSync } from "fs";
const router = express.Router();
let books = require("../../database.json");

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
    res.render("home", {
      display : books
  });
});

export default router;
