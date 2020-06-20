/* Before extract */
(function() {
	var out = {};
  	out.waitFor = 'li[class="BambooHR-ATS-Jobs-Item"]';
    return out;
})();
/* Extract */
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll('li[class="BambooHR-ATS-Jobs-Item"]');
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("a").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = elem.querySelector("span.BambooHR-ATS-Location").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 3;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();
/* without pagination */
/*Description */
(function() {
    var out = {};
    var job = {};
    var selector = "div.js-jobs-description";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    
    job.source_jobtype = document.querySelector('li.posInfo--employmentType>div.posInfo__Value').textContent.trim();
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Local (', true);
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