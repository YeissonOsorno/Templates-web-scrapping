/*Before Extract*/
(function() {
	var out = {};
  	out.waitFor = "table#cws-search-results tbody tr:not(:first-child)"
    return out;
})();

/* Extract */ 
(function () {
    var out = {};
    var dummy = dummyJobs();
    var html_jobs = document.querySelectorAll('div.ftllist tbody > tr[class="ftlcopy ftlrow"]');
    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("td:last-child div.editablesection h3 a").textContent.trim();
        job.title = dummy.cleanedTitle(job.title);
        job.url = "https://sherwin.taleo.net/careersection/jobdetail.ftl?job=" + elem.querySelector("td:last-child div.editablesection >div:first-child + div").textContent.trim().split('Requisition ID:').pop().trim();
        job.location = dummy.cleanLocation(elem.querySelector(dummy.selectorLocation).textContent.trim());
        job.temp = 1;
        var selectorLocation = job.location;
        if (selectorLocation.indexOf('More...') > -1) {
            dummy.clickMore('a[id*="requisitionListInterface.reqMoreLocationAction"]')
            var locations = elem.querySelector(dummy.selectorLocation).textContent.trim().split(',');
            const length = locations.length;
            if (length > 1) {
                for (var elem in locations) {
                    var jobx = {};
                    jobx.title = job.title;
                    jobx.url = job.url;
                    jobx.location = dummy.cleanLocation(locations[elem]);
                    jobx.temp = job.temp;
                    jobs.push(jobx);
                }
            }
        } else {
            jobs.push(job);
        }       
    }
    out["jobs"] = jobs;
    return out;
})();
/**
 * [dummyJobs Funcion que retorna un objeto ]
 * @return {[Object]} [Objeto con propiedades utiles para indexar]
 */
function dummyJobs() {
    var dummyValidation = {
        headquarter: "Cleveland, OH",
      	selectorLocation  : "td:last-child div.editablesection >div:last-child div.morelocation",
        cleanedTitle: (title) => {
            var result = title.replace(/#[0-9]/g, '').replace(/- [0-9]/g, '').replace(/[0-9]/g, '').trim();
            return result;
        },
        clickMore: (selector) => {
            var buttonMore = document.querySelectorAll(selector)
            var more = buttonMore.length;
            for (var i = 0; i < more; i++) {
                var location = document.querySelector(selector).click();
            }
            return location;
        },
        cleanLocation : (location)=>{
            var result = location.replace('United States', 'US').split('-').reverse().join(', ');
            return result;
        }

    }
    return dummyValidation;
}

/* Job Description */ 
(function() {
  var out = {};
  var job = {};
  var selector = 'div.mastercontentpanel3 tbody';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  //Extract dateposted
  if(job.jobdesc.indexOf('Job Posting:')>-1)
  {
    job.dateposted_raw = job.jobdesc.split('Job Posting:').pop().trim();
    job.dateposted_raw = job.dateposted_raw.split('Schedule:').shift().trim()
  }
  //Extract jobtype
  if(job.jobdesc.indexOf('Schedule:')>-1)
  {
    job.source_jobtype = job.jobdesc.split('Schedule:').pop().trim();
    job.source_jobtype = job.source_jobtype.split('Respond By:').shift().trim()
  }
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