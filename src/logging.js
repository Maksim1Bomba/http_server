"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
function start_logging() {
    var winston = require('winston');
    var logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: './s.log' })
        ]
    });
    return logger;
}
function logging(data) {
    var logger = start_logging();
    logger.info(data);
}
exports.logging = logging;
logging('blabla');
