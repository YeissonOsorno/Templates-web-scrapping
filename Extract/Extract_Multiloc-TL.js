(function() {
	var out = {};
  	var jobs = [];
    var html_jobs = document.querySelectorAll("div.contentVacants div.contentOffer.offerVideo");
  	
  
  for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var elem = html_jobs[x];
    
    var loc = elem.querySelector("div.detailsOffer ul li:last-child").textContent.trim().split(",");
    loc.forEach( function (element){
    	var job = {};
    	
    	job.title = elem.querySelector("h2").textContent.trim();
    	job.url = elem.querySelector("div.actionOffer a.outline").href.trim();
    	job.location = element.trim()+',CO';
    	 /*var fecha = elem.querySelector("").textContent.trim().split("/");
        job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
	    //job.source_apply_email = elem.querySelector("").textContent.trim();
	    //job.source_empname = elem.querySelector("").textContent.trim();
	    //job.source_jobtype = elem.querySelector("").textContent.trim();
	    //job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
     }, elem);
  }  
  
	out["jobs"]= jobs;
  	return out;
})();