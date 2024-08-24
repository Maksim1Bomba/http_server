import * as redis from 'redis';
import moment from 'moment';

const client = redis.createClient();

function setCache(randomHash: string, user: string) {
    (async () => { client.connect() })();
    let despire = moment().add('1', 'day').format()
    client.hSet(randomHash, { id: user, timeout: despire })
        .then(() => { client.quit() });
}

async function getCache(hash: string) {
    (async () => { client.connect() })();
    const total = client.hGetAll(hash).then(value => {
        return value
    });
    total.then(() => { client.quit() });
    return total;
};

//setCache(randomHash.randomHash(5), 'user:14');
//getCache('user:123').then(res => console.log(res));

export { setCache, getCache };
