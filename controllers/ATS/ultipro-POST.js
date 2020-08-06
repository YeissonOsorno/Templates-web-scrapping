/*Infinite for wait selectro of expected jobs*/
(function() {
	var out = {};
  var selector = 'span[data-automation="opportunities-count"]';
  	out.waitFor = selector
    return out;
})();

/* Expected Jobs */
(function() {
	var out = {};
    var selector = 'span[data-automation="opportunities-count"]';
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.split('of').pop().trim()
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/* Extract With Pagination */
(function () {
    var jobs = [];
    var out  = {};
    var cont = 0;
    var json;  
    var countries = {
      AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
      LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
      MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
      ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
      TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
    }
    do {
  
      var data = {"opportunitySearch":{"Top":50,"Skip": cont,"QueryString":"","OrderBy":[{"Value":"postedDateDesc","PropertyName":"PostedDate","Ascending":false}],"Filters":[{"t":"TermsSearchFilterDto","fieldName":4,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":5,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":6,"extra":null,"values":[]}]},"matchCriteria":{"PreferredJobs":[],"Educations":[],"LicenseAndCertifications":[],"Skills":[],"hasNoLicenses":false,"SkippedSkills":[]}};
  
      $.ajax({
        url: window.location.protocol + "//" + window.location.hostname + window.location.pathname + "/JobBoardView/LoadSearchResults",                                            // 1) url
        headers: {                                                      
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Content-Type":"application/json; charset=utf-8"                // 2) headers
        },
        type: 'POST',                                               // 3) tipo
        dataType: "json",                                           // 4) data que retorna
  
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
          msg("SUCCES");
          json  = result.opportunities; 
          for (var i = 0; i < json.length; i++) {
            var job = {};
            job.title = json[i].Title;
            var domain =window.location.protocol + "//" + window.location.hostname + window.location.pathname + "OpportunityDetail?opportunityId=";
            job.url = domain +json[i].Id;
            var geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
            var newLocation = geoUS.doCleaning( json[i].Locations[0].Address.State.Code.trim()); 
            job.location = json[i].Locations[0].Address.City +', ' +newLocation[0]+', ' + json[i].Locations[0].Address.Country.Code ;
            job.dateposted_raw = json[i].PostedDate.split('T').shift().trim().split('-').reverse().join('/');
            var jobtype  = json[i].FullTime;
            if(jobtype == true) 
                  job.source_jobtype  = 'Full Time';
            else
                  job.source_jobtype  = 'Part Time';
            job.temp = "Feb-2020";
  
            jobs.push(job);
          }
          cont += 50;
        },
        error: function (error) {
          msg(error);
        }
      });
    } while (json.length > 0);  // 6) condicion de parada
  
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
  /* DESCRIPTION TWO OPTIONS */
  
  (function() {
    var out = {};
    var job = {};
    
    var selector = "div.col-md-18";
   
    var full_html = $(selector);
    
      
      //---------INFO-------------------------------------
  
      var html_2 = $(selector).text(); 
  
      // job.location           = $("").text().trim();
         job.source_jobtype     = $("span#JobFullTime").text().trim();
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
  
     //full_html.find("p:contains(Our Company is an equal employment opportunity employer)").remove().end().html();
     //full_html.find("p:contains(When you apply for this job)").remove().end().html();
     //full_html.find("p:contains()").remove().end().html();
     //full_html.find("p:contains()").remove().end().html();
    
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
  
   //----------------------------------------------------- 
    
  
    var full_html_text = full_html.text();
  
    if(full_html_text.length < 200){
  
        job.flag_active =  0;
        job.html        = "";
        job.jobdesc     = "";
  
  
    }else{
  
    var full_html = full_html.html();
  
     job.html = full_html.trim();
   
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
  
    job.html = job.html.split("If you are interested in")[0];
    job.html = job.html.split("Qualifications")[0];
   
    //job.html = job.html.split("")[0];
  
  
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
  
  //CLEAN EMOJIS
  //  job.html = full_html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  
    job.html    = cleanHTML(job.html);
    job.jobdesc = job.html;
  
  
  }
    
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
  
  /************ */
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