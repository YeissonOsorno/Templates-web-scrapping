
//let params = [job.title,job.url,job.temp];

/* Creo una Multi location y paso los parametros */
let result = new MultiLocation('-', job.location, job.title, job.url, job.temp);
/* Llamo el metodo que me devuelve el con los jobs del multilocation */
result = result.operationMultilocation();
/* Inserto cada job en el array principal de Jobs */
result.map(location => jobs.push(location));

function MultiLocation(char_separator, valueJobs, ...data) {
    this.char_separator = char_separator;
    this.valueJobs = valueJobs;
    this.data = data;
    this.operationMultilocation = function () {
        let jobsx = [];
        let locations = this.valueJobs.split(this.char_separator);
        for (var x in locations) {
            var jobx = {};
            jobx.title = this.data[0];
            jobx.url = this.data[1];
            jobx.location = locations[x];
            jobx.dateposted_raw = data[2];   
            jobx.dateclosed_raw = data[3];
            jobx.source_empname = data[4];
            jobx.experience_required = data[5];
            jobx.temp = this.data[6]
            jobsx.push(jobx);
        }
        return jobsx
    }

}