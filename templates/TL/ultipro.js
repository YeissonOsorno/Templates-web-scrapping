/* Infinite Pagination */
(function(){
    //$.t = function(){ return true;}
    inactivateJQuery();
    var out = {};
    var cli = "#LoadMoreJobs";
    //    out["has_next_page"] = clickMore(cli);
    if (typeof msg == "undefined") msg = console.log;
  
    if (document.querySelector("#LoadMoreJobs") && document.querySelector("#LoadMoreJobs").parentElement.style["display"] != "none") {
      document.querySelector(cli).click();
      msg("entra");
      out["has_next_page"] = true; 
    } else {
      out["has_next_page"] = false;
    }  
  
    setTimeout(function(){
      all_elems = document.querySelectorAll(cli);
      if(all_elems.length > 0) f();
    }, 30000);
  
  
    out["wait"] = 10000;
    out["html"] = true;
    return out;
  })();
  
  /* Expected Jobs */
  (function() {
	var out = {};
    var selector = "div.col-md-15 > span";
  	
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.trim();
  	expected_jobs_str = expected_jobs_str.split("of").pop()
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();
    /* Before extract */
(function() {
    var out = {};
    //out.waitFor = "";
    out["wait"]= 600;
    return out;
})();

/* Extract */
(function() {
    var out = {};
       var html_jobs = document.querySelectorAll("div.opportunity");
      
        var jobs = [];
    
        for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        
        var job  = {};
        var elem = html_jobs[x];
  
        
        job.title    = elem.querySelector("a").textContent.trim();
          //if(job.title.indexOf("-")>-1){
          //job.title = job.title.split("-").shift();
          //}
        job.url      = elem.querySelector("a").href.trim();
          
        job.location = elem.querySelector("span[data-automation='city-state-zip-country-label']").textContent.trim();
          
          if(job.location.indexOf(",")>-1){
            
                var numberOfCommas = job.location.match(/\,/g).length;
                if(numberOfCommas === 2){
  
              var city    = job.location.split(",").shift().trim();
              var state   = job.location.split(",")[1].replace(/[0-9]/g,"").trim();
              var country = job.location.split(",")[2].trim().replace("USA","US");
  
              var loc = "";
              var array_loc = Array();
  
              if(city) array_loc.push(city);
              if(state) array_loc.push(state);
              if(country) array_loc.push(country);
  
  
              if(array_loc.length) loc = array_loc.join(", ");
  
              job.location = loc;
  
               }
            }
  
        job.source_jobtype = elem.querySelector("span[data-automation=job-hours]").textContent.trim();
  
          /*----------DATE-POSTED-----------------------------*/
          var date = elem.querySelector("div.col-lg-4.col-md-5.col-sm-6.col-xs-6.text-right").textContent.trim();
          
          if(date.toLowerCase().indexOf("today")==-1 && date.indexOf("20")>-1){
          
        
            
        var datum = elem.querySelector("div.col-lg-4.col-md-5.col-sm-6.col-xs-6.text-right").textContent.trim();
            datum = datum.trim().replace(/\,/g,"").trim();
          
          //Oct 29, 2019
  
            var cut = " ";
            
            var day   =  datum.split(cut)[1];
            var month =  datum.split(cut)[0];
            var year  =  datum.split(cut)[2];
          
          
            if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
            if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
            if(month.toLowerCase().indexOf("mar")>-1){month = "3";}
            if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
            if(month.toLowerCase().indexOf("may")>-1){month = "5";}
            if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
            if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
            if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
            if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
            if(month.toLowerCase().indexOf("oct")>-1){month = "10";}
            if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
            if(month.toLowerCase().indexOf("dec")>-1){month = "12";}
            
        job.dateposted_raw  = month +"/"+  day +"/"+ year;
        }
  
          if(date.toLowerCase().indexOf("today")>-1){
          
            //---------Current-date-----------------------------//
            
            var today   = new Date();
            var c_day   = today.getDate();
            var c_month = (today.getMonth()+1);
            var c_year  = today.getFullYear();
  
            job.dateposted_raw  = c_month +"/"+  c_day +"/"+ c_year;
       
          }
        /*-------------------------------------------------*/
      
        
          job.temp = 1;
          
  
        if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
        jobs.push(job);
        }
  
      
      } 
    
    out["jobs"]= jobs;
      return out;
  })();
  
  