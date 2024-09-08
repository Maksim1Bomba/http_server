import * as http from 'http';

import { createSHA256Hash, randomHash } from './randomHash'
import { addUserDB } from './db'
import { getCache } from './nosql';
import * as cookieParser from 'cookie';


// TODO: access with redis, then checking db psql and send information about user

interface UserAddRequest {
    name: string,
    login: string,
    password: string
}

async function addUser(req: http.IncomingMessage, res: http.ServerResponse, jsonRequest: UserAddRequest) {
    res.setHeader("Content-Type", "application/json");
    const hash = await randomHash(10);

    const name: string = jsonRequest.name;
    const login: string = jsonRequest.login;
    const password: string = await createSHA256Hash(jsonRequest.password + process.env.secret_word + hash);
    console.log(name, login, password, hash);

    await addUserDB(name, login, password, hash)

    res.write(JSON.stringify({ success: true }));

    return;
}

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

export { check, addUser };
