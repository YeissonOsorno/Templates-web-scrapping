/**BEFORE EXTRACT**/
(function() {
  var out = {};
    out.iframeSelector = "iframe#icims_content_iframe"
    out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable >div.row"
    return out;
})();
/*Expected jobs */
(function() {
  var out = {};
    var selector = "div.pull-left";
    var regex = /\d+/;
  
    if (typeof msg === 'undefined') msg = console.log;
  
    var iframe_selector = "#icims_iframe_span > iframe";   
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;

    var expected_jobs_str = iframeDocument.querySelector(selector).textContent.split(" of ").pop().trim();
    var expected_jobs = regex.exec(expected_jobs_str)[0];
    if(expected_jobs == 1)
      expected_jobs = iframeDocument.querySelectorAll("li.row").length;
    else
      expected_jobs = (expected_jobs*20)-20; //we are counting 20 by page, minus 1 page
    out["expected_jobs"] = expected_jobs;

    return out;
})();
/* Extract */
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable >div.row");
    var jobs = [];
  
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a > span:nth-child(2)").textContent.trim();
      job.title = job.title.split("(").shift();
      job.title = job.title.split("-").shift();
      job.title = job.title.split("*").pop();
      job.title = job.title.replace("Part Time","");
      job.title = job.title.replace("Temp/Seasonal","");
     // job.title = job.title.replace(/\s+/gi, ' ');
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("div.col-xs-6.header.left span:nth-child(2)").textContent.trim();
      job.location = job.location.split("-");
      var city =job.location[2];
      var state=job.location[1];
      var coutry= job.location[0];  
      job.location= city +", " + state + ", "+ coutry;
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      // job.source_jobtype = elem.querySelector("div.iCIMS_JobHeaderGroup dl:nth-child(3)").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    }
    
    //out.wait=2000;
    out["jobs"]= jobs;
    return out;
  })();

  /*Paginación*/
  (function() {
    var out = {};
   
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var textPaginador = iframeDocument.querySelector(".pull-left > h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs").textContent.trim();
  
    var max = textPaginador.split(" of ").pop();
    var min = textPaginador.split(" of ").shift().split("Page ").pop();
  
  
    if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
      msg(min + " - " + max);
      var nuevaUrl = "https://external-kirklands.icims.com/jobs/search?pr=" + out["pass_it"].cont + "&searchRelation=keyword_all";
      out["pass_it"].cont++;
      window.location.href = nuevaUrl;
      out["has_next_page"] = true;
    } else {
      //try again
      out["has_next_page"] = false;
    }
  
    //out["pic"] = true;
    //out.wait = 1;
    out.iframeSelector = iframe_selector;
    out.iframeWaitFor = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > ul";
    return out;
  })();
  
/*Before JobDescription*/
(function() {
  var out = {};
    out.iframeSelector = "iframe#icims_content_iframe"
    out.iframeWaitFor = "div.iCIMS_JobContent"
    return out;
})();

/*job description*/
(function() {
  var out = {};
  var job = {};
  var selector = "";
  var selector = "div.iCIMS_JobContent";
  var remove_selectors = [];
  //var job = pass_it["job"];  

  var iframe_selector = "iframe#icims_content_iframe";
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var full_html = iframeDocument.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'Overview', false);
  job.html = removeTextAfter(job.html, 'Options', true);
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