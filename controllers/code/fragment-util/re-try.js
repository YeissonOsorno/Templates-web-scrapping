/* 
* Re-Try, Wait if exist jobs
*/
(function() {
    var out = {};
    if(document.querySelector("span#live-results-counter")){
      //Selector de los jobs
      var html_jobs = document.querySelectorAll("div#widget-jobsearch-results-list>div");
      msg("===> JOBS FiND" + html_jobs.length)
      
      if(html_jobs.length > 0){
        out["has_next_page"] = false
      }else{
        out["has_next_page"] = true
      }
    }else{
      out["has_next_page"] = true
    }
    out.waitFor = 'div#widget-jobsearch-results-list>div';
    return out;
})();


/* Retry Load More */
(function() {
  var out = {};
  if(document.querySelector('small[class="careers-search-styles__totaljobs--1qZQx"]')){
    var html_jobs = document.querySelectorAll('div.careers-jobs-list-styles__jobsList--3_v12 > ul > li[data-ui="job-opening"]');
    var total_jobs = document.querySelector('small[class="careers-search-styles__totaljobs--1qZQx"]').textContent.split(' ')[0]
    msg("===>" + html_jobs.length)
    msg("===>" + total_jobs)
    if(html_jobs.length == total_jobs){
      out["has_next_page"] = false
    }else{
      document.querySelector('button[data-ui="load-more-button"]').click();
      out["has_next_page"] = true
    }
  }else{
    out["has_next_page"] = true
  }
  out.waitFor = 'ul.postingsList:last-child';
  return out;
})();


