(function () {
  const out = {};
  let countries = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "entucky",
    LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
    MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
    ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
    TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming",DC:"DC"
  }
  const html_jobs = document.querySelectorAll('div.jobs-section__item');
  const jobs = []; for (let x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    let job = {};    
    let geoUS = new Geo(Object.keys(countries), Object.values(countries));

    let elem = html_jobs[x];
    job.title = elem.querySelector("h2>a").textContent.trim();
    job.url = elem.querySelector("h2>a").href.trim();
    let _location = elem.querySelector('div[class="neu-text--caption neu-margin--bottom-10"]').innerText.trim().replace('United States','US').split(',');
    
    let newLocation = geoUS.doCleaning(_location[1].trim());
    _location.splice(1, 1, newLocation[0]);    
    job.location = _location.join(', ').trim();

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  }

  out["jobs"] = jobs;
  return out;
})();

/* Function that convert countryCode US to State */
function Geo(countryCodesArr, countriesArr) {
  this.countryCodesArr = countryCodesArr;
  this.countriesArr = countriesArr;
  this.doCleaning = (word) => {
    let result, countryResult;
    result = this.doSearch(this.countryCodesArr, word);
    countryResult = this.countriesArr[result];
    return new Array(countryResult, result);
  }
  this.doSearch = (arraySearch, targetValue) => {
    let arrayDoSearch = arraySearch;
    let length = arrayDoSearch.length;
    for (let item = 0; item < length; item++) {
      if (arrayDoSearch[item] === targetValue) {
        console.log('\x1b[32m Find');
        return item;
      }
    }
  }
}