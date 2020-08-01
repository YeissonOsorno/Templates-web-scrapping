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
      job.url = "https://amedisys.taleo.net/careersection/2/jobdetail.ftl?job="+elem.querySelector('span[id*="requisitionListInterface.reqContestNumberValue"]').textContent.trim()+"&lang=en";
      job.location = dummy.cleanLocation(elem.querySelector(dummy.selectorLocation).textContent.trim());
      job.location = job.location.replace(/United States/g,"US/");
  
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
        if (job.location.indexOf('/') > -1) {
          var anotherLocation = job.location.split('/');
          msg (anotherLocation)
          for (var elem in anotherLocation) {
            var jobz = {};
            jobz.title = job.title;
            jobz.url = job.url;
            jobz.location = dummy.cleanLocation(anotherLocation[elem]);
            jobz.location = jobz.location.trim();
            var lastCharLoc = jobz.location.substr(jobz.location.length - 1);
            if (lastCharLoc === ",") { jobz.location = jobz.location.slice(0, -1).trim(); }
            jobz.location = jobz.location.trim().replace(/^\,/,"").trim();
            jobz.temp = job.temp;
            jobs.push(jobz);
          }
        }else{
          jobs.push(job);
        }
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
        result = result.replace(/Staff at Home/g,'').trim();
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
  
  /* pagination */
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
  
  /* Job description */
  
  (function() {
    var out = {};
    var job = {};
    var selector = "div.editablesection";
    var remove_selectors = ['div.editablesection >div.contentlinepanel'];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;

    job.html      = full_html.innerHTML.trim();    
    job.html 		= full_html.innerHTML.trim();
    if(job.html.search(/CV|resume|cover letter|curriculum/gi)>-1){
      if(job.html.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi) > -1){
        job.source_apply_email = job.html.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0];
      }
    }
    job.html = removeTextBefore(job.html, 'Organization', false);
    job.html = removeTextAfter(job.html, 'Equal Opportunity', true);

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
  