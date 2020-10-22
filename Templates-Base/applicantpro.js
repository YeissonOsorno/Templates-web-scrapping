/* Expected Jobs */
(function() {
var out = {};
  var selector = "div.list-group >h1";
  var regex = /\d+/;

  if (typeof msg === 'undefined') msg = console.log;

var expected_jobs_str = document.querySelector(selector).textContent.trim();
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
  var html_jobs = document.querySelectorAll("div.job-info");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
    var elem = html_jobs[x];
    job.title = elem.querySelector("h4").textContent.trim();
    job.url = elem.parentElement.href.trim();
    var check = elem.querySelector("ul>li:first-child");
    if(check){
      job.location = elem.querySelector("ul>li:first-child").textContent.trim()
      if(job.location.indexOf(',')> -1){
        let _location = elem.querySelector("ul>li:first-child").textContent.trim().split(',');
        if(typeof _location[1] !="undefined"){
          let newLocation = geoUS.doCleaning(_location[1].trim());
          _location.splice(1,1,newLocation[0])
          job.location = _location.join(', ').trim();
        }
      }else{ job.location = job.location}
      
    }
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector("ul>li:last-child").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();
// Function GEO
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
/* With out Pagination */
/* Description*/
(function() {
  var out = {};
  var job = {};
  var months = {
    jan:"01", feb:"02", mar:"03", apr:"04",may:"05", jun:"06", jul: "07", aug: "08", sep: "09" ,
    oct: "10", nov: "11", dec: "12"
  }
  var _date = new _Date(Object.keys(months),Object.values(months)); 
  var selector = 'div[class="row text-left"]>div.col-sm-7';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;
  
  // Extract Dateposted_raw & salary
  let _dateOutput = full_html.querySelector('ul.job-items>li:nth-child(1)').textContent.split(' to').shift().trim().split('-');
  var newDate = _date.doCleaning(_dateOutput[1].trim()); 
  job.datePosted_raw = newDate[0] + '/' + _dateOutput[0] +'/' + _dateOutput[2];
  let _type = full_html.querySelector('ul.job-items>li:nth-child(4)').textContent;
  //job.source_salary = full_html.querySelector('ul.job-items>li:nth-child(3)>span:last-child').textContent + ' '+ _type;  

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'What We Look For...', false);
  job.html = removeTextAfter(job.html, 'Be Bold. Apply Now.', true);
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
// function to replace date
function _Date(codeDate, dateReal) {
  this.codeDate = codeDate;
  this.dateReal = dateReal;
  this.doCleaning = (word)=>{
    var result, resulDate;
    result = this.doSearch(this.codeDate,word.toLowerCase());
    resulDate = this.dateReal[result];
    return new Array(resulDate, result);
  }
  this.doSearch = (arraySearch, targetValue)=> {
    let arrayDoSearch = arraySearch;
    let length = arrayDoSearch.length;
    for(var item = 0; item<length; item++){
      if(arrayDoSearch[item] === targetValue){
        console.log('\x1b[32m Find ',item);
        return item;
      }
    }  
  }
}