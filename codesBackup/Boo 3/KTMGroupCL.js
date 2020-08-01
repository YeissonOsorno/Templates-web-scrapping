/* Extract */
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("table.jobs-list>tbody>tr");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;    
    var elem = html_jobs[x];
    let locs = elem.querySelector('td.location').textContent.replace(/\//g,',').split(',');
    locs.forEach(function(locF){
      let jobx = {};
      jobx.title = elem.querySelector("a").textContent.trim();
      jobx.url = elem.querySelector("a").href.trim();
      jobx.location = replaceLocation(locF.trim());
      jobx.dateposted_raw = elem.querySelector("td.date").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      jobx.temp = 1;
      jobs.push(jobx);
    })



  } 

  out["jobs"]= jobs;
  return out;
})();

/* Function to replace locations*/
function replaceLocation(_location){
    _location = _location.replace('Anif','Anif, Austria');
    _location = _location.replace('Salzburg','Salzburg,Austria');
    _location = _location.replace('Mattighofen','Mattighofen,Austria');
    _location = _location.replace('Munderfing','Munderfing,Austria');
    _location = _location.replace('Wels','Wels,Austria');
    _location = _location.replace('Rosenheim','Rosenheim, Germany');
    //_location = _location.replace('','');
    return _location;
  }
  
/* Job Description */
(function() {
    var out = {};
    var job = {};
    var selector = "div.jobMain";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
      
   /* Extract Job type */
    if(document.querySelector('img[src="https://jobs.ktm.com/Content/jobAd/Info_Arbeitszeit.svg"]'))
                job.source_jobtype = document.querySelector('img[src="https://jobs.ktm.com/Content/jobAd/Info_Arbeitszeit.svg"]').nextElementSibling.textContent.trim()
   
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Diese Aufgaben erwarten dich bei uns', false);
    job.html = removeTextBefore(job.html, 'THE TASKS AWAITING YOU', false);
    
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    out["job"] = job;
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