(function() {
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
    var data = Verify(jobs);
    document.write(`<!DOCTYPE HTML>
    <html>
    <head></head>
    
    <body>
      <canvas id="c" width="500" height="500"></canvas>
      <div class="row">
                <div class="row">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">Errors</span>
                          <ul>
                              <li>${data.inError[0].company}</li>
                              <li>${data.inError[1].company}</li>
                              <li>${data.inError[2].company}</li>
                              <li>${data.inError[3].company}</li>
                              <li>${data.inError[4].company}</li>
                          </ul>
                        </div>
                        <div class="card-action">
                          <a href="#">This is a link</a>                          
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
      <script>
        var ctx = document.getElementById("c").getContext("2d");
        var data = {
          labels: ["Good", "Error", "Warning"],
          datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [${data.counts}]
          }, {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [${data.counts}]
          }]
        };
        var MyNewChart = new Chart(ctx).Line(data);
      </script>
    </body>
    
    </html>`)
    
    
    console.log(data.counts)	
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
    return result;
}