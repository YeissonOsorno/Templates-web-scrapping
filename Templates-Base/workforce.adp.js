(function() {
    var out = {};
 
    if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
 
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.jobRequisitions;
 
    var returnedJobs = [];    
    for(i in jobs) {
      var job = {};/*init*/
 
      job.title = jobs[i].requisitionTitle;
      job.title = job.title.split("-").shift();
      job.title = job.title.split("(").shift();
      job.title = job.title.split(",").shift();
      job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
      if(job.location == "" || job.location == undefined) {
          job.location = "United States";
        }
      
 
    job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=a6347449-60c4-4698-8fd7-0021244e2925&ccId=19000101_000001&jobId="+jobs[i].customFieldGroup.stringFields[0].stringValue.trim()+"&lang=en_CA";                     
    job.temp = "1";
      returnedJobs.push(job);
    }
 
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
    })();
 
    //---------------------------------------------------pagination----------------------------------------------------
    (function() {
    var out = {};
 

    if(typeof msg == "undefined") msg = function(x){return x;};
 

    out["pass_it"] = pass_it;
 
 
          if (out["pass_it"]["jobs"] < 20) {
          //last page
        out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 20;
      var url = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=4a61df00-6485-410d-998c-e9bb574c9f7d&lang=en_US&ccId=19000101_000001&$top=20&$skip=" + out["pass_it"].cont;
     
      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
        out["has_next_page"] = false;
    }
 

      
 
    out["wait"] = true;
    return out;
    })(); 
 
    //----------------------------------------------------------paginacion ultima pagina20--------------------------------------------------
 

    (function() {
    var out = {};
 
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
 

    if(typeof msg == "undefined") msg = function(x){return x;};
 

    out["pass_it"] = pass_it;
 
 
    if (json.meta.startSequence+20 > json.meta.totalNumber) {
      //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
      out["pass_it"].cont += 20;
      var url = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=0b9f0f20-e279-4fe7-8c5e-f0ff8c593f75&lang=en_US&ccId=19000101_000001&$top=20&$skip=" + out["pass_it"].cont;
 
      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
 
 

    out["wait"] = true;
    return out;
    })();