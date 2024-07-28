import * as redis from 'redis';
import moment from 'moment-timezone';
import * as randomHash from './randomHash.js';

const client = redis.createClient();
(async () => { await client.connect(); })();

function setCache(randomHash, user){
    let despire = moment().add('1', 'day').format();    
    
    (async () => await client.hSet(user, { user: randomHash, timeout:  despire}))(); 
    
    (async () => { await client.quit(); })();
}

function getCache(user){
    let value = async () => { return JSON.stringify(await client.hGetAll(user)); };
    let total = (async () => { return await value(); })();
    
    (async () => { await client.quit(); })();

    return total;
};

//setCache(randomHash.randomHash(5), 'user:14');
getCache('user:123').then(res => console.log(res));

export { setCache, getCache };
