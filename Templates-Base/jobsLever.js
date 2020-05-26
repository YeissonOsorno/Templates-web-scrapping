/* Extract */
(function() {
    var out = {};
    var countries = {
        AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
        FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
        LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
        MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
        ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
        TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
    }
    var html_jobs = document.querySelectorAll("a.posting-title");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h5").textContent.trim();
    	job.url = elem.href.trim();
        job.location = elem.querySelector("span.sort-by-location").textContent.trim();
        console.log(job.location);
        /* Intancia del GEO */
        var geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
        if(job.location.indexOf(',')>-1){
            if(geoUS.verify(job.location.split(',')[1].trim())){
                var newLocation = geoUS.doCleaning(job.location.split(',')[1].trim()); 
                job.location = job.location.split(',')[0].trim() + ', ' + newLocation[0];
            }
          }
        
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
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
/* Función para reemplazar el countryCode */

function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word)=>{
        var result, countryResult;
        result = this.doSearch(this.countryCodesArr,word);
        countryResult = this.countriesArr[result];
        return new Array(countryResult, result);
    }
    this.doSearch = (arraySearch, targetValue)=> {
        let arrayDoSearch = arraySearch;
        let length = arrayDoSearch.length;
        for(var item = 0; item<length; item++){
        	if(arrayDoSearch[item] === targetValue){
        		console.log('\x1b[32m Find');
        		return item;
        	}
        }  
    },
    this.verify =  function(toVerify){
        if(toVerify.length == 2){
            return true;
        }else{
            return false;
        }
    }
}

/* Description */
(function() {
    var out = {};
    var job = {};
    var selector = "div.posting-page div.page-full-width:last-child";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html = removeTextBefore(job.html, 'The job will be hands-on', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html = removeTextBefore(job.html, 'Responsibilities:', false);
    job.html = removeTextAfter(job.html, 'We are rapidly expanding', true);
    
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
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