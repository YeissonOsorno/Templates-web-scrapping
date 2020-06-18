(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.swiper-wrapper > article");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("span.job__title").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = elem.querySelector("span.job__location").textContent.trim();
        job.location = job.location.replace(/, 1|, 2|, 3|, 4|, 5|,6 |, 7|, 8|, 9|, 0|/gi,'').replace(/1|2|3|4|5|6|7|8|9|0/gi,'')
		var date = elem.querySelector("span.job__infos").textContent.trim().split("-").shift();
        var cut = "/";   
        let day   =   date.split(cut)[0];
        let month =   date.split(cut)[1];
        let year  =   date.split(cut)[2];
        job.dateposted_raw  = month +"/"+  day +"/"+ year;
		 //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
        if(elem.querySelector("span.job__contract")){
          job.source_jobtype = elem.querySelector("span.job__contract").textContent.trim();
        }
        if(elem.querySelector("span.job__rem")){
          job.source_salary = elem.querySelector("span.job__rem").textContent.trim();
        }
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();