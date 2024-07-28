import * as http from 'http';

function create(req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const obj = { a: 5, b: '<b>blaba</b>' };
    res.write(JSON.stringify(obj));
    res.end();
}

export { create };
