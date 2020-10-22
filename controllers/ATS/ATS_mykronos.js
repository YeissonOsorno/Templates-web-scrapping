
// ATS mykronos

// https://prd01-hcm01.prd.mykronos.com/ta/6061362.careers?Showjob=1812228505

// Extract 


(function() {
	var out = {};
  	var jobs = [];

    var json =  JSON.parse(document.querySelector("pre").textContent);

      var trabajos = json.job_requisitions;     	

    for(i in trabajos) {
      var job = {};
      
    
     job.title = trabajos[i].job_title;
      
         //Location array "city, state, country"

          var city    = trabajos[i].location.city;
          var state   = trabajos[i].location.state;
          var country = trabajos[i].location.country;
         
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(country) array_loc.push(country);
       

          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;
 

      job.url =  "https://prd01-hcm01.prd.mykronos.com/ta/6061362.careers?Showjob=" + trabajos[i].id;

      

      
    job.temp = "Sep-2020";
      
     //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
      //}
    }
    
  
	out["jobs"]= jobs;
  	return out;
})();


// Pag 

(function () {
    var out = {};
  
    var url_base = window.location.href.split("?").shift() + "?offset="
  
    if (typeof pass_it == "undefined") pass_it = {};
    
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

  out["has_next_page"] = true;
  out["pass_it"].cont += 1;
        

     
var url = url_base + out["pass_it"]["cont"]; 
 window.location.href = url
 
      var json =  JSON.parse(document.querySelector("pre").textContent);

      var trabajos = json.job_requisitions;
 
  msg(trabajos.length)
  if (trabajos.length < 100)
      out["has_next_page"] = false;

    out.waitFor = 'pre';
    return out;
})();
