"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
function create(req, res) {
    res.setHeader("Content-Type", "application/json");
    var obj = { a: 5, b: '<b>blaba</b>' };
    res.write(JSON.stringify(obj));
    res.end();
}
exports.create = create;
