import * as http from 'http';

import { getCache } from './nosql';
import * as cookieParser from 'cookie';


// TODO: access with redis, then checking db psql and send information about user`
async function check(req: http.IncomingMessage, res: http.ServerResponse) {
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

    const token = await getCache(cookie.auth_token);
    if (!token) {
        res.write(JSON.stringify({ success: false }));
    } else {
        res.write(JSON.stringify({ success: true, id: token.id }));
    }

    return;
}

export { check };
