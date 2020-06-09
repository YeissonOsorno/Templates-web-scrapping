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
    var geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
  
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
      job.location = elem.querySelector("a").parentElement.nextElementSibling.textContent.trim(); 
      let _location = job.location.split(',');
      var newLocation = geoUS.doCleaning(_location[1].trim()); 
      job.location = _location[0] + ', ' + newLocation[0];
      job.temp = 3;
      jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
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
    }
  }
  
  /* Before Description */
  (function() {
	var out = {};
  	out.iframeSelector = "iframe#gnewtonIframe"
  	out.iframeWaitFor = "table#gnewtonJobDescription"
    return out;
})();

/* Descriptoin */
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
  
  	job.html 		= removeTextBefore(job.html,'Introduction to Job Post:',false);
	job.jobdesc 	= removeTextBefore(job.jobdesc,'Introduction to Job Post:',false);
  
  	job.html 		= removeTextAfter(job.html,'AAP/EEO Statement:',true);
	job.jobdesc 	= removeTextAfter(job.jobdesc,'AAP/EEO Statement:',true);
  	
  
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