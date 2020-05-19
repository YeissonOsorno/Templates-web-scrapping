(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.portfolio-item");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("h3").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("h6").textContent.trim().replace('| REMOTE LOCATIONS','');
      job.temp = 1;
      if(job.location.indexOf('|')>-1){
            let params = [job.title,job.url,job.temp,', US']
            const _multi_location = new MultiLocation('|',job.location,params);
          var _result = _multi_location.operationMultilocation();
            _result.map(item=> jobs.push(item))
  
      }else{
        jobs.push(job);
      }
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
  /* Función de Multilocation */
  
  function MultiLocation(char_separator,valueJobs, ...data){
    this.char_separator = char_separator;
    this.valueJobs = valueJobs;
    this.data = data;
    this.operationMultilocation = function(){
      let jobsx = [];
      let locations = this.valueJobs.split(this.char_separator);        
      for(var x in locations){
        var jobx = {};
        jobx.title = this.data[0][0];
        jobx.url = this.data[0][1];
        jobx.location = locations[x].trim() + this.data[0][3];
        jobx.temp = this.data[0][2];     
        jobsx.push(jobx);
      }
      return jobsx
    }        
  }