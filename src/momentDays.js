const moment = require('moment-timezone');

function oneDay(days){
    return moment().add(days, 'day').format();
}

console.log(typeof oneDay(1));

//export { oneDay };
