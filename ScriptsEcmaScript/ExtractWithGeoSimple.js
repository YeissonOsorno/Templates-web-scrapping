(function() {
    let out = {};
    let countries = {
      AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
      LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
      MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
      ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
      TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
    }
    let html_jobs = document.querySelectorAll('section[class="search-results"] tr:not(:first-child)');
    const jobs = [];for(let x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      let job = {};
      let elem = html_jobs[x];
      let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
      job.title = elem.querySelector('td[data-th="Job Title"] a').getAttribute('title').replace(/\(([^)]*)\)/g ,'')
      job.url = elem.querySelector('td[data-th="Job Title"] a').href.trim();
      job.location = elem.querySelector('td[data-th="Location"]').textContent.trim()
      let _location = job.location.split('-');
      let newLocation = geoUS.doCleaning(_location[1].trim()); 
      job.location = `${_location[2]}, ${newLocation[0]}, ${_location[0]}`
      job.source_jobtype = elem.querySelector('td[data-th="Position Type"] ').textContent.trim().replace(' Regular','').trim();
      job.title= job.title.replace('Part Time','').trim()
      job.title= job.title.replace('Full Time','').trim()
      let split = job.title.split('-').pop()    
      job.title = job.title.replace('-'+split,'').trim()
  
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 2;
      jobs.push(job);
    } 
    out["jobs"]= jobs;
    return out;
  })();
  function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word)=>{
      let result, countryResult;
      result = this.doSearch(this.countryCodesArr,word);
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