"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.login = void 0;
var cookieParser = require("cookie");
var randomHash = require("./randomHash.js");
var moment = require("./momentDays.js");
var redis = require("./db.js");
// TODO: redis
console.log(moment.oneDay());
var config = {
    name: 'auth_token',
    expiresInDays: 3,
    domain: '127.0.0.1',
    path: '/',
    secure: false,
};
var user_login = 'mickey';
var user_passwd = '123';
function login(req, res, jsonRequest) {
    var randomToken = randomHash.randomHash(5);
    if (user_login === jsonRequest.login && user_passwd === jsonRequest.password) {
        res.setHeader('Set-Cookie', cookieParser.serialize(config.name, randomToken, {
            domain: config.domain,
            expires: moment.oneDay(config.expiresInDays),
            path: config.path,
            secure: config.secure
        }));
        redis.setCache(randomToken, 'user:123');
        res.write(JSON.stringify({ text: 'complete' }));
        return;
    }
    res.write(JSON.stringify({ success: false }));
}
exports.login = login;
function checkAuth(req, res, jsonRequest) {
    var loggedIn = false;
    var cookie = cookieParser.parse(req.headers['cookie']);
    res.write(JSON.stringify({ loggedIn: loggedIn }));
}
exports.checkAuth = checkAuth;
