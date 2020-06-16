/* Expected jobs */
(function() {
	var out = {};
  
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;

  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/* Extract contain multilocation */
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
    if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    //var element = document.querySelector("pre").textContent;
    //msg(element);
    var jobs =  pass_it["json"];
    var returnedJobs = [];    
    if(!jobs){
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.body.children[0].children[0].listItems;
    }
    //msg(typeof(jobs));
    for(var i in jobs) {
      var job = {};/*init*/
      // msg("Entre")
      job.title = jobs[i].title.instances[0].text;      
      job.url = "https://aig.wd1.myworkdayjobs.com" + jobs[i].title.commandLink;
      job.location = jobs[i].subtitles[1].instances[0].text;
      job.location = job.location.replace(/[0-9]/g,'').trim();
      if(job.location.indexOf('-')>-1){
        job.location = job.location.split('-').reverse().join('-');
        job.location = job.location.replace('Remote','US');
  
      }
      if( jobs[i].subtitles[2]){
        var dateposted = jobs[i].subtitles[2].instances[0].text.replace(/Posted|Ago/ig,'').trim();
        job.dateposted_raw = dateAgo(dateposted, ' ', 0, 1);
      }
      //job.location = job.location;
      job.temp = 5;
      //msg(job.location)
      if(job.location.indexOf("More...") > -1){
        var json_desc = JSON.parse(getDescription(job.url));
        var array = json_desc.body.children[1].children[0].children;
        for(var i in array){
          if(array[i].iconName == 'LOCATION'){
            var jobx = {};
            jobx.title = job.title;
            jobx.url = job.url; 
            jobx.location = array[i].imageLabel;
            jobx.location = jobx.location.replace(/[0-9]/g,'').trim();
            if(jobx.location.indexOf('-')>-1){
              jobx.location = jobx.location.split('-').reverse().join('-');
              jobx.location = jobx.location.replace('Remote','US');
            }
            jobx.temp = job.temp;
            returnedJobs.push(jobx);
          }
        }
      }
      else{
        returnedJobs.push(job);
      }
    }
    //msg(jobs);
    //msg(returnedJobs.length);
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send(); 
    return response;
  }  
  function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
      var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
      }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
    var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
    var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
    var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10){dd ='0'+dd;}
    if (mm<10){mm ='0'+ mm;}
    dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }
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
  var selector = 'div[id="wd-HBox-NO_METADATA_ID-uid3"] >div >div:first-child div[id="wd-PageContent-vbox"] >div >ul:nth-child(3)';
  var remove_selectors = [];

  //Validate if jobtype exists
  var selector_jobtype = 'div[id="wd-HBox-NO_METADATA_ID-uid3"] >div >div:last-child div[id="wd-PageContent-vbox"] >div >ul >li:nth-child(2)'
  if(document.querySelector(selector_jobtype))
  {
    msg('\x1b[32m Yes!, contain jobtype')
    job.source_jobtype = document.querySelector(selector_jobtype).textContent.trim()

  }
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();  
 
  //job.html = removeTextAfter(job.html, 'Location', true);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);  
  job.html      = cleanHTML(job.html);
  job.html = removeTextAfter(job.html, 'At AIG', true);
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