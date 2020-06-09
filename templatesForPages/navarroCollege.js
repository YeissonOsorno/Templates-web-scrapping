/* Expected jobs */
(function() {
	var out = {};
    var selector = "p.h1+br+span";
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.split('of').pop().trim();
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

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
    var html_jobs = document.querySelectorAll("table#searchResultsTable>tbody>tr:not(:first-child)");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("td:first-child").textContent.trim();
      let _location = job.location.split(',');
      var newLocation = geoUS.doCleaning(_location[1].trim());
      job.location = _location[0].trim() + ', ' + newLocation[0];
      job.dateposted_raw = elem.querySelector("td:last-child").textContent.trim().replace("Jun 08, '20","	Jun 08, 2020").trim();
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
  