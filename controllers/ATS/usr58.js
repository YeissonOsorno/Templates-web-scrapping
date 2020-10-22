/** Extract */
(function() {
    var out = {};
  
    var html_jobs = document.querySelectorAll('ul.search-results li.search-result');
    var jobs = [];
  
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
  
      var job  = {};
      var elem = html_jobs[x];
  
      job.title    = elem.querySelector('div.posting-title').textContent.trim();
              
              job.title = job.title.split('----').shift().trim();
              //job.title = job.title.split('AND $500').shift().split('$500').shift().trim()
      
      job.url      = elem.querySelector('div.posting-title a').href.trim();
      job.location = elem.querySelector('div.location').textContent.trim();
      
      if(job.location.indexOf(",")>-1){
        var commas = job.location.match(/\,/g).length;
        if(commas > 2){
          job.location = job.location.split(", ").slice(-3).join(", ").trim();
        }
      }
      job.location = job.location.replace(/[0-9]/g,'').trim()
  
      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();
  
      //job.experienced_required = elem.querySelector('').textContent.trim();
  
      //job.source_empname     = elem.querySelector('').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
  
  
      var datePosted     = elem.querySelector('div.posting-date').textContent.split(":").pop().trim();
      //console.log(datePosted);
      job.dateposted_raw = getDateFormat(datePosted," ",2,1,3);
  
      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);
  
  
      job.temp  = "Sep-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);
  
  
      //if(job.title.toUpperCase().indexOf("")>-1){job.title = "";}
  
  
      //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
      //}
  
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
  
    let day   =  dateRaw.split(cut)[dayPosition].trim(), 
        month =  dateRaw.split(cut)[monthPosition].trim(), 
        year  = dateRaw.split(cut)[yearPosition].trim();
    if(day < 10 && day.length < 2){day = "0" + day;} 
  
    if(dateRaw.search(/[a-z]/gi)>-1){ 
      if(month.search(/jan/i)>-1){month = "01";}
      if(month.search(/feb|fév/i)>-1){month = "02";}
      if(month.search(/mar/i)>-1){month = "03";}
      if(month.search(/apr|avr/i)>-1){month = "04";}
      if(month.search(/may|mai/i)>-1){month = "05";}
      if(month.search(/jun|juin/i)>-1){month = "06";}
      if(month.search(/jul|juil/i)>-1){month = "07";}
      if(month.search(/aug|août/i)>-1){month = "08";}
      if(month.search(/sep/i)>-1){month = "09";}
      if(month.search(/oct/i)>-1){month = "10";}
      if(month.search(/nov/i)>-1){month = "11";}
      if(month.search(/dec|déc/i)>-1){month = "12";}
    }
    var datum = month +"/"+  day +"/"+ year;
    return datum;
  }
  /**Pagination */


(function () {
    var out  = {};
    //out.wait = 1000;
  
    var url_base           = "https://usr58.dayforcehcm.com/CandidatePortal/en-US/cbb?page=";
    var main_loop_selector = "ul.search-results li.search-result";
  
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
  
    var perpage_fijo = 25;
    var perpage_actual = document.querySelectorAll(main_loop_selector).length;
  
  
    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
    if(perpage_actual < perpage_fijo){
      msg('\x1b[41m The pagination has finished \x1b[0m');
      out["has_next_page"] = false;
    }else{
      msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
      var nuevaUrl = url_base+ out["pass_it"].cont;
      out["pass_it"].cont++;
      msg("URL siguiente: \x1b[0m"+nuevaUrl);
      window.location.href = nuevaUrl;
      out["has_next_page"] = true; 
    }
  
  
    //out.waitFor = "";
    //out["wait"] = true;
    return out;
  })();
  
  /** Description */

(function() {
    var out = {};
    var job = {};
  
    var selector  = 'div[class="job-posting-content"]';
  
    // -------------------------- INFO ------------------------------------//
  
    //job.location       = document.querySelector('').textContent.trim();
    //job.source_jobtype = document.querySelector('').textContent.trim();
  
    //let datePosted     = document.querySelector('').textContent.trim();
    //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
    //---------------------------------------------------------------------//
  
    var full_html = document.querySelector(selector); 
    var full_html_text = full_html.innerText;
  
    // To Remove selectors 
    for (const a of full_html.querySelectorAll('[style^="color: rgb(68, 114, 196)"],ul.job-posting-items, h2#otherDetailsHeader, span.job-req-number, span.job-location, div.job-date-posted,h1,a, img, script, style, button')) {
      if (a){
        a.remove();
      }
    }
  
  
    for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.search(/@|for more info/i)>-1){
        //job.location = a.textContent.trim();
        //job.source_jobtype = a.textContent.trim();
        a.remove();
      } 
    }
  
    if(cleanHTML(full_html_text).trim().length < 200){
  
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
  
    }else{
  
      job.html = full_html.innerHTML.trim();
      job.html = job.html.split("This Job Summary indicates the general nature").shift();
  
      job.html = removeTextBefore(job.html, "Job Summary", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
  
  
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
  
      //job.html = job.html.replace("","");
      //job.html = job.html.replace("","");
  
      job.html    = cleanHTML(job.html.trim());
      job.jobdesc = job.html;
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
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
    let day   =  dateRaw.split(cut)[dayPosition],
        month =  dateRaw.split(cut)[monthPosition],
        year  = dateRaw.split(cut)[yearPosition];
  
    if(dateRaw.search(/[a-z]/gi)>-1){ 
      if(month.search(/jan/i)>-1){month = "01";}
      if(month.search(/feb/i)>-1){month = "02";}
      if(month.search(/mar/i)>-1){month = "03";}
      if(month.search(/apr/i)>-1){month = "04";}
      if(month.search(/may/i)>-1){month = "05";}
      if(month.search(/jun/i)>-1){month = "06";}
      if(month.search(/jul/i)>-1){month = "07";}
      if(month.search(/aug/i)>-1){month = "08";}
      if(month.search(/sep/i)>-1){month = "09";}
      if(month.search(/oct/i)>-1){month = "10";}
      if(month.search(/nov/i)>-1){month = "11";}
      if(month.search(/dec/i)>-1){month = "12";}
    }
    var datum = month +"/"+  day +"/"+ year;
    return datum;
  }