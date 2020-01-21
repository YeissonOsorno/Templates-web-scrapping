(function() {
    var out = {};
    var html_jobs = document.querySelectorAll(".searchFiltersLeftSection tr td.jobSearchResults tbody tr.jobResultItem");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      var selectorCountry = elem.querySelector('div.noteSection>div>span:nth-child(4)').innerHTML.trim();
      var selectorCity = elem.querySelector('div.noteSection>div>span:nth-child(5)').innerHTML.trim();
      //var country = selectorCountry;
  
      job.title = elem.querySelector("a.jobTitle").textContent.trim();
      job.url = elem.querySelector("a.jobTitle").href.trim();
      //job.location = selectorCity+'-'+selectorCountry;
      job.dateposted_raw = elem.querySelector(".noteSection div span:nth-child(2)").textContent.trim().slice(13,23);
  
      var auxLoc = elem.querySelector("div.noteSection").textContent.trim();
  
      auxLoc = auxLoc.split(/SURA AM/i).shift().trim();
      job.temp = 1;
  
  
  
      if(auxLoc.indexOf('-') > -1) {
  
        var category  = auxLoc.split('-')[2];
        auxLoc = auxLoc.split(/category/).pop().trim();
        var array = auxLoc;
  
        for (var i in array) {
          var jobx = {};
          jobx.title = job.title;
          jobx.url = job.url;
          //jobx.source_jobtype = job.source_jobtype;
          //jobx.source_salary = job.source_salary;
          //jobx.logo = job.logo;
          //jobx.source_empname = job.source_empname;
          jobx.dateposted_raw = job.dateposted_raw;
          //jobx.html = job.html;
          //jobx.jobdesc= job.jobdesc;
          jobx.location = array[i];
          jobx.temp = job.temp;
          if (jobx.location.length > 1) {
            jobs.push(jobx);
          }
        }
      }
      else {
        job.location = auxLoc;
        jobs.push(job);
      }
  
  
  
  
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      //jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();