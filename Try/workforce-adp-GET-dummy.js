/*Infinite Pagination */
(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log; 
    const dummy = dummyJobs();
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "domainExtract" : "",
            "domainPagination" : "",
            "domainDescription" : ""
      };
    } else {
      out["pass_it"] = pass_it;
    }
    out["pass_it"]["domainExtract"] = dummy.domainExtract;
    out["pass_it"]["domainPagination"] = dummy.domainPagination;
    out["pass_it"]["domainDescription"] = dummy.domainDescription;
  	msg("\x1b[32m ==>" + out["pass_it"]["domainExtract"]);
  	msg("\x1b[31m ==>" + out["pass_it"]["domainPagination"]);
  	msg("\x1b[33m ==>" + out["pass_it"]["domainDescription"]);
    return out;
})();
/**
 * [DummyJobs]
 * @return {[Function]} [Return a object with properties]
 */
function dummyJobs(){
    const dummy = {
      domainExtract : "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=70ce018a-d4cc-437d-84b7-a2bd1bf8433a&ccId=19000101_000001&jobId=",
      domainPagination : "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=70ce018a-d4cc-437d-84b7-a2bd1bf8433a&timeStamp=1586355064166&lang=en_US&ccId=19000101_000001&locale=en_US&$top=20&$skip=",
      domainDescription : " "
    }
    return dummy;
}
/*Before Extract */
(function() {
    var out = {};
       try{
         var element = document.querySelector("pre").textContent;      
         var json = JSON.parse(element);
         var jobs = json.meta.totalNumber
         out["json"] = jobs;
       }catch(error){
          out["wait"] = 500;       
       }
      return out;
  })();
  /*Expected Jobs */
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
  /*Extract */
  
(function() {
    var out = {};
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.jobRequisitions;    
    out["pass_it"] = pass_it;
  
    msg("===>" + out["pass_it"].domainExtract)
    var returnedJobs = [];    
    for(i in jobs) {
      var job = {};
      job.title = jobs[i].requisitionTitle;
      job.title = job.title.split("-").shift();
      job.title = job.title.split("(").shift();
      job.title = job.title.split(",").shift();
      job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
      job.location = clean(job.location);
      if(job.location == "" || job.location == undefined) {
        job.location = "New York, NY";
      }
      job.dateposted_raw = jobs[i].postDate.split('T').shift().trim().split('-').reverse().join('/');
      if(jobs[i].workLevelCode)
      {
        job.source_jobtype =jobs[i].workLevelCode.shortName.replace('Hourly','').trim()
      }
  
      job.url = out["pass_it"]["domainExtract"] +jobs[i].customFieldGroup.stringFields[0].stringValue.trim()                 
      job.temp = "1";
      returnedJobs.push(job);
    }
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
  function clean(location)
  {
    location = location.replace("LAS VEGAS PREMIUM OUTLET,","");
    location = location.replace("LIVERMORE OUTLET,","");
    location = location.replace("Corporate,","");
    location = location.replace("CABAZON OUTLET,","");
    location = location.replace("ORLANDO OUTLET,","");
    location = location.replace("SAWGRASS OUTLET,","");
    location = location.replace("WOODBURY OUTLET,","");
    location = location.replace("TYSONS GALLERIA,","");
    location = location.replace("SAN FRAN - WESTFIELD,","");
    location = location.replace("MIAMI,","");
    location = location.replace("LAS VEGAS - FORUM SHOPS,","");
    location = location.replace("SOUTH COAST PLAZA,","");
    location = location.replace("SAN DIEGO,","");
    location = location.replace("CENTURY CITY,","");
    location = location.replace("BAL HARBOUR,","");
    location = location.replace("MALIBU,","");
    location = location.replace("WEST HOLLYWOOD,","");
    location = location.replace("HOUSTON,","");
    location = location.replace("DALLAS - NORTH PARK,","");
    location = location.replace("DETROIT,","");
    location = location.replace("MADISON AVENUE,","");
    location = location.replace("WORLD TRADE CENTER,","");
    location = location.replace("SOHO,","");
    location = location.replace("BOSTON,","");
    location = location.replace("TORONTO,","");
    location = location.replace("EAST HAMPTON,","");
    location = location.trim();
    return location;
  }
  /*Pagination */
  (function() {
    var out = {};
    if(typeof msg == "undefined") msg = function(x){return x;};
    out["pass_it"] = pass_it;
    if (out["pass_it"]["jobs"] < 20) {
      //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
      out["pass_it"].cont += 20;
      var url = out["pass_it"]["domainPagination"]+ out["pass_it"].cont;
  
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
  /*Description */
  (function() {
	var out = {};
	var job = {};
  	var selector = ".job-description-data";
  	var remove_selector = "";
  	//var job = pass_it["job"];
  
	var full_html = document.querySelector(selector);
  	// remove something from the jobdatata
	if (remove_selector != "") full_html.querySelector(remove_selector).remove();
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = function(x){return x};
  
	job.html 		= full_html.innerHTML.trim();
  
  	job.html = removeTextBefore(job.html, "Purpose and Scope", false);
    job.html = removeTextBefore(job.html, "Reports To:", false); 
  	//job.html = removeTextAfter(job.html, "Please respect our scent free", true);
  
    job.html 		  = cleanHTML(job.html);
    var tmp       = document.createElement("DIV");
    tmp.innerHTML = job.html;
    job.jobdesc 	= tmp.textContent.trim();
  
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