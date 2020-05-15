/*
* Ultipro type POST without Pagination
*/
/*Infinite Pagination for wait selector of expected jobs*/
(function() {
	var out = {};
  var selector = 'span[data-automation="opportunities-count"]';
  	out.waitFor = selector
    return out;
})();
/*Expected jobs*/
(function() {
  var out = {};
    var selector = 'span[data-automation="opportunities-count"]';
    var regex = /\d+/;
  
    if (typeof msg === 'undefined') msg = console.log;

  var expected_jobs_str = document.querySelector(selector).textContent.trim().split('de').pop().trim()
    var expected_jobs = regex.exec(expected_jobs_str)[0];
  
    out["expected_jobs"] = expected_jobs;

    return out;
})();


/*Extract*/

(function () {
  var jobs = [];
  var out = {};  
  var json; 
  var countries = {
    AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
    LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
    MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
    ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
    TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
  }
  var data = {"opportunitySearch":{"Top":50,"Skip":0,"QueryString":"","OrderBy":[{"Value":"postedDateDesc","PropertyName":"PostedDate","Ascending":false}],
                                   "Filters":[{"t":"TermsSearchFilterDto","fieldName":4,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":5,
                                                                                                                   "extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":6,"extra":null,"values":[]}]},"matchCriteria":{"PreferredJobs":[],"Educations":[],
                    "LicenseAndCertifications":[],"Skills":[],"hasNoLicenses":false,"SkippedSkills":[]}}

  $.ajax({
    url: 'https://recruiting2.ultipro.com/RIC1008RICM/JobBoard/12642768-45c0-4aea-ab33-3b03509dc7f8/JobBoardView/LoadSearchResults',                                            // 1) url
    headers: {                                                      
      "accept": "application/json, text/javascript, */*; q=0.01",
      "Content-Type":"application/json; charset=utf-8"   
    },
    type: 'POST',                                     
    dataType: "json",                                 
    //data: data,
    data: JSON.stringify(data),
    async: false,
    success: function (result) {
      msg("\x1b[32m loading jobs...");
      json = result.opportunities;                                
      //msg(json.length);
      for (var i = 0; i < json.length; i++) {
        var job = {};
        job.title = json[i].Title;
        var domain = 'https://recruiting2.ultipro.com/RIC1008RICM/JobBoard/12642768-45c0-4aea-ab33-3b03509dc7f8/OpportunityDetail?opportunityId=';
        job.url = domain +json[i].Id;
        var geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
        var newLocation = geoUS.doCleaning( json[i].Locations[0].Address.State.Code.trim()); 
        job.location = json[i].Locations[0].Address.City +', ' +newLocation[0]+', ' + json[i].Locations[0].Address.Country.Code ;
        job.dateposted_raw = json[i].PostedDate.split('T').shift().trim().split('-').reverse().join('/');
        var jobtype  = json[i].FullTime;
        if(jobtype == true)  job.source_jobtype  = 'Full Time';

        job.temp = 1;
        jobs.push(job);
      }
    },
    error: function (error) {
      msg(error);
    }
  });
  out["jobs"] = jobs;
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
/* Job Description*/
(function() {
  var out = {};
  var job = {};
  var selector = 'p[class="opportunity-description"]';
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
