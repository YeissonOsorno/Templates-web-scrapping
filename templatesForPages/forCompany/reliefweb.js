/* Expected Jobs */
(function() {
	var out = {};
    var selector = "div#results";
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.split('of').pop().replace(',','').trim();
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();
/* Before extract */
(function() {
	var out = {};
  	out.waitFor = "div.articles>article.job";
    return out;
})();

/* Extract */
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.articles>article.job");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("h4>a").textContent.trim();
      job.url = elem.querySelector("h4>a").href.trim();
      job.dateposted_raw = converToFormat(elem.querySelector("dd.posted").textContent.trim());
      job.dateclosed_raw = converToFormat(elem.querySelector("dd.closing").textContent.trim());   
      job.source_empname = elem.querySelector("dd.source").textContent.trim();       
      job.temp = 1;
      /* Draw response of request in a DIV*/
      const dataFromDescription = getDescription(job.url); 
      let div = document.createElement("div"); 
      div.innerHTML = dataFromDescription;
      // Job experience required
      //if(div.querySelector('dd.experience'))  job.experience_required = div.querySelector('dd.experience').texContent
  
      /* Calculate quantity countries and cities*/
      let countCountry = div.querySelectorAll('dd.country>ul>li').length;
      let countCity = div.querySelectorAll('dd.city>ul>li').length;
  
      /* validate quantity jobs*/
      let response =  locationValidate(countCountry,countCity);
  
      if(response =="null")  job.location = "New York, NY, US"   
      if(response =="equal"){
        let country = div.querySelector('dd.country>ul>li').textContent.replace('United States of America','US').trim();
        let city = div.querySelector('dd.city>ul>li').textContent.trim();
        job.location = city + ', ' + country;
      }
      if(response =="onlyCountry") job.location = div.querySelector('dd.country>ul>li').textContent.replace('United States of America','US').trim();
      if(response =="onlyCity") job.location = div.querySelector('dd.city>ul>li').textContent.trim();
  
      if(response =="countryMultiLocation"){
        let params = [job.title,job.url,job.dateposted_raw,job.dateclosed_raw,job.source_empname,job.temp];	
        let result = new MultiLocation(div.querySelectorAll('dd.country>ul>li'),params);        
        result = result.operationMultilocation();       
        result.map(location => jobs.push(location));
      }
      if(response =="cityMultiLocation"){
        let params = [job.title,job.url,job.dateposted_raw,job.dateclosed_raw,job.source_empname,job.temp];	        
        let result = new MultiLocation(div.querySelectorAll('dd.city>ul>li'),params);        
        result = result.operationMultilocation();       
        result.map(location => jobs.push(location));      
      }
      if(job.location) jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
  /* Request to Description for extract job location*/
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false);     
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) response = xhrrequest.responseText;    
    };
    xhrrequest.send(); 
    return response;
  }

  /*********** SECTION OF FUNCTIONS ***********/
  
  /* Multilocation */
  function MultiLocation(valueJobs, ...data) {   
    this.valueJobs = valueJobs;
    this.data = data;
    this.operationMultilocation = function () {
      let jobsx = [];
      let locations = this.valueJobs.length;
      for (var x = 0; x<locations; x++) {
        var jobx = {};
        jobx.title = this.data[0][0];
        jobx.url = this.data[0][1];
        jobx.location = this.valueJobs[x].innerText;   
        jobx.dateposted_raw = this.data[0][2];   
        jobx.dateclosed_raw = this.data[0][3];
        jobx.source_empname = this.data[0][4];
        jobx.temp = this.data[0][5]
        jobsx.push(jobx);
      }
      return jobsx;
    }
  
  }
  
  /* Validate type of location*/
  function locationValidate(countCountry,countCity){
    let _response = "";
    if(countCountry<1 && countCity<1) {
      msg('\x1b[31m null');
      response = "null";
    }
    if(countCountry == 1 && countCity == 1){
      msg('\x1b[32m Equal ');
      response ="equal";      
    }
    if(countCountry > 1 && countCity > 1){
      msg('\x1b[33m Both Multi Location ');
      response ="bothMultiLocation";
    }
    if(countCountry == 1 && countCity ==0){
      msg('\x1b[34m Only country ');
      response = "onlyCountry";
    }
    if(countCountry == 0 && countCity ==1){
      msg('\x1B[35 Only Exists city ');
      job.location = div.querySelector('dd.city>ul>li').textContent.trim();
    }
    if(countCountry == 1 && countCity >1){
      msg('\x1B[36 Only  city ');
      response ="onlyCity";
    }
    if(countCountry >1 && countCity == 0){
      msg('\x1B[37 Only Country Multi location ');
      response ="countryMultiLocation";
    }
    if(countCountry ==0 && countCity >1){
      msg('\x1B[37 Only City Multi location');
      response ="cityMultiLocation";
    }
    return response;
  }
  
  /*Convert to format*/
  function converToFormat(date){
    let months = {
      jan:"01", feb:"02", mar:"03", apr:"04",may:"05", jun:"06", jul: "07", aug: "08", sep: "09" ,
      oct: "10", nov: "11", dec: "12",
      january:"01", february:"02", march:"03", april:"04",may:"05", juny:"06", july: "07", august: "08", september: "09" ,
      october: "10", november: "11", december: "12"
    }
    let dateInput,dateOutput;
    dateInput = date.split(' ');
    var _date = new _Date(Object.keys(months),Object.values(months)); 
    var newDate = _date.doCleaning(dateInput[1].trim()); 
    dateOutput =  newDate[0] + '/' + dateInput[0].replace(',','').trim() + '/' + dateInput[2];
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
            console.log('\x1b[32m Find');
            return item;
          }
        }  
      }
    }
    return dateOutput;
  }
