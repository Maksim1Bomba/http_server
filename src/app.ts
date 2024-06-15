import * as http from 'http';
import { logging } from './logging';
// TODO: router must be module and object oriented | types!
// TODO: logger | 50/50
// TODO: ACL

class Server {
    paths: Array<string> = [];
    routers: Object = {};
    server: http.Server;
    logger: Object;
    state: Boolean = false;

    constructor(paths: Array<string>) {
        this.paths = paths;
    }

    addPaths(req, res) {
        let path = '';
        for (let i = 0; i <= this.paths.length - 1; i++) {
            path = '/' + this.paths[i];
            this.routers[path] = (req, res): void => { res.write('hello') };
        }
    }

    check(req, res) {
        if (!this.state) {
            this.addPaths(req, res);
            this.state = true;
        }
    }

    start() {
        this.server = http.createServer({}, (req: http.IncomingMessage, res: http.ServerResponse) => {
            this.check(req, res);
            try {
                this.routers[req.url](req, res);
                logging(req.url);
                console.log('complete');

            } catch (e) {
                res.statusCode = 500;
                logging(e);
                console.log(e);
            }
            res.end();

        });
    }

    listen(port: number) {
        this.server.listen(port)
    }
}

const server = new Server(['create', 'read', 'update', 'delete']);

server.start();
server.listen(8000);

