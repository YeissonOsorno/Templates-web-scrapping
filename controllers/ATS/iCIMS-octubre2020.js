(function() {
    var out = {};
    if (!pass_it["urls"]) {
      out["pass_it"] = {
        "jobs": 0,
        "urls": [
          "https://careers-leons.icims.com/jobs/3680/job", 
          "https://careers-leons.icims.com/jobs/3093/job",
          "https://careers-leons.icims.com/jobs/3248/job"
        ],    
        "currentUrl": 0,
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var iframe_selector = "iframe#icims_content_iframe";   
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var jobsSelector = "div.iCIMS_JobContent";
    var html_jobs = iframeDocument.querySelectorAll(jobsSelector);
    var jobs = [];
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      //job.title = elem.querySelector("div#iCIMS_Header h1").textContent.trim();
      //job.url = window.location.href+"?in_iframe=1&mode=job&iis=Neuvoo";
      job.title = elem.querySelector("h1.iCIMS_Header").textContent.trim();
      job.location = elem.querySelector("div.col-xs-6.header.left").textContent.replace("Job Locations","").trim().split("-").reverse().join(", ");
      var source = "&iisn=talentsponsored";
      //    job.url = elem.querySelector("a.job-title").href.trim()+ "?mode=job&iis=Neuvoo" + source + "&in_iframe=1&mode=job&iis=Neuvoo";
      job.url = window.location.href + "?mode=job&iis=Neuvoo&in_iframe=1&iisn=talentsponsored";
      job.source_empname = "LFL Group";
      job.html        = elem.innerHTML.trim(); 
      job.html = removeTextBefore(job.html, 'Overview', false);
      job.html = removeTextAfter(job.html, 'Learn more about', true);   
      job.html          = cleanHTML(job.html);
      var tmp       = document.createElement('DIV');
      tmp.innerHTML = job.html;
      job.jobdesc     = tmp.textContent.trim();
      job.jobdesc     = cleanHTML(job.jobdesc);
      job.temp = "1";
      
      out.pic = true;
      out.html = true;
      jobs.push(job);
    }
    out["jobs"]= jobs;
    return out;
  })();
    
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }       
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }       
    }
    return newHtml;
  }
  ////////////////////////Pagination//////////////////////////////////
  (function () {
    var out = {};
    out["pass_it"] = pass_it;  
    // No tiene siguiente página!! (y se procede a preguntar por el multilink)
    out["pass_it"]["currentUrl"] += 1;
    // Pregunta si la siguiente url existe
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
      // Resetea el contador de la paginación
      out["pass_it"]["page"] = 1;
      var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]]
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }         
    out.iframeSelector = "iframe#icims_content_iframe"
    out.iframeWaitFor = "div.iCIMS_JobContent"
    return out;
  })();