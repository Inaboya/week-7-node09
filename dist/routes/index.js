"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let books = require('../../database.json');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(books);
});
exports.default = router;
// if (!existsSync('database.json')) {
//   writeFileSync('database.json', '[]')
// }
// let result = readFileSync('database.json', { encoding: 'utf8' })
//# sourceMappingURL=index.js.map