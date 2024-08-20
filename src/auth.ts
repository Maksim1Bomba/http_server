import * as http from 'http';
import moment from 'moment';
import * as cookieParser from 'cookie';
import * as randomHash from './randomHash';
import * as redis from './nosql';

console.log('Strting server at ' + moment().format());

const config = {
    name: 'auth_token',
    expiresInDays: 3,
    domain: '127.0.0.1',
    path: '/',
    secure: false,
};

const user_login = 'm';
const user_passwd = '123';

interface loginRequest {
    login: string,
    password: string
}

function login(req: http.IncomingMessage, res: http.ServerResponse, jsonRequest: loginRequest) {
    const randomToken = randomHash.randomHash(5);
    if (user_login === jsonRequest.login && user_passwd === jsonRequest.password) {
        res.setHeader('set-cookie', cookieParser.serialize(
            config.name,
            randomToken,
            {
                domain: config.domain,
                expires: moment().add(1, 'days').toDate(),
                path: config.path,
                secure: config.secure
            }
        ));
        const user: string = 'user:' + user_login;
        redis.setCache(randomToken, user);
        res.write(JSON.stringify({ success: true, id: user }));
        return;
    }
    res.write(JSON.stringify({ success: false }));
    return;
}

export { login };
