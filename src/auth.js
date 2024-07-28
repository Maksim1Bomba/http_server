"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as http from 'http';
// import * as cookieParser from 'cookie';
// import * as randomHash from './randomHash.js';
var moment = require("./momentDays.js");
// TODO: redis
console.log(moment.oneDay());
// const config = {
//     name: 'auth_token',
//     expiresInDays: 3,
//     domain: '127.0.0.1',
//     path: '/',
//     secure: false,
// };
// const user_login = 'mickey';
// const user_passwd = '123';
// interface loginRequest {
//     login: string,
//     password: string
// }
// function login(req: http.IncomingMessage, res: http.ServerResponse, jsonRequest: loginRequest) {
//     const randomToken = randomHash.randomHash(5);
//     if (user_login === jsonRequest.login && user_passwd === jsonRequest.password) {
//         res.setHeader('Set-Cookie', cookieParser.serialize(
//             config.name,
//             randomToken,
//             {
//                 domain: config.domain,
//                 path: config.path,
//                 secure: config.secure,
//                 //expires: moment().add(config.expiresInDays, 'days').toDate()
//             }
//         ));
//         res.write(JSON.stringify({ success: true }));
//         return;
//     }
//     res.write(JSON.stringify({ success: false }));
// }
// function checkAuth(req: http.IncomingMessage, res: http.ServerResponse, jsonRequest: loginRequest) {
//     let loggedIn = false;
//     const cookie = cookieParser.parse(req.headers['cookie']);
//     res.write(JSON.stringify({ loggedIn }));
// }
// export { login, checkAuth };
