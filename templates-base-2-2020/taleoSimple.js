/*
* Taleo simple without JSON POST
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
	var out = {};
    out.waitFor = 'div.ftllist tbody > tr[class="ftlcopy ftlrow"]';
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
        job.url = window.location.origin + "/careersection/jobdetail.ftl?job="+elem.querySelector('div.staticcontentlinepanel +div>span:last-child').textContent;
        job.location = dummy.cleanLocation(elem.querySelector(dummy.selectorLocation).textContent.trim());
        job.dateposted_raw = dummy.ifExists('span[id*="requisitionListInterface.reqPostingDate.row"]');
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
        selectorLocation  : "div.morelocation",
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
            result = result.replace('Staff at Home ','')
            if(result.indexOf('HQ')>-1) result = "Baltimore, Maryland,US"
            return result;
        },
        ifExists : (selector)=>{
            var result = "";
            if(document.querySelector(selector)){
                result = document.querySelector(selector).textContent.trim();
            }
            return result;
        }
  
    }
    return dummyValidation;
  }
  
  /* Pagination */
  (function() {
    var out = {};
    var next_page_selector = 'span.pagerlink > a[title="Go to the next page"]'; //selector to identify the next button
    var last_page_selector = ""; //selector to identify the last page

    var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if(clickable_elem){
      //go to next page
      clickable_elem.click();
      out["has_next_page"] = true;
    } else {
      //try again
      out["has_next_page"] = false;
    }

    out.waitFor = 'div.ftllist tbody > tr[class="ftlcopy ftlrow"]';
    return out;
  })();
  
  /* Description */
  