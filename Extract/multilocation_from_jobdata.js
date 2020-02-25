(function () {
    var out = {};
    var html_jobs = document.querySelectorAll("li.listSingleColumnItem");
    var jobs = []; for (var x in html_jobs) {
      if (typeof html_jobs[x] == "function") continue;
      if (typeof html_jobs[x] == "number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("h3").textContent.trim().replace(/\(([^)]*)\)/g,'');
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("h5").textContent.trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
  
  
  
  
      if (job.location.indexOf('Multiple Locations')) {
        /*Contener un html dentro de otro html*/
        var container = document.createElement('html')
        container.innerHTML = getDescription(job.url);
        var cities = container.querySelector('div.mainDetails div.fieldSet:nth-child(2) div').textContent.trim().split(',');
        if (cities.length > 1) {
          for (var x = 0; x <= cities.length; x++) {
            var jobx = {};
            jobx.title = job.title;
            jobx.url = job.url;
            jobx.location = cities[x] + ', US';
            //jobx.dateposted_raw = job.dateposted_raw;
            //jobx.logo = job.logo
            //jobx.source_apply_email = job.source_apply_email
            //jobx.source_empname = job.source_empname
            //jobx.source_jobtype = job.source_jobtype
            //jobx.source_salary = job.source_salary
            jobx.temp = job.temp;
  
            if (jobx.location != 'undefined, US') jobs.push(jobx)
          }
        } else { jobs.push(job) }
      } 
    }
  
    out["jobs"] = jobs;
    return out;
  })();
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false);
    var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
  }