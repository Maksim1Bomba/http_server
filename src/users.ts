import * as http from 'http';

import { getCache } from './nosql';
import * as cookieParser from 'cookie';


// TODO: access with redis, then checking db psql and send information about user`
function check(req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const cookieStr = req.headers['cookie'];
    if (!cookieStr) {
        res.write(JSON.stringify({ success: false }));
        return;
    }
    const cookie = cookieParser.parse(cookieStr);
    if (!cookie.auth_token) {
        res.write(JSON.stringify({ success: false }));
        return;
    }
    const cache = getCache(cookie.auth_token);

    cache.then(value => {
        if (!value) {
            res.write(JSON.stringify({ success: false }));
        } else {
            res.write(JSON.stringify({ success: true, id: value.id }));
        }
        return;
    });
}

export { check };
