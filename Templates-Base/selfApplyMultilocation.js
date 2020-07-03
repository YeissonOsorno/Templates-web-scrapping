/* Extract */

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div[id="contentPlaceHolder_panelPositionsSelected"] div[class="row"] ');
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector(" h4").textContent.trim();
      job.url = elem.querySelector('div.c5.columns a:nth-child(2)').href.trim();
      job.temp = 1;
      var full_html = getDescription(job.url); 
      var div = document.createElement("div"); 
      div.innerHTML = full_html;
      job.location = div.querySelector('div[class="RichTextContent"]>span>div:nth-child(1)').textContent.trim();
      if(job.location.indexOf(' or ')>-1){
          let params = [job.title,job.url,job.temp];       	    
          let result = new MultiLocation('or',job.location,job.title,job.url,job.temp);       	   
          result = result.operationMultilocation();         	   
          result.map(location =>  jobs.push(location));       	
      }else{
        jobs.push(job);
      }    
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send(); 
    return response;
  }
  function MultiLocation(char_separator,valueJobs, ...data){
    this.char_separator = char_separator;
    this.valueJobs = valueJobs;
    this.data = data;
    this.operationMultilocation = function(){
      let jobsx = [];
      let locations = this.valueJobs.split(this.char_separator);        
      for(var x in locations){
        var jobx = {};
        jobx.title = this.data[0];
        jobx.url = this.data[1];
        jobx.location = locations[x];
        jobx.temp = this.data[2]
        jobsx.push(jobx);
      }
      return jobsx
    }
  
  }