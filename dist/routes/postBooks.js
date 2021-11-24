"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const books = require('../../database.json');
const fsPath = path_1.default.join(__dirname, '../../database.json');
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('postBooks');
});
router.post('/', urlencodedParser, (req, res) => {
    const newBook = {
        Title: req.body.Title,
        Author: req.body.Author,
        datePublished: req.body.datePublished,
        Description: req.body.Description,
        pageCount: req.body.pageCount,
        Genre: req.body.Genre,
        bookId: books.length + 1,
        Publisher: req.body.Publisher,
    };
    books.push(newBook);
    WriteDateToFile(fsPath, books);
    res.render('postBooks', {
        Title: req.body.Title,
        Author: req.body.Author,
        datePublished: req.body.datePublished,
        Description: req.body.Description,
        pageCount: req.body.pageCount,
        Genre: req.body.Genre,
        bookId: books.length + 1,
        Publisher: req.body.Publisher,
    });
});
// router.delete('/:id', urlencodedParser, (req: Request, res: Response, id : number) => {
//     let deletedBook = books.filter(el => el.id !== id);
//     return deletedBook;
//     res.render('delete', 
// })
function WriteDateToFile(filePath, data) {
    fs_1.default.writeFile(filePath, JSON.stringify(data, null, " "), (err) => {
        if (err) {
            // console.log(err);
            return err;
        }
    });
}
exports.default = router;
//# sourceMappingURL=postBooks.js.map