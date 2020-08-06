(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      let locs = elem.querySelector("").textContent.trim().split('');
      locs.forEach(function(location){
        let jobx = {};
        jobx.title = elem.querySelector("").textContent.trim();
        jobx.url = elem.querySelector("").href.trim();
        jobx.location = location.trim();
        //jobx.dateposted_raw = elem.querySelector("").textContent.trim();
        //jobx.logo = elem.querySelector("").getAttribute("src").trim();
        //jobx.source_apply_email = elem.querySelector("").textContent.trim();
        //jobx.source_empname = elem.querySelector("").textContent.trim();
        //jobx.source_jobtype = elem.querySelector("").textContent.trim();
        //jobx.source_salary = elem.querySelector("").textContent.trim();
        jobx.temp = 1;
        jobs.push(jobx);
      })
  
    }   
    out["jobs"]= jobs;
    return out;
  })();
