"use strict";
// // import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// const jwt = require('jsonwebtoken');
// // export async function(req : Request, res : Response, next : NextFunction) {
// //     const token = req.header('x-auth-token');
// //     if (!token) return res.status(401).send('Access denied. No token provided.');
// //     try {
// //         const user = jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g932");
// //         req.body.user = user;
// //     } catch (error) {
// //         res.status(400).send('Invalid token.');
// //     }
// // }
// // export const authUser = (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         const token = req.cookies.jwt;
// //         console.log(process.env.ACCESS_TOKEN_SCERET_KEY, "TOKEN");
// //         if (token) {
// //             jwt.verify(token, process.env.ACCESS_TOKEN_SCERET_KEY as string, (err: any, decodedToken: any) => {
// //                 // console.log(err)
// //                 if (err) {
// //                     res.redirect("/register")
// //                 } else {
// //                     next()
// //                 }
// //             })
// //         } else {
// //             res.redirect("/register")
// //         }
// //     } catch (error) {
// //         res.sendStatus(401);
// //     }
// // }
//# sourceMappingURL=checkAuth.js.map