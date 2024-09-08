import * as http from 'http';

import config from '../config.json' assert { type: 'json' };

import { Router } from './router';
import { login } from './auth';
import { check, addUser } from './users';
import { add } from 'winston';

// TODO: authentication and authorization
// TODO: router must be module and object oriented | types!
// TODO: logger | 50/50
// TODO: ACL

class Server {
    server: http.Server;
    logger: Object;
    router: Router = new Router();

    start() {
        this.server = http.createServer({}, (req: http.IncomingMessage, res: http.ServerResponse) => {
            res.setHeader("Content-Type", "application/json");

            let jsonRequest: Object = {};

            let data: string[] = [];
            req.on('data', (chunk) => {
                data.push(chunk.toString());
            });
            req.on('end', async () => {
                try {
                    jsonRequest = JSON.parse(data.join(''));
                } catch (e) {
                    console.log('Error while parsing json request', e);
                    jsonRequest = {};
                }

                try {
                    const route = this.router.find(req.url);

                    if (!route) {
                        res.statusCode = 404;
                        res.statusMessage = http.STATUS_CODES[404];
                    } else {
                        await route.callback(req, res, jsonRequest);
                        console.log('request completed', req.url, jsonRequest);
                    }

                } catch (e) {
                    res.statusCode = 500;
                    res.statusMessage = http.STATUS_CODES[500];
                    console.log(e);
                }
                res.end();
            });
        });
    }

    listen(port: number) {
        this.server.listen(port)
    }
}

const server = new Server();

server.router.add('/login', login);
server.router.add('/check', check);
server.router.add('/user/add', addUser);

server.start();
server.listen(config.port);
