/* Review if location is empty */
(function() {
	let out = {};
    let html_jobs = document.querySelectorAll('tr[ng-class="j.trclass"]');
  	let jobs = [];for(let x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	let job = {};
    	let elem = html_jobs[x];   	
        job.location = elem.querySelector("td:nth-child(3").textContent.trim();
        if(job.location =="")        
            console.log('si hay jobs vacios' +  x)
        else
            out["jobs"] = console.log('\x1b[32m No hay jobs vacios')
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();