"Jobsite : https://www.namecheap.com/careers/openings/"
(function() {
    var out = {};
    out.pic = true;
    var html_jobs = document.querySelectorAll("div.gb-card");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("p.gb-card__footer").textContent.trim();
      job.reqid = job.url.split('/?').shift().split('/').pop().trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();