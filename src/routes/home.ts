import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
let books = require("../../database.json");

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("home");
});


export default router;

// if (!existsSync('database.json')) {
//   writeFileSync('database.json', '[]')
// }
// let result = readFileSync('database.json', { encoding: 'utf8' })
