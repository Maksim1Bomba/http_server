"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
;
var Router = /** @class */ (function () {
    function Router() {
        this.routes = [];
    }
    Router.prototype.add = function (path, callback) {
        this.routes.push({ path: path, callback: callback });
    };
    Router.prototype.find = function (url) {
        var foundRoutes = this.routes.filter(function (r) { return url.startsWith(r.path); });
        if (foundRoutes.length > 0) {
            return foundRoutes[0];
        }
        return;
    };
    return Router;
}());
exports.Router = Router;
