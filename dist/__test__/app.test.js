"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
//test for GET
describe('GET /', () => {
    test('GET /', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
            expect(res.body[0]).toHaveProperty('bookId');
            expect(res.status).toBe(200);
        })
            .end((err, res) => {
            if (err)
                return done(err);
            return done();
        });
    });
    //test for put
    test('PUT /books/6', (done) => {
        (0, supertest_1.default)(app_1.default)
            .put(`/books/9`)
            .expect('Content-Type', /json/)
            .send({
            Title: 'Dragon Fly',
            Author: 'Jerry John',
            datePublished: '2000-0-12T19:0455.455z',
            Description: 'A Promised Land is a memoir by Barack Obama, the 44th President  is the first of a planned two-volume series',
            pageCount: 74,
            Genre: 'autobiography',
            bookId: 9,
            Publisher: 'Coke',
            dateEdited: 'Wed, 24 Nov 2021 05:15:05 GMT',
        })
            .expect(200)
            .expect((res) => {
            expect(res.body).toHaveProperty('bookId');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('dateEdited');
        })
            .end((err, res) => {
            if (err)
                return done(err);
            return done();
        });
    });
    // //test for post
    test('POST /books', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/books')
            .expect('Content-Type', /json/)
            .send({
            dateUploaded: 1637529157659,
            Title: 'agadns;gad',
            Author: 'Bsdmf.ngfga',
            datePublished: '2020-0-12T19:0455.455z',
            Description: 'A Promised Land is a memoir by Barack Obama.',
            pageCount: 574,
            Genre: 'd.m,fds.fd',
            Publisher: 'dgn;sdfj;aifg',
            dateEdited: '1637532140585',
        })
            .expect(201)
            .expect((res) => {
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('bookId');
        })
            .end((err, res) => {
            if (err)
                return done(err);
            return done();
        });
    });
    //test for delete
    test('DELETE /books/:id', (done) => {
        (0, supertest_1.default)(app_1.default)
            .delete('/books/11')
            .expect('Content-Type', /json/)
            .send({
            Title: 'agadns;gad',
            Author: 'Bsdmf.ngfga',
            datePublished: '2020-0-12T19:0455.455z',
            Description: 'A Promised Land is a memoir by Barack Obama.',
            pageCount: 574,
            Genre: 'd.m,fds.fd',
            bookId: 9,
            Publisher: 'dgn;sdfj;aifg',
        })
            .expect(200)
            .expect((res) => {
        })
            .end((err, res) => {
            if (err)
                return done(err);
            return done();
        });
    });
});
//# sourceMappingURL=app.test.js.map