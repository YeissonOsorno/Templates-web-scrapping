//BEFORE EXTRACT
(function() {
	var out = {};
     try{
       var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.body.children[0].children[0].listItems;
       out["json"] = jobs;
     }catch(error){
        out["wait"] = 500;
       
     }
	
  	return out;
})();
//EXTRACT


  //PAGINTATION

  (function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};
   
    if (!pass_it["cont"]) {
        out["pass_it(function() {
    var out = {};
    // var html_jobs = document.querySelectorAll("");
    //  This gives you an HTMLElement object
  
    if(typeof pass_it == "undefined") pass_it = {};
    msg("***************************************");
    //msg(pass_it);
    //msg(window.location.href);
    msg("***************************************");
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    //var element = document.querySelector("pre").textContent;
    //msg(element);
    var jobs =  pass_it["json"];
  
    var returnedJobs = [];  
    if(!jobs){
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.body.children[0].children[0].listItems;
    }
    //msg(typeof(jobs));
    for(i in jobs) {
      var job = {};/*init*/
      // msg("Entre")
      job.title = jobs[i].title.instances[0].text;
      job.title = job.title.split("(").shift();
      job.url = "https://cibc.wd3.myworkdayjobs.com" + jobs[i].title.commandLink;
      job.location = jobs[i].subtitles[0].instances[0].text.split("-").reverse().join(", ");
      job.location = job.location;
  
      job.temp = 5;
      returnedJobs.push(job);
  
    }
    //msg(jobs);
    //msg(returnedJobs.length);
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

    if (out["pass_it"]["jobs"] == 50) {
    
    //url, cambia según el JSON
    var url = "https://cibc.wd3.myworkdayjobs.com/search/9/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont
    + "?clientRequestID=9900407428ef4bb5af89b60c18ff355b";
	out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();

//SI NO FUNCIONA, ELEGIR POR SELECTOR
//JOB DESCRIPTION

(function() {
	var out = {};
	  var job = {};
  
		var job = pass_it["job"];
	
	  var xhrrequest = new XMLHttpRequest();
	  xhrrequest.open("GET", job.url, false);
	  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
	  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
	  xhrrequest.setRequestHeader("Cache-Control","no-cache");
	  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	  xhrrequest.setRequestHeader("Pragma","no-cache");
   
	  var hola = "";
	  xhrrequest.onreadystatechange = function() {
		  //return xhrrequest.status;
		  //hola = "[Y]-> " + xhrrequest.status;
		  if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
			//console.log(xhrrequest.responseText);
			{
			  //console.log(xhrrequest.responseText);
			  hola = xhrrequest.responseText;
			  //msg(hola);
			  var json = JSON.parse(hola);
			  
			  //msg(json.openGraphAttributes.description);      
			  
			  job.html 		= json.openGraphAttributes.description;
			  
			job.html 		  = cleanHTML(job.html);
			var tmp       = document.createElement("DIV");
			tmp.innerHTML = job.html;
			job.jobdesc 	= tmp.textContent.trim();
			}
	  };
   
	  xhrrequest.send(); 
	
			out["html"] = true;
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