/* pagination */
(function() {
    var out = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2          
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var next_page_selector = 'a[aria-label="Go to next page, page '+out["pass_it"].cont+'"]'; // Selector del next  
    var clickable_elem = document.querySelector(next_page_selector);
  
    if (clickable_elem) {
      out["pass_it"].cont++;
      clickable_elem.click();
      out["has_next_page"] = true;
    } else {      
      out["has_next_page"] = false;
    }
  
    out.waitFor = "div.articles>article.job";
    return out;
  })();
/* job description */
(function() {
    var out = {};
    var job = {};
    
    var selector = "#main > article > div";
   
    var full_html = $(selector);
    
      
      //---------INFO-------------------------------------
  
      var html_2 = $(selector).text(); 
  
      job.experience_required           = $("dd.experience").text().trim();
      // job.source_jobtype     = $("li#resumator-job-employment[title=Type]").text().trim();
      // job.source_empname     = $("").text().trim();
      // job.logo               = $("").attr("src");
      // job.source_salary      = $("").text().trim();
      // job.dateclosed_raw     = $("").text().trim();
    
        /*----------DATE-POSTED-----------------------------
            
        var datum = $("").text().trim();
            datum = datum.trim();
  
            var cut = "";
            
        var day   =  datum.split(cut)[0];
        var month =  datum.split(cut)[1];
        var year  =  datum.split(cut)[2];
            
        job.dateposted_raw  = month +"/"+  day +"/"+ year;
  
        /*-------------------------------------------------*/
  
       /*
       if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
       job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
       */
    
   //---------REMOVE---------------------------------------
  
      full_html.find('a').remove().end().html();
      full_html.find('input, img, button').remove().end().html();
      full_html.find('div.alert, form').remove().end().html();
      full_html.find('style, script').remove().end().html();
  
      //full_html.find("h1").remove().end().html();
  
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
  
   //----------------------------------------------------- 
    
    var full_html = full_html.html();
    
     job.html = full_html.trim();
   
    job.html = removeTextBefore(job.html, "Proposal Objective:", false);
    //job.html = removeTextBefore(job.html, "", false);
  
    job.html = job.html.split("How to apply")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
  
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
  
    //job.html = full_html.innerHTML.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  
    job.html    = cleanHTML(job.html);
    job.jobdesc = job.html;
    
    out["job"]  = job;
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