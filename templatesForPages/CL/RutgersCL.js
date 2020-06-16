/* Extract */
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div#search_results div.job-item.job-item-posting");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("div.job-title.col-md-4 h3").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = "Newark, United States";
     let auxloc=$(this).find("div div div:nth-child(5)").text();
    if (auxloc.indexOf("Brunswick")>-1) {
      job.location="New Brunswick, US";
    } 
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();

/*Pagination*/
(function() {
  var out = {};
  var next_page_selector = "div.pagination a.next_page"; //selector to identify the next button


  var clickable_elem = document.querySelector(next_page_selector);
  if(clickable_elem){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out.waitFor = "div#search_results div.job-item.job-item-posting";
  return out;
})();

/* Description*/
(function() {
  var out = {};
  var job = {};
  var selector = "div.containers";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;
  for (const a of full_html.querySelectorAll('tr')) {
    if (a.textContent.includes('Department')||a.textContent.includes('Job Category')|| a.textContent.includes('Recruitment/Posting')
       	||a.textContent.includes('Location Details')||a.textContent.includes('Home Location Campus')||a.textContent.includes('Home Location Campus')
      ||a.textContent.includes('Annual Maximum Salarys')
      ||a.textContent.includes('Home Location Campus')||a.textContent.includes('Job Categorys')){ //can us search or match methods
      //job.source_jobtype = a.textContent.trim().split(':').pop(); //another querySelector if needed
      a.remove(); //if you want to remove this selector
    } 
  }
   for (const a of full_html.querySelectorAll('tr')) {
    if (a.textContent.includes('Position Status')){ //can us search or match methods
      job.source_jobtype = a.textContent.trim().split('Status')[1]; //another querySelector if needed
      //a.remove(); //if you want to remove this selector
    } 
  }
   for (const a of full_html.querySelectorAll('tr')) {
    if (a.textContent.includes('Position Salary')){ //can us search or match methods
      job.source_salary = a.textContent.trim().split('Salary')[1]; //another querySelector if needed
      //a.remove(); //if you want to remove this selector
    } 
  }
  job.html      = full_html.innerHTML.trim();    
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  job.html = removeTextAfter(job.html, 'Position Status', true);
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