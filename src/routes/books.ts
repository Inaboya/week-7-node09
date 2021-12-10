import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import path from "path";
import { Book, ErrorInt } from "./interface";

import { fstat, writeFile, readFileSync } from "fs";
let filePath = path.join(__dirname, "../../database.json");

import { authUser }  from "./users";

/* GET books listing. */

// const readBooks = () => {
//   return readFileSync(filePath)
// }

let books = require("../../database.json");


router.get("/" , authUser, function (req: Request, res: Response, next: NextFunction) {

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

router.get("/post", authUser, (req: Request, res: Response, next: NextFunction) => {

  res.render("add_books");
});

router.post("/post", authUser,  (req: Request, res: Response, next: NextFunction) => {
  // const { error } = validateGenre(req.body)
  // if (error) return res.status(400).send(error.details[0].message)



  const book: Book = {
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


router.get("/update/:id", authUser, (req: Request, res: Response, next: NextFunction) => {
  // res.render("add_books");

  const findBookId = books.find((el: any) => el.bookId === parseInt(req.params.id));

  if (findBookId) {
    const returnedBook = books.filter(
      (item: any) => item.bookId === parseInt(req.params.id)
    );

    res.render("edit_books", { returnedBook });
  }
});


router.put("/update/:id", authUser, (req: Request, res: Response, next: NextFunction) => {

  let book = books.find((b: Book) => b.bookId === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found.");
  let updatedBook = req.body;
  let result = update(book, updatedBook);
  


  writejsonFile(filePath, result);

  res.status(200).redirect("/books");

  

});

router.get(
  "/delete/:id", authUser, 
  (req: Request, res: Response, next: NextFunction) => {
    
    const book = books.find((b: Book) => b.bookId === parseInt(req.params.id));
    if (!book)
      return res.status(404).send("The book with the given ID was not found.");

    const index = books.indexOf(book);
    books.splice(index, 1);
    writejsonFile(filePath, books);
    res.status(200).redirect("/books");
  }
);

export function writejsonFile(filep: string, content: any) {
  writeFile(filep, JSON.stringify(content, null, 3), (err) => {
    if (err) return;
  });
}

function update(book: Book, updatedBook: Book) {
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

export default router;
