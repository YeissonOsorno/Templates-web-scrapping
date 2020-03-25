/**Extract**/
(function() {
  var out = {};
  if (!pass_it["urls"]) {
    out["pass_it"] = {
      // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
      "jobs": 0,
      // Arreglo de URLs
      "urls": ["https://careers-rackroomshoes.gr8people.com/jobs?page=2",
               "https://careers-rackroomshoes.gr8people.com/jobs?page=3",
               "https://careers-rackroomshoes.gr8people.com/jobs?page=4"],
      "currentUrl": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var html_jobs = document.querySelectorAll(".search-results-view tbody tr");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = elem.querySelector("td:nth-child(4)").textContent.trim();
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
/**Pagination*/
(function() {
  var out = {};
  var next_page_selector = '.pager-container li.active + li:not(.disabled) >a'; 
  var clickable_elem = document.querySelector(next_page_selector);
  out["pass_it"] = pass_it;
  msg("===>" + out["pass_it"]["currentUrl"])
  msg("===>" + out["pass_it"]["urls"].length)
  
  if (!clickable_elem) {    
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
      var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
      msg('\x1b[32m Change to next URL')
      out["pass_it"]["currentUrl"]+=1;
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      msg('\x1b[31m Not Change to next URL')
      out["has_next_page"] = false;
    }
  } else {
    clickable_elem.click();
    out["has_next_page"] = true;
  }

  out.waitFor = "tbody >tr";
  return out;
})();