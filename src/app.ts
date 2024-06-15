import * as http from 'http';
import { logging } from './logging';
// TODO: router must be module and object oriented | types!
// TODO: logger | 50/50
// TODO: ACL

interface Route {
    path: string,
    callback: (req: http.IncomingMessage, res: http.ServerResponse) => void
};

class Server {
    router: Array<Route> = [];
    server: http.Server;
    logger: Object;

    addRoute(r: Route) {
        this.router.push(r);
    }

    start() {
        this.server = http.createServer({}, (req: http.IncomingMessage, res: http.ServerResponse) => {
            try {
                const currentRoute = this.router.filter(
                    (r) => r.path === req.url
                );

                if (currentRoute.length === 0) {
                    res.statusCode = 404;
                    res.statusMessage = http.STATUS_CODES[404];
                } else {
                    currentRoute[0].callback(req, res);
                }

                logging(req.url);
                console.log('complete');

            } catch (e) {
                res.statusCode = 500;
                res.statusMessage = http.STATUS_CODES[500];
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

const server = new Server();

server.addRoute({ path: '/create', callback: (req, res) => { res.write('create') } });
server.addRoute({ path: '/delete', callback: (req, res) => { res.write('delete') } });

server.start();
server.listen(8000);

