function MultiLocation(char_separator,valueJobs, ...data){
        this.char_separator = char_separator;
        this.valueJobs = valueJobs;
        this.data = data;
        this.operationMultilocation = function(){
            let jobsx = [];
            let locations = this.valueJobs.split(this.char_separator);        
            for(var x in locations){
                var jobx = {};
                jobx.title = this.data[0];
                jobx.url = this.data[1];
                jobx.location = locations[x];
                jobx.temp = this.data[2]
                jobsx.push(jobx);
            }
            return jobsx
        }
        
}