import * as crypto from 'crypto';

function randomChars(length: number) {
    let result = '';
    let chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    let charsLength = chars.length;
    let counter = 0;
    while (counter < length) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
        counter += 1;
    }
    return result;
}
function createSHA256Hash(phrase: string) {
    var hash = crypto.createHash('sha256');
    hash.update(phrase);
    return hash.digest('hex');
}
function randomHash(length: number) {
    return createSHA256Hash(randomChars(length));
}
export { randomHash };


