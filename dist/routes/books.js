"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
let books = require('../../database.json');
const fs_1 = require("fs");
let filePath = path_1.default.join(__dirname, '../../database.json');
/* GET books listing. */
router.get('/', function (req, res, next) {
    writejsonFile(filePath, books);
    res.status(200).json(books);
});
/* GET particular book by ID */
router.get('/:id', (req, res, next) => {
    let book = books.find((c) => c.bookId === parseInt(req.params.id));
    if (!book)
        return res.status(404).send('The book with the given ID was not found.');
    res.status(200).json(book);
});
/* POST a new book by ID */
router.post('/', (req, res, next) => {
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
    res.status(201).json(book);
});
router.put('/:id', (req, res, next) => {
    let book = books.find((b) => b.bookId === parseInt(req.params.id));
    if (!book)
        return res.status(404).send('The book with the given ID was not found.');
    let body = req.body;
    let result = update(book, body);
    writejsonFile(filePath, books);
    res.status(200).json(result);
});
router.delete('/:id', (req, res, next) => {
    const book = books.find((b) => b.bookId === parseInt(req.params.id));
    if (!book)
        return res.status(404).send('The book with the given ID was not found.');
    const index = books.indexOf(book);
    books.splice(index, 1);
    writejsonFile(filePath, books);
    res.status(200).json(books);
});
function writejsonFile(filep, content) {
    (0, fs_1.writeFile)(filep, JSON.stringify(content, null, 3), (err) => {
        if (err)
            return;
    });
}
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