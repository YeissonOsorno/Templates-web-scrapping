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