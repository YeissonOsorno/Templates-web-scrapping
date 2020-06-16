/* Before Extract */

(function() {
    var out = {};
    out.waitFor = "div#job_results_list_hldr";
    out["wait"]= 200;
    return out;
  })();

/* Extract */


(function() {
    var out = {};
     out["pic"] = true;
    
       var html_jobs = document.querySelector("div#job_results_list_hldr").querySelectorAll("div[id^='job_list']");
      
        var jobs = [];
    
        for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        
        var job  = {};
        var elem = html_jobs[x];
  
        job.title    = elem.querySelector('a.job_link').textContent.trim();
        job.url      = elem.querySelector('a.job_link').href.trim();
        job.location = elem.querySelector('span.location').textContent.trim();
          
          job.title = job.title.replace("- Open Location","").trim();
          
          job.title = job.title.split("–").shift().trim();
        
          
                // split on last hyphen - title
                if(job.title.indexOf("-")>-1){
                  let splitOnLastHyphen = job.title.split("-").pop();
                     //if(splitOnLastHyphen.toLowerCase().indexOf("sign")>-1){
  
                     job.title = job.title.replace(splitOnLastHyphen,"").trim();
  
                        let lastChar = job.title.substr(job.title.length -1);
                        if(lastChar === "-" || lastChar === ","){job.title = job.title.slice(0,-1);}
                 //}
               }
          
                //split on city 2
          if(job.location.indexOf(",")>-1){
  
          let city = job.location.split(",")[0].trim();
            var preClean = job.title.split(city).shift().trim();
            
            if(preClean.length > 10){
            
                  job.title = job.title.split(city).shift().trim();
                    let lastChar = job.title.substr(job.title.length -1);
                      if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                        job.title = job.title.slice(0,-1);}
                  }else{
                  
                    job.title = job.title.replace(city,"").trim();
                  }
  
        } 
   
          job.temp  = "June-2020";
  
          
          
          var multilocation = elem.querySelector('span.location').textContent.trim();
          job.location = job.location.split(" and ").shift().trim();
          
          jobs.push(job);
     
              if (multilocation.search(/additional/i) > -1) {
  
                var full_html = getDescription(job.url);
                var div = document.createElement("div");
                div.innerHTML = full_html
                var locclean = div.querySelector('div.additional_locations.jAdditionalLocations').innerHTML;
  
                var locs = locclean;
  
                locs = locs.split('</a>');
                for (l in locs) {
  
                  var jobx = {};
  
                  jobx.title    = job.title;
                  jobx.url      = job.url;
                  jobx.location = locs[l].replace(/\<.*?\>/g, '').trim();
                  jobx.temp     = job.temp;
                  
    
  
                  if(jobx.location.length > 0){
                    jobs.push(jobx);
                  }
  
              }
        
         }//else{
          
          //jobs.push(job);
          //}
   
    }
  
    out["jobs"] = jobs;
    return out;
  })();
  
  
  
  function getDescription(url) {
  
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  
    var response = "";
    xhrrequest.onreadystatechange = function () {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
  
    xhrrequest.send();
    return response;
  }
  
  /* Pagination */


(function() {

    var out = {};
    var next_page_selector = 'a.next'; // Selector del next 
  
    
    var currentPage = document.querySelector("#jPaginateCurrPage").innerText;
    var totalPages = document.querySelector("#jPaginateNumPages").innerText;
    
    currentPage = Number(currentPage);
    currentPage = currentPage.toFixed(0);
  
    totalPages = Number(totalPages);
    totalPages = totalPages.toFixed(0);
    
    //console.log(currentPage);
    //console.log(totalPages);
    
   
      var clickable_elem = document.querySelector(next_page_selector);
    
        //stop condition
        if (currentPage == totalPages) {
          out["has_next_page"] = false;
      } else {
            clickable_elem.click();
          out["has_next_page"] = true;
      }
  
        out.waitFor = "a.job_link";
        return out;
  })();

  /* Description */
  (function() {
    var out = {};
    var job = {};
    var selector = ".job_description";
    var remove_selector = "";
    //var job = pass_it["job"];
  
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selector != "") full_html.querySelector(remove_selector).remove();
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
  
    job.html 		= full_html.innerHTML.trim();
    job.jobdesc 	= full_html.textContent.trim();
  
  
  
    job.html = removeTextBefore(job.html, "Responsibilities:", false);
    job.html = removeTextBefore(job.html, "What You’ll Get to Do:", false);
    job.html = removeTextAfter(job.html, "Tetra Tech only accepts resumes through", true);
    job.html = removeTextAfter(job.html, "For more information on our company", true);
    job.html = removeTextAfter(job.html, "About Tetra Tech:", true);
  
    job.jobdesc = removeTextBefore(job.jobdesc, "Responsibilities:", false);
    job.jobdesc = removeTextBefore(job.jobdesc, "What You’ll Get to Do:", false);
    job.jobdesc = removeTextAfter(job.jobdesc, "Tetra Tech only accepts resumes through", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "For more information on our company", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "About Tetra Tech:", true);
  
  
  
  
  
  
    job.html 		= cleanHTML(job.html);
    job.jobdesc 	= cleanHTML(job.jobdesc);
  
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