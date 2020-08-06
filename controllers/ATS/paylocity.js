/* Paylocity */

/* Expected Jobs */
(function() {
	let out = {};
    let selector = "h2.center-me";
  	let regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	let expected_jobs_str = document.querySelector(selector).textContent.trim();
  	let expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/* before extract */
(function() {
	let out = {};
  	out.waitFor = "div.job-listing-job-item";
    return out;
})();

/* Extract */
(function() {
	let out = {};
    const html_jobs = document.querySelectorAll("div.job-listing-job-item");
  	const jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	let elem = html_jobs[x];
    	job.title = elem.querySelector("a").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();    	   	
    	job.dateposted_raw = elem.querySelector("span.job-item-title +br +span").textContent.replace('-','').trim();
        
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

/* Job Description */
(function() {
    let out = {};
    let job = {};
    const selector = "div.job-preview";
    let countries = {
        AL: "Alabama, US", AK: "Alaska, US", AZ: "Arizona, US", AR: "Arkansas, US", CA: "California, US", CO: "Colorado, US", CT: "Connecticut, US", DE: "Delaware, US",
        FL: "Florida, US", GA: "Georgia, US", HI: "Hawaii, US", ID: "Idaho, US", IL: "llinois, US", IN: "Indiana, US", IA: "Iowa, US", KS: "Kansas, US", KY: "entucky, US",
        LA: "Louisiana, US", ME: "Maine", MD: "Maryland, US", MA: "Massachusetts, US", MI: "Míchigan, US", MN: "Minnesota, US", MS: "Mississippi, US", MO: "Missouri, US",
        MT: "Montana, US", NE: "Nebraska, US", NV: "Nevada, US", NH: "New Hampshire, US", NJ: "New Jersey, US", NM: "New Mexico, US", NY: "New York, US", NC: "North Carolina, US",
        ND: "North Dakota, US", OH: "Ohio, US", OK: "Oklahoma, US", OR: "Oregon, US", PA: "Pennsylvania, US", RI: "Rhode Island, US", SC: "South Carolina, US", SD: "South Dakota, US",
        TN: "Tennessee, US", TX: "Texas, US", UT: "Utah, US", VT: "Vermont, US", VA: "Virginia, US", WA: "Washington, US", WV: "West, US", WI: "Wisconsin, US", WY: "Wyoming, US",DC:"DC"
    }
    let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
    const remove_selectors = ['div[style="min-height: 50px;"]','div.mobile-apply-btn','div.job-listing-header +div>p','div.preview-bottom-apply-btn'
                                                       ,'div[class="vertical-padding"]','div.powered-by-paylo'
                                                       ];
    //var job = pass_it["job"];
    let full_html = document.querySelector(selector);
    // Extract Jobtype
    let jobtype = document.querySelector('div.preview-location').innerText;
    if(jobtype.includes('•')) job.source_jobtype =document.querySelector('div.preview-location').innerText.split('•')[1].split('in').shift().trim();
    
    //Extract Location
    let _location = document.querySelector('div.preview-location').innerText;
    if(_location.includes('•')) 
          _location =document.querySelector('div.preview-location').innerText.split('•')[0].trim();
    else
          _location =document.querySelector('div.preview-location').innerText.trim();
    
    if(_location.includes(',')){
        _location = _location.split(',');
        let newLocation = geoUS.doCleaning(_location[1].trim());
        _location.splice(1,1,newLocation[0])
        job.location = _location.join(', ').trim();
    }
    
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
      
    // Clean little more
    for(const a of full_html.querySelectorAll('p')){
        const text = a.textContent.trim();
        if(text.search(/Job Title/i) > -1){
          a.remove();
          
        }
    }
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, '*Hours', true);
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
  
  /* Function to change countryCode */
  function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word)=>{
        let result, countryResult;
        result = this.doSearch(this.countryCodesArr,word);
        if(typeof result =="string") return result;
        countryResult = this.countriesArr[result];
        return new Array(countryResult, result);
    }
    this.doSearch = (arraySearch, targetValue)=> {
        let arrayDoSearch = arraySearch;
        let length = arrayDoSearch.length;
        for(let item = 0; item<length; item++){
        	if(arrayDoSearch[item] === targetValue){
        		console.log('\x1b[32m Find');
        		return item;
        	}
        }  
    }
}