/* Extrac */
(function() {
	var out = {};
  	out.pic = true;
  	var iframe = document.querySelector('iframe#gnewtonIframe').contentWindow.document;
    var html_jobs = iframe.querySelectorAll("div.gnewtonCareerGroupJobTitleClass");
    //var html_jobs = document.querySelectorAll("table#gnewtonCareerHome>tbody>tr:not(:first-child)");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};//td.gnewtonJobLink 
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("a").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = elem.querySelector("a").parentElement.nextElementSibling.textContent.trim()
      	//job.location =  job.location[1].trim() +',' + job.location[2].trim();
      /*if(job.location == 'Suite 100,Peoria'){
          	job.location = 'Peoria,IL';
        }
      	if(job.location == 'Suite 4,Bourbonnais'){
          	job.location = 'Bourbonnais,IL';
        }*/
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 3;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

/* Before description */
(function() {
	var out = {};
  	out.iframeSelector = "iframe#gnewtonIframe"
  	out.iframeWaitFor = "table#gnewtonJobDescription"
    return out;
})();
/* Description */
(function() {
	var out = {};
	var job = {};
  	var iframe = document.querySelector('iframe#gnewtonIframe').contentWindow.document;
  	
  	var selector = "table#gnewtonJobDescription";
  	if(!iframe.querySelector(selector)){
      	var selector = "#gnewtonJobDescriptionText";
    }
  	var remove_selectors = [];
  	//var job = pass_it["job"];
  
	var full_html = iframe.querySelector(selector);
  	// remove something from the jobdatata
	if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;

  
	job.html 		= full_html.innerHTML.trim();
	job.jobdesc 	= full_html.textContent.trim();
  
	job.html 		= cleanHTML(job.html);
	job.jobdesc 	= cleanHTML(job.jobdesc);
  
  	job.html 		= removeTextBefore(job.html,'DESCRIPTION',false);
	job.jobdesc 	= removeTextBefore(job.jobdesc,'DESCRIPTION',false);
  
  	job.html 		= removeTextAfter(job.html,'Apply for this Position',true);
	job.jobdesc 	= removeTextAfter(job.jobdesc,'Apply for this Position',true);
  	
  
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