import express, { Request, Response, NextFunction } from "express";
import { writeFileSync, readFileSync, existsSync } from "fs";
const router = express.Router();
let books = require("../../database.json");

/* GET home page. */
router.get("/:id", function (req: Request, res: Response, next: NextFunction) {
//   res.render("about");
});

export default router;
