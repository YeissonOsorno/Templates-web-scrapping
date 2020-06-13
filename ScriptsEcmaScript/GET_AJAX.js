/* Extract */
(function () {
    let jobs = [];
    let out = {};
    let countries = {
      AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
      LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
      MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
      ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
      TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
    }
    let json;
    const data = {};
    $.ajax({
      url:
      "https://secure4.saashr.com/ta/rest/ui/companies/%7C6018807/recruitment/job-requisitions?offset=0&ein_id=&_=1591976443587", 
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/json;charset=UTF-8", // 2) headers
      },
      type: "GET", 
      dataType: "json", 
      //data: data,
      data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("\x1b[32m SUCCESS...!");
        json = result.job_requisitions;
        for (let i = 0; i < json.length; i++) {
          let job = {};
          let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
          job.title = json[i].job_title;
          let dom = window.location.protocol +"//" +window.location.hostname +window.location.pathname +"?ShowJob=";
          job.url = dom + json[i].id;
          const _location =[];        
          if ( json[i].location.city) _location.push(json[i].location.city);
          if (json[i].location.state) {
             let newLocation = geoUS.doCleaning(json[i].location.state.trim()); 
            _location.push(newLocation[0]);
          }
          if (json[i].location.country)  _location.push(json[i].location.country);
  
          if (_location.length) job.location = _location.join(', ');
          job.temp = "Feb-2020";
          jobs.push(job);
        }
     
      },
      error: function (error) {
        msg(error);
      },
    });
    out["jobs"] = jobs;
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
  
