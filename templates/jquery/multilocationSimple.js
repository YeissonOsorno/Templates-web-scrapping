(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.portfolio-item ");
    var jobs = [];
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job  = {};
      var elem = html_jobs[x];
      job.title    = elem.querySelector('h3').textContent.trim();
      job.url      = elem.querySelector('a[href*="career"]').href.trim();
      job.location = elem.querySelector('h6').textContent.trim();
      job.temp = "MAY-2020";
      var multilocation = "|";
      if(job.location.indexOf(multilocation)>-1){
        var aux = job.location.split(multilocation);
        for(i in aux){ var job = {};
                      job.title    = job.title
                      job.url      = job.url
                      job.location = aux[i]; 
  
                      job.temp = job.temp;
  
                      if(job.location.search(/remote/i)>-1){job.location = "";}
                      if(job.title.length > 0 && job.location.length > 0){
                        jobs.push(job);
                      }
  
                     }
      }else{
        if(job.location.search(/remote/i)>-1){job.location = "";}
        if(job.title.length > 0 && job.location.length > 0){
          jobs.push(job);
        }
      }
    } 
    out["jobs"] = jobs;
    return out;
  })();
  
  