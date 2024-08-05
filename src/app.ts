import * as http from 'http';
import { createClient } from 'redis';

import config from '../config.json';

import { Router } from './router';
import { login } from './auth';
import { create } from './users';

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
            req.on('end', () => {
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
                        route.callback(req, res, jsonRequest);
                    }
                    console.log('request completed', req.url);
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
server.router.add('/create', create);
server.router.add('/checkRedis', checkRedis);
server.router.add('/checkPostgres', checkPostgres);

server.start();
server.listen(config.port);

async function checkRedis() {
    const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    await client.set('key', 'valueZZZZZZZZZZ');
    const value = await client.get('key');
    console.log(value);
    await client.disconnect();
}

function checkPostgres() {
}
