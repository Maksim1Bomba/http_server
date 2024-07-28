"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var config_1 = require("../config");
var router_1 = require("./router");
var auth_1 = require("./auth");
var users_1 = require("./users");
// TODO: authentication and authorization
// TODO: router must be module and object oriented | types!
// TODO: logger | 50/50
// TODO: ACL
var Server = /** @class */ (function () {
    function Server() {
        this.router = new router_1.Router();
    }
    Server.prototype.start = function () {
        var _this = this;
        this.server = http.createServer({}, function (req, res) {
            res.setHeader("Content-Type", "application/json");
            var jsonRequest = {};
            var data = [];
            req.on('data', function (chunk) {
                data.push(chunk.toString());
            });
            req.on('end', function () {
                try {
                    jsonRequest = JSON.parse(data.join(''));
                }
                catch (e) {
                    console.log('Error while parsing json request', e);
                    jsonRequest = {};
                }
                try {
                    var route = _this.router.find(req.url);
                    if (!route) {
                        res.statusCode = 404;
                        res.statusMessage = http.STATUS_CODES[404];
                    }
                    else {
                        route.callback(req, res, jsonRequest);
                    }
                    console.log('request completed', req.url);
                }
                catch (e) {
                    res.statusCode = 500;
                    res.statusMessage = http.STATUS_CODES[500];
                    console.log(e);
                }
                res.end();
            });
        });
    };
    Server.prototype.listen = function (port) {
        this.server.listen(port);
    };
    return Server;
}());
var server = new Server();
server.router.add('/login', auth_1.login);
server.router.add('/create', users_1.create);
server.router.add('/check', users_1.create);
server.start();
server.listen(config_1.config.http_server.port);
