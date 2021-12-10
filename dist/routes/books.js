"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writejsonFile = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
let filePath = path_1.default.join(__dirname, "../../database.json");
const users_1 = require("./users");
/* GET books listing. */
// const readBooks = () => {
//   return readFileSync(filePath)
// }
let books = require("../../database.json");
router.get("/", users_1.authUser, function (req, res, next) {
    res.status(200).render("view_books", { books });
});
/* GET particular book by ID */
// router.get("/:id", authUser, (req: Request, res: Response, next: NextFunction) => {
//   let book = books.find((c: Book) => c.bookId === parseInt(req.params.id));
//   if (!book)
//     return res.status(404).send("The book with the given ID was not found.");
//   res.status(200).json(book);
// });
/* POST a new book by ID */
router.get("/post", users_1.authUser, (req, res, next) => {
    res.render("add_books");
});
router.post("/post", users_1.authUser, (req, res, next) => {
    // const { error } = validateGenre(req.body)
    // if (error) return res.status(400).send(error.details[0].message)
    const book = {
        Title: req.body.Title,
        Author: req.body.Author,
        datePublished: req.body.datePublished,
        Description: req.body.Description,
        pageCount: req.body.pageCount,
        Genre: req.body.Genre,
        bookId: books.length + 1,
        Publisher: req.body.Publisher,
    };
    books.push(book);
    writejsonFile(filePath, books);
    res.redirect("/books");
});
router.get("/update/:id", users_1.authUser, (req, res, next) => {
    // res.render("add_books");
    const findBookId = books.find((el) => el.bookId === parseInt(req.params.id));
    if (findBookId) {
        const returnedBook = books.filter((item) => item.bookId === parseInt(req.params.id));
        res.render("edit_books", { returnedBook });
    }
});
router.put("/update/:id", users_1.authUser, (req, res, next) => {
    let book = books.find((b) => b.bookId === parseInt(req.params.id));
    if (!book)
        return res.status(404).send("The book with the given ID was not found.");
    let updatedBook = req.body;
    let result = update(book, updatedBook);
    writejsonFile(filePath, result);
    res.status(200).redirect("/books");
});
router.get("/delete/:id", users_1.authUser, (req, res, next) => {
    const book = books.find((b) => b.bookId === parseInt(req.params.id));
    if (!book)
        return res.status(404).send("The book with the given ID was not found.");
    const index = books.indexOf(book);
    books.splice(index, 1);
    writejsonFile(filePath, books);
    res.status(200).redirect("/books");
});
function writejsonFile(filep, content) {
    (0, fs_1.writeFile)(filep, JSON.stringify(content, null, 3), (err) => {
        if (err)
            return;
    });
}
exports.writejsonFile = writejsonFile;
function update(book, updatedBook) {
    book.Title = updatedBook.Title ? updatedBook.Title : book.Title;
    book.Author = updatedBook.Author ? updatedBook.Author : book.Author;
    book.datePublished = updatedBook.datePublished
        ? updatedBook.datePublished
        : book.datePublished;
    book.Description = updatedBook.Description
        ? updatedBook.Description
        : book.Description;
    book.pageCount = updatedBook.pageCount
        ? updatedBook.pageCount
        : book.pageCount;
    book.Genre = updatedBook.Genre ? updatedBook.Genre : book.Genre;
    book.Publisher = updatedBook.Publisher
        ? updatedBook.Publisher
        : book.Publisher;
    book.dateEdited = new Date().toUTCString();
    return book;
}
exports.default = router;
//# sourceMappingURL=books.js.map