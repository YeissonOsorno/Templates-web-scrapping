(function() {
	var out = {};
    var html_jobs = document.querySelectorAll("table.hyperTable>tbody>tr");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
        job.number = elem.querySelector("td:nth-child(1)").textContent.trim();
        job.country = elem.querySelector("td:nth-child(2)").textContent.trim();
        job.company = elem.querySelector("td:nth-child(3)").textContent.trim();  
        job.status = elem.querySelector("td:nth-child(5)").textContent.trim();  
        job.owner = elem.querySelector("td:nth-child(6)").textContent.trim();  
        job.expectedJobs = elem.querySelector("td:nth-child(10)").textContent.trim();  
        job.totalJobs = elem.querySelector("td:nth-child(11)").textContent.trim(); 
        job.badge = elem.querySelector('td:nth-child(11)>div>span').getAttribute('class').trim();
        job.currentPage = document.querySelector('div[class="page-selected page-unavailable"]').textContent.trim();         	
        jobs.push(job);        
  	} 
    Verify(jobs);
	out["jobs"]= jobs;
  	return out;
})();

function Verify(AllJobs){
    const result = {
        counts :[0,0,0],
        inError : [],
        inWarning :[],
        inSuccess : []
    }
    

    for(elem of AllJobs){
        if(elem.badge == "badge-success") {
            //console.log(' Page => ' + elem.currentPage + ' ' + elem.company +' : ' + "\x1b[32m All Good"); 
            //console.log("\x1b[32m Work it"); 
            let newSuccess = {number : elem.number, company :elem.company , expectedJobs : elem.expectedJobs , totalJobs :elem.totalJobs , currentPage :elem.currentPage}
            result.inSuccess.push(newSuccess);
            result.counts[0] = result.counts[0] + 1;
        }
        if(elem.badge == "badge-error"){ 
            //console.table(elem.company + ' : ' + "\x1b[31m Error Total Jobs is minor to Expected jobs"); 
            //console.log("\x1b[31m In Error"); 
            let newError = {number : elem.number, company :elem.company , expectedJobs : elem.expectedJobs , totalJobs :elem.totalJobs , currentPage :elem.currentPage}
            result.inError.push(newError);
            console.log({number,company , expectedJobs , totalJobs , currentPage} = elem)
            result.counts[1] = result.counts[1] + 1;
        }
        if(elem.badge == "badge-warning") { 
            //console.table(elem.company + ' : ' + "\x1b[33m Warning Total Jobs is major to Expected Jobs"); 
            //console.log("\x1b[33m In Warning"); 
            let newWarning = {number : elem.number, company :elem.company , expectedJobs : elem.expectedJobs , totalJobs :elem.totalJobs , currentPage :elem.currentPage}
            result.inWarning.push(newWarning);
            result.counts[2] = result.counts[2] + 1;
        }
    }
    console.table(result.counts);
    console.log("\x1b[32m Work it ✅"); 
    console.table(result.inSuccess);
    console.log("\x1b[33m In Warning 👌"); 
    console.table(result.inWarning);
    console.log("\x1b[31m In Error ❌"); 
    console.table(result.inError);
}