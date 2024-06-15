function start_logging() {
    const winston = require('winston');
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: './s.log' })
        ]
    });
    return logger
}

export function logging(data: string): void {
    const logger = start_logging();
    logger.info(data);
}



