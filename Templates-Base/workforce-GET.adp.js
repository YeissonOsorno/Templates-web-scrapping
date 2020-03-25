/*Before extract*/
(function() {
  var out = {};
     try{
       var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.meta.totalNumber
       out["json"] = jobs;
     }catch(error){
        out["wait"] = 500;
       
     }
  
    return out;
})();
/*Expected jobs*/
(function() {
  var out = {};
    var selector = "";
    var regex = /\d+/;
    var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.meta.totalNumber
    if (typeof msg === 'undefined') msg = console.log;

  //var expected_jobs_str = document.querySelector(selector).textContent.trim();
    //var expected_jobs = regex.exec(expected_jobs_str)[0];
  
    out["expected_jobs"] = jobs;

    return out;
})();

/*Extract*/
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
job.dateposted_raw = jobs[i].postDate.split('T').shift().trim().split('-').reverse().join('/');
  if(jobs[i].workLevelCode)
  {
      job.source_jobtype =jobs[i].workLevelCode.shortName.replace('Hourly','').trim()
  }

  job.url = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=bd93d69e-8763-4906-8dce-e498b2cfdeea&ccId=19000101_000001&jobId="+jobs[i].customFieldGroup.stringFields[0].stringValue.trim()                 
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
  /*Job description*/
  (function() {
  var out = {};
  var job = {};
  var selector = 'div[name="jobDescriptionView"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'Duties', false);
  job.html = removeTextAfter(job.html, 'Copyright ©', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
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