/*
* Plantilla de ATS greenHouse extrayendolo desde el iframe
*
*/

/* Config */
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
	let out = {};
  	out.iframeSelector = 'iframe[id="grnhse_iframe"]';
  	out.iframeWaitFor = 'div[class="opening"]';
    return out;
})();

/* Extract with multilocation */
(function() {
    let out = {};
    const iframeDocument = document.querySelector('iframe[id="grnhse_iframe"]').contentWindow.document;
    const html_jobs = iframeDocument.querySelectorAll('div[class="opening"]');
    const jobs = [];for(let x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      let job = {};
      let elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.split(' - ').shift().trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("span.location").textContent.replace('Remote,','').replace('preferred','').trim();
      job.temp = 1;      	
  
      if(job.location == "Chicago, NYC, or DC") {
        var locs = job.location.replace('or','').trim().split(',');
        msg(locs)
        for (var i in locs.filter(elem=> elem!="")) {
          var jobx = {};
          jobx.title = job.title;
          jobx.url = job.url;
          jobx.location = locs[i]//.replace('NYC','New York').replace('DC','Washington D.C.').trim();
          jobx.temp = job.temp;
          if (jobx.location.length > 3) {
            jobx.location = jobx.location.replace('NYC','New York').replace('DC','Washington D.C.').trim();
            jobs.push(jobx);
          }
        }
      }
      else {
        job.location = job.location;
        if(job.location =="Remote") job.location = "Chicago, IL";
        if(job.location !="")
          jobs.push(job);
      }
  
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
/* No Pagination */

/* Before Description */
(function() {
	let out = {};
  	out.iframeSelector = 'iframe[id="grnhse_iframe"]';
  	out.iframeWaitFor = 'div[id="content"]';
    return out;
})();

/* Description */
(function() {
    var out = {};
    var job = {};
    var selector = 'div[id="content"]';
    var remove_selectors = [];
    //var job = pass_it["job"];
    const iframeDocument = document.querySelector('iframe[id="grnhse_iframe"]').contentWindow.document;
    var full_html = iframeDocument.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  for(const a of full_html.querySelectorAll('p')){
        const text = a.textContent.trim();
        if(text.search(/Employment Status/i) > -1){
          job.source_jobtype = text.split(/Employment Status:/i).pop().trim()
          //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
          a.remove();//remueve el selector si coincide con la palabra clave.
        }
      }
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Position Overview', false);
    job.html = removeTextAfter(job.html, 'Equal Employment', true);
    job.html = removeTextAfter(job.html, 'Benefits Saga Education', true);
    job.html = removeTextAfter(job.html, 'Equal Employment', true);
    job.html = removeTextAfter(job.html, 'Equal Employment', true);
    
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