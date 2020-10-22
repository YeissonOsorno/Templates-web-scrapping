/*Extract */
(function() {
    var out = {};
    var jobs = [];
  
    //  Selector pre is usually where the string of the json is
    var element = document.querySelector("pre").textContent;
    //  We parse the json so it can be worked
    var json = JSON.parse(element);
    //  Replace positionOfJobs for the path were are the jobs
    var json_jobs = json.job_requisitions;
  
    for(var i in json_jobs) {
      var job = {};/*init*/
      var elem = json_jobs[i];
  
      job.title = elem.job_title;
      var city = elem.location.city;
      var state = elem.location.state;
      var country = elem.location.country;
      job.location = city + ", " + state + ", " + country;
      
      var url =window.location.origin + window.location.pathname+"/" +elem.id+ "?_" + window.location.search.split('&_').pop() ;    
      job.url = url;        
      //job.dateposted_raw = elem.positionOfDatePosted;
      //job.dateclosed_raw = elem.positionOfDateClosed;
      job.source_jobtype = elem.job_categories[0];
      //job.source_salary = elem.positionOfSalary;         
      //job.source_empname = elem.positionOfEmpname;
      //job.logo = elem.positionOfLogo;
      //job.source_apply_email = elem.positionOfEmail;
  
      job.temp = "1";
  
      jobs.push(job);
    }
  
    out["jobs"]= jobs;
    return out;
  })();

  /* Pagination */
  (function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

/*Description */
(function() {
    var out = {};
    var job = {};
    out["pass_it"] = pass_it;
    var elems;
    $.ajax({
      url :  pass_it["job"].url,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      type : 'GET',
      // data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        elems = result;
        //limit = result.positionLimit;
        // for(var i = 0; i<json.length; i++) {
        //var job = {};
        if(elems.employee_type){
          job.source_jobtype = elems.employee_type.name
        }
        var remove_selectors = [];
        //var job = pass_it["job"];
        // remove something from the jobdatata
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
        job.link = 'https://secure3.saashr.com/ta/6027032.careers?CareersSearch';
        job.html      = elems.job_description+elems.job_requirement;    
        job.html = removeTextBefore(job.html, 'Essential Job Duties and Responsibilities', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
        //job.url = elem.positionOfUrl;                    
        //job.dateposted_raw = elem.positionOfDatePosted;
        //job.dateclosed_raw = elem.positionOfDateClosed;
        //job.source_jobtype = elem.positionOfJobtype;
        //job.source_salary = elem.positionOfSalary;         
        //job.source_empname = elem.positionOfEmpname;
        //job.logo = elem.positionOfLogo;
        //job.source_apply_email = elem.positionOfEmail;
      }
    });
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