(function() {
	var out = {};
  	var jobmultilocation = {};
    var html_jobs = document.querySelectorAll("div.ftllist .ftlrow");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector(".editablesection  .no-change-header-inline h3 span a").textContent.trim();
    	//job.url = elem.querySelector(".editablesection  .no-change-header-inline h3 span a ").href.trim();
        var data = elem.querySelector(" td:last-child div").id.trim();
        var url = "https://bombardier.taleo.net/careersection/2/jobdetail.ftl?job="+data;
      	job.url = url;
      	var datalocation = elem.querySelector(".morelocation span").textContent.trim();
      	var location = datalocation.split('-');
           
        //Validación de la ciudad por defecto
      
      	if(datalocation =='Multiple Locations'){
          job.location = 'Dallas, Texas , USA';
        }else{
         	var city = location[2];
         	var state =  location [1];
         	var country = location[0]
          	datalocation =  `${city}-${state}-${country} `
          	job.location = datalocation;
         }
      	
        //Validación para el multi location
     	if(job.location.search(',') != -1){
            var datamultilocation =job.location;
          	var splitdata = datamultilocation.split(',');
          	var hey = splitdata.pop()
            //datamultilocation.split(',')[1];
            jobmultilocation.title = job.title;
            jobmultilocation.url = job.url;
            jobmultilocation.location = hey;
            jobmultilocation.dateposted_raw = job.dateposted_raw;
      		jobs.push(jobmultilocation);
          	job.location = splitdata[0]
         }
     
      	
      	
    	//job.location = elem.querySelector(".morelocation span").textContent.trim();
        job.dateposted_raw = elem.querySelector(" td:last-child div div:nth-child(4) span:nth-child(3)").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();