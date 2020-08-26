/*
* People click ATS
*/

// Infinite Pagination
(function() {
    var out = {};
    out.pic = true;
    document.querySelector('input#searchButton').click();
    out.waitFor = "table#searchResultsTable>tbody>tr:not(:first-child)"
    return out;
})();

// Extract
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("table#searchResultsTable>tbody>tr:not(:first-child)");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      let locs = elem.querySelector('td[id*="JPM_LOCATION"]').textContent.trim().split('/');
      locs.forEach(function(location){
        let jobx = {};
        jobx.title = elem.querySelector("a").textContent.trim();
        jobx.url = elem.querySelector("a").href.trim();
        jobx.location = location.split('-').reverse().join(',').trim();
        //jobx.dateposted_raw = elem.querySelector("").textContent.trim();
        //jobx.logo = elem.querySelector("").getAttribute("src").trim();
        //jobx.source_apply_email = elem.querySelector("").textContent.trim();
        //jobx.source_empname = elem.querySelector("").textContent.trim();
        //jobx.source_jobtype = elem.querySelector("").textContent.trim();
        //jobx.source_salary = elem.querySelector("").textContent.trim();
        jobx.temp = 1;
        jobs.push(jobx);
      })
  
    }   
    out["jobs"]= jobs;
    return out;
  })();

// Pagination
(function() {
    var out = {};
    var next_page_selector = 'input[alt="Next"]';
  
    var clickable_elem = document.querySelector(next_page_selector);
    if(clickable_elem){
      //go to next page
      clickable_elem.click();
      out["has_next_page"] = true;
    } else {
      //try again
      out["has_next_page"] = false;
    }
  
    out.waitFor = "table#searchResultsTable>tbody>tr:not(:first-child) ";
    return out;
  })();

  // Description
  