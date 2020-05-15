/* Extract - se debe de inactivar Jquery */
(function() {
    var out = {};
    out.pic =true;
    var html_jobs = document.querySelectorAll("table#company-pages-list tbody tr");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("td.job-list-title").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("td.job-list-location + td").textContent.trim().replace(/[0-9]/g,'').trim();
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

  /* pagination */
  (function() {
    var out = {};
  var next_page_selector = 'li[class="paginate_button next"] a'; //selector to identify the next button
  var last_page_selector = 'li[class="paginate_button next disabled"]'; //selector to identify the last page
   
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (document.querySelector(last_page_selector)) {
        //last page
      out["has_next_page"] = false;
  } else if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = false;
  }

    out.waitFor = "table#company-pages-list tbody tr";
    return out;
})();

/* Descripción */
(function() {
    var out = {};
    var job = {};
    var selector = "div.salaried-description-text-container";
    var remove_selectors = [];
  
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Overview of Position:', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    if(job.jobdesc.length < 255){
      msg('\x1b[31m  Job description is very Short number characters is ' + job.jobdesc.length);
      job.flag_active = 0;
      job.html = 'Jobdata is not available yet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      job.jobdesc = job.html; 
      out["job"] = job;
      return out; 
    }
    for(const a of document.querySelectorAll('div.desc-table-column:first-child>div')){
      const text = a.textContent.trim();
      if(text.search(/STATUS:/i) > -1){
        job.source_jobtype = text.split(/STATUS:/i).pop().trim();
        //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
        a.remove();//remueve el selector si coincide con la palabra clave.
      }
    }
    for(const a of document.querySelectorAll('div.desc-table-column:last-child>div')){
      const text = a.textContent.trim();
      if(text.search(/DATE POSTED:/i) > -1){
        job.dateposted_raw = text.split(/DATE POSTED:/i).pop().trim();
        
        //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
        a.remove();//remueve el selector si coincide con la palabra clave.
      }
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