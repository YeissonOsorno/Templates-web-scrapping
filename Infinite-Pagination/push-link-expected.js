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
      "currentUrl": 0,
      "expectedJobs" : 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  out.waitFor = "p.job-count";
  var object = dummy();
  var expected_jobs = object.expectedJobs("p.job-count");
 out["pass_it"].expectedJobs = expected_jobs;
  msg(out["pass_it"].expectedJobs)
  var link = document.querySelectorAll('div[data-ph-at-id="category-list-view"] a');
  for(var i = 0; i<link.length;i++){
    var element = link[i];

    var url = element.href;
    console.log(url);
    out["pass_it"].array_urls.push(url);
  }
   msg(out["pass_it"].array_urls)
  //window.location.href = out["pass_it"].array_urls[0];
 

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