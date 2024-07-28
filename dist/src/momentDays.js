const moment = require('moment-timezone');

function oneDay(days){
    return moment().add(days, 'day').format();
}

exports.oneDay = oneDay;
