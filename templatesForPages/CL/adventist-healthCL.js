/* Before Extract */
(function() {
    var out = {};
    out.pic = true;
    out.waitFor = "div.jResultsActive div.jlr_title"
    return out;
  })();

/* Extract */
(function () {
    var out = {};
    var jobsSelector = "div.jResultsActive div.jlr_title";
    var returnedJobs = [];
    var jobs_number = 0;    // número de jobs por página. Jobs amount per page
    var html_jobs = [];
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2,
        "jobs": jobs_number
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    html_jobs = document.querySelectorAll(jobsSelector);
  
    for (var x in html_jobs) {
      var job = {};/*init*/
      var elem = html_jobs[x];
  
      if (typeof elem == "function") continue;
      if (typeof elem == "number") continue;
  
      job.title = elem.querySelector("a").textContent
      job.title = job.title.replace(/\(([^)]*)\)/g,'').trim().replace('.','');
      job.title = job.title.replace(/[0-9]/g,'').trim();
      job.title = job.title.replace(/Full Time/gi,'').trim();
      job.title = job.title.replace(', ,',',').trim().replace('- ,','-');
  
      job.url = elem.querySelector("a").href.trim();
      var loc = elem.querySelector("span.location").textContent.split(", ");
      if(loc.length > 0)
        job.location = loc.pop().trim();
      if(loc.length > 0)
        job.location = loc.pop().trim()+", "+job.location;
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
  
      returnedJobs.push(job);
  
    }
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
    return out;
  })();
  /* Before Pagination */
  (function() {
    var out = {};
    out.pic = true;
    out.waitFor = "div.jResultsActive div.jlr_title"
    return out;
  })();
  /* pagination for URL */
  (function () {
    var out = {};
    out.pic = true;
    var jobs_number = 0;    // número de jobs por página. Jobs amount per page
    var url_base = "https://careers.adventisthealth.org/jobs/search/10501882/page";
    var selector = "span.current.next";
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log; 
    out["pass_it"] = pass_it;  
    if (document.querySelector(selector)) {
      // condición de parada. Stop condition
      msg('Entro a la condicion de parada');
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {   
      msg('Entro a la condicion de paginación');
      var url = url_base + out["pass_it"].cont;  
      out["pass_it"].cont += 1;
      msg("=========> " + url)
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = true;
    }
  
    out["wait"] = true;
    out.waitFor ="div.jResultsActive div.jlr_title";
    return out;
  })();
  /* Description */
  (function() {
	var out = {};
	var job = {};
  	var selector = "div.job_description";
  	var remove_selector = "";
  	//var job = pass_it["job"];
  
	var full_html = document.querySelector(selector);
  	// remove something from the jobdatata
	if (remove_selector != "") full_html.querySelector(remove_selector).remove();
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;

  
	job.html 		= full_html.innerHTML.trim();
	job.jobdesc 	= full_html.textContent.trim();
  
	job.html 		= cleanHTML(job.html);
	job.jobdesc 	= cleanHTML(job.jobdesc);
  
	out["job"] = job;
	return out;
  
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
})();