/* 
* Template 1 cuando el jobsite se ve de la siguiente forma https://prnt.sc/tmnwqf
*
*/

/* Spider Config */
{
    "options": {
        "inactivateJQuery": false,
        "ignoreLoadErrors": false,
        "waitForPageLoadEvent": false,
        "waitForResources": false
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
}

/* Before Extract */
(function() {
	var out = {};
  	out.waitFor = "div#resultDiv ul>li";
    return out;
})();

/* Extract */
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div#resultDiv ul>li");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      var full_html = getDescription(job.url); 
      var div = document.createElement("div"); 
      div.innerHTML = full_html;
      job.location = div.querySelector('ul.posInfoList>li:first-child>div.posInfo__Value').textContent.trim();
      job.source_jobtype = elem.querySelector('div[itemprop="employmentType"]').textContent.trim();
      job.temp = 1;
      if(job.location.search(/,/gi) > -1) {
        var array = job.location.split(/,/gi);
        for (var i in array) {
          var jobx = {};
          jobx.title = job.title;
          jobx.url = job.url;
          jobx.source_jobtype = job.source_jobtype;          
          jobx.location = array[i].trim() + ', NZ';
          jobx.temp = job.temp;
          if (jobx.location.length > 0 && jobx.location !="-" &&  jobx.title != "ONZ PHR Register") {
            jobs.push(jobx);
          }
        }
      }
      else {
        job.location = job.location;
        if(job.title != "ONZ PHR Register")
          jobs.push(job);
      }
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  /* Function for extract from description */
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); 
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send(); 
    return response;
  }
  
  
/* pagination */  
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

/* Description */

(function() {
    var out = {};
    var job = {};
    out.pic = true;
    var selector = "div.js-jobs-description";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    /* Extraer salario y removerlo */     
    for(const a of document.querySelectorAll('ul.posInfoList>li')){
      const text = a.textContent.trim();
      if(text.search(/compensation/i) > -1){
        let auxSalary = text.split(/compensation/i).pop().trim();
        if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
          job.source_salary = auxSalary;
          
        }
      }
    }
  
    for(const a of document.querySelectorAll('p')){
      const text = a.textContent.trim();
      if(text.search(/Applications closing date/i) > -1){
        let date = a.textContent.split('closing date').pop().split(',').shift().trim()
        let month = new Date(date).getMonth() + 1
  
        job.dateclosed_raw = month + '/' + date.split(' ')[1].trim() + '/2020';
  
      }
    }
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'What are we looking for?', false);
    job.html = removeTextAfter(job.html, 'APPLY NOW', true); 
    job.html = removeTextAfter(job.html, 'Applications closing date', true);   
    job.html = removeTextBefore(job.html, 'The role ', false);
    job.html = job.html.replace('Apply now!','').trim();
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
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