// THIS TEMPLATE HAVEN'T PAGINATION
/* Extratc */
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
    
    var html_jobs = document.querySelectorAll("div#results> div");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("span.jobTitle").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("span.jobLocation").textContent.split('-').pop().trim().replace(/[0-9]/g,'');
      let _location = job.location.split(',');
      var newLocation = geoUS.doCleaning(_location[1].trim());
      job.location = _location[0].trim() + ', ' + newLocation[0];
      job.source_jobtype = elem.querySelector("span.jobLocation").textContent.split('|').shift().trim();		
      job.temp = 1;
      jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  /* Function GEO Country Codes*/
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
  
  /* Description */
  (function() {
    var out = {};
    var job = {};
    var selector = 'div[name="main"]';
    var remove_selectors = ["style","a","button"];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.source_salary = document.querySelector('span[aria-label="Salary Range"]').textContent.trim();
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Description', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html = job.html.replace('">','');
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