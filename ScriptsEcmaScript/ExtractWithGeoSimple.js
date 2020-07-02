(function() {
    let out = {};
    
    let html_jobs = document.querySelectorAll('');
    const jobs = [];for(let x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      let job = {};
      let elem = html_jobs[x];     
      job.title = elem.querySelector('').textContent.trim();
      job.url = elem.querySelector('').href.trim();
      job.location = elem.querySelector('').textContent.trim()
      
      job.temp = 2;
      jobs.push(job);
    } 
    out["jobs"]= jobs;
    return out;
  })();
  