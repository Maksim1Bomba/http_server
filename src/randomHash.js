// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
import * as crypto from "crypto";
function randomChars(length) {
    var result = '';
    var chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    var charsLength = chars.length;
    var counter = 0;
    while (counter < length) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
        counter += 1;
    }
    return result;
}
function createSHA256Hash(phrase) {
    var hash = crypto.createHash('sha256');
    hash.update(phrase);
    return hash.digest('hex');
}
function randomHash(length) {
    return createSHA256Hash(randomChars(length));
}
export { randomHash };

