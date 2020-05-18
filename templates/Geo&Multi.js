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
  var html_jobs = document.querySelectorAll('div[class="uabb-adv-accordion-item"]>div:first-child');
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("h6").textContent.trim().split('-')[0];
    job.url = window.location.href.trim();
    job.location = elem.querySelector("h6").textContent.trim().split('-')[1];
    job.temp = 1;
    
    var geoUS = new Geo(Object.keys(countries),Object.values(countries));
    
    if(job.location.indexOf(' or ')>-1){
      let _location  = job.location.split(',');
      /* Cambio el country Code */
      let newLocation = geoUS.doCleaning(_location[1].trim());
      
      let params = [job.title,job.url,job.temp,newLocation[0]];
      var _multilocation = new MultiLocation('or',_location[0],params);
      let _result = _multilocation.operationMultilocation();
      _result.map(_location => jobs.push(_location));

    }else{
      let _location  = job.location.split(',');      
      let newLocation = geoUS.doCleaning(_location[1].trim());
      job.location = _location[0].trim() + ', ' + newLocation[0];
      jobs.push(job);
    }

  } 

  out["jobs"]= jobs;
  return out;
})();
/* Función de Multilocation */

function MultiLocation(char_separator,valueJobs, ...data){
  this.char_separator = char_separator;
  this.valueJobs = valueJobs;
  this.data = data;
  this.operationMultilocation = function(){
    let jobsx = [];
    let locations = this.valueJobs.split(this.char_separator);        
    for(var x in locations){
      var jobx = {};
      jobx.title = this.data[0][0];
      jobx.url = this.data[0][1];
      jobx.location = locations[x] + ', ' + data[0][3];
      jobx.temp = this.data[0][2]
      jobsx.push(jobx);
    }
    return jobsx
  }        
}

/* Función de GEO country codes */

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