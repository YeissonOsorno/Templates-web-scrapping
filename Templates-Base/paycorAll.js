/* Extract */
(function() {
    var out = {};
  
    var iframe_selector = "iframe#gnewtonIframe";   
    if(document.querySelector(iframe_selector)) {  
      var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  
  
      var html_jobs = iframeDocument.querySelectorAll("li.gnewtonJobNode");
      var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("a").textContent.trim();
        job.title = job.title.replace(/\([^)]*\)/g, "").replace(/[.*+?^${}()|[\]\\]/g, "").trim();
        job.title = job.title.replace(/part time|full time|part-time|full-time|H\/F/gi,'').trim();
        job.url = elem.querySelector("a").href.trim();
        job.location =  job.title.split("-").pop().trim()+", US";
        job.title =  job.title.split("-").shift().trim();
  
  
        job.title =job.title.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 4561;
        jobs.push(job);
      }  
    } else {
      var jobs = []
      let ghost={title:"ghost"};
      jobs.push(ghost);
    }
  
  
    out["jobs"]= jobs;
    return out;
  })();
  /* Before Description */
  (function() {
    var out = {};
    out.iframeSelector = "iframe#gnewtonIframe"
    out.iframeWaitFor = "table#gnewtonJobDescription"
    return out;
  })();
  /* Description */
  (function() {
    var out = {};
    var job = {};
    var selector = "td#gnewtonJobDescriptionText";
    var remove_selectors = ["a"];
    //var job = pass_it["job"];
    var iframe_selector = "iframe#gnewtonIframe";   
    if(document.querySelector(iframe_selector)){
      var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  
      var full_html = iframeDocument.querySelector(selector);
      // remove something from the jobdatata
      if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  
      job.html      = full_html.innerHTML.trim(); 
      job.html = removeTextBefore(job.html, 'Summary', false);
      job.html = removeTextBefore(job.html, 'SUMMARY', false);
      //job.html = removeTextBefore(job.html, 'Summary', false);
      
      job.html = removeTextAfter(job.html, 'INDEED', true);
      job.html = removeTextAfter(job.html, 'Applications are being', true);
      job.html = removeTextAfter(job.html, 'Applications', true);
  
  
      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc);
    } else {
      job.dateclosed_raw="01/01/2012";
      job.flag_active=0;
      job.html  = " ";
  
    }
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