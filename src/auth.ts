import * as http from 'http';
import moment from 'moment';
import * as cookieParser from 'cookie';
import * as randomHash from './randomHash';
import * as redis from './db';

console.log('Strting server at ' + moment().format());

const config = {
    name: 'auth_token',
    expiresInDays: 3,
    domain: '127.0.0.1',
    path: '/',
    secure: false,
};

const user_login = 'mickey';
const user_passwd = '123';

interface loginRequest {
    login: string,
    password: string
}

function login(req: http.IncomingMessage, res: http.ServerResponse, jsonRequest: loginRequest) {
    const randomToken = randomHash.randomHash(5);
    if (user_login === jsonRequest.login && user_passwd === jsonRequest.password) {
        res.setHeader('Set-Cookie', cookieParser.serialize(
            config.name,
            randomToken,
            {
                domain: config.domain,
                expires: moment().add(1, 'days').toDate(),
                path: config.path,
                secure: config.secure
            }
        ));
        redis.setCache(randomToken, 'user:123');
        res.write(JSON.stringify({ text: 'complete' }));
        return;
    }
    res.write(JSON.stringify({ success: false }));
}

function checkAuth(req: http.IncomingMessage, res: http.ServerResponse, jsonRequest: loginRequest) {
    let loggedIn = false;

    const cookie = cookieParser.parse(req.headers['cookie']);

    res.write(JSON.stringify({ loggedIn }));
}

export { login, checkAuth };
