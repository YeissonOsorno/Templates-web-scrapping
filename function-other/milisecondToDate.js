convertMilisecondsToDate(ms);

function convertMilisecondsToDate(ms){
    var dateMs = new Date(ms);
    var _date = dateMs.toISOString().split('T').shift();
    return _date.split('-').reverse().join('/');    
}