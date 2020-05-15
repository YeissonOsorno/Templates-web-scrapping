(function () {
    var out = {};

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };

    if (!pass_it["urls"]) {
        out["pass_it"] = {
            // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
            "jobs": 0,
            // Arreglo de URLs
            "array_urls": [],
            "currentUrl": 0
        };
      } else {
        out["pass_it"] = pass_it;
    }
var link = document.querySelectorAll('div[data-ph-at-id="category-list-view"] a');
      for(var i = 0; i<link.length;i++){
        var element = link[i];
      
        var url = element.href;
        out["pass_it"].array_urls.push(url);
      }
  window.location.href = out["pass_it"].array_urls[0];
    
    out["wait"] = true;
    return out;
})();
function dummy(){
  var dummyValidation = {
    expectedJobs : function(selector){
      var expectedAll = document.querySelectorAll(selector);
      var expectedJobs = expectedAll.length;
      var count = 0;
      for(var elem = 0;elem < expectedJobs; elem++ )
      {
        var stringJob = expectedAll[elem].textContent.trim().replace('\n','').replace(/ /gi,'').trim();               
        var regex = /\d+/;  
        if (typeof msg === 'undefined') msg = console.log;        
        var expected_jobs = regex.exec(stringJob)[0];
        count = count + Number(expected_jobs);
      }
      return count;
    }
  }
  return dummyValidation;
}

var dummy = dummy();
var expected_jobs = dummy.expectedJobs("p.job-count");
console.log("Expected jobs ====> "  +  expected_jobs);



/************************************PAGINATION********************* */

(function() {
    var out = {};
    var next_page_selector = 'div.pagination > a.selected + a'; 
    var clickable_elem = document.querySelector(next_page_selector);
      out["pass_it"] = pass_it;
      msg("\x1b[32m -----------PAGINATION--------------");   
      if (!clickable_elem) {
          // Pregunta si la siguiente url existe
          out["pass_it"]["currentUrl"] += 1;
          // Pregunta si la siguiente url existe
          if (out["pass_it"]["currentUrl"] < out["pass_it"]["array_urls"].length) {
              var url = out["pass_it"].array_urls[out["pass_it"]["currentUrl"]];
              window.location.href = url;
              out["has_next_page"] = true;
          } else {
              out["has_next_page"] = false;
          }
    } else {
          clickable_elem.click();
            out["has_next_page"] = true;
    }
      
      out.waitFor = "div.job_search_results a.item";
      return out;
  })();
  