import * as http from 'http';

type RouteCallback = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    jsonRequest: Object
) => void;

interface Route {
    path: string,
    callback: RouteCallback
};

class Router {
    routes: Route[] = [];

    constructor() {
    }

    add(path: string, callback: RouteCallback) {
        this.routes.push({ path, callback });
    }

    find(url: string): void | Route {
        const foundRoutes = this.routes.filter(
            (r) => url.startsWith(r.path)
        );
        if (foundRoutes.length > 0) {
            return foundRoutes[0];
        }
        return;
    }
}

export { Router };
