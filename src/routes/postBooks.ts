import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


import bodyParser from 'body-parser';

const books = require('../../database.json');

const fsPath = path.join(__dirname, '../../database.json');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('postBooks');
});

router.post('/', urlencodedParser, (req: Request, res: Response) => {
    const newBook = {
        Title: req.body.Title,
        Author: req.body.Author,
        datePublished: req.body.datePublished,
        Description: req.body.Description,
        pageCount: req.body.pageCount,
        Genre: req.body.Genre,
        bookId: books.length + 1,
        Publisher: req.body.Publisher,
    }

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
    })
})



// router.delete('/:id', urlencodedParser, (req: Request, res: Response, id : number) => {
//     let deletedBook = books.filter(el => el.id !== id);
//     return deletedBook;

//     res.render('delete', 
// })

function WriteDateToFile(filePath: string, data: any) {
    fs.writeFile(filePath, JSON.stringify(data, null, " "), (err: any) => {
        if (err) {
            // console.log(err);
            return err;
        }
    });
}


export default router;