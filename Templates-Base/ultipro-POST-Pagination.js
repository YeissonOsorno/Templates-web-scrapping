/*Infinite for wait selectro of expected jobs*/
(function() {
	var out = {};
  var selector = 'span[data-automation="opportunities-count"]';
  	out.waitFor = selector
    return out;
})();

/*Expected jobs*/
(function() {
	var out = {};
    var selector = 'span[data-automation="opportunities-count"]';
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.trim()
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/*Extract with Pagination*/
(function () {
    var jobs = [];
    var out  = {};
    var cont = 0;
    var json;
 

  
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
                //ToKen = result.;                                      // 5) ruta de los trabajos
        //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                  var dom = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "OpportunityDetail?opportunityId=";
                  
                    job.title    = json[i].Title;
                    job.url      = dom + json[i].Id;
                  
                  job.title = job.title.split("-").shift().trim();
                  job.title = job.title.split("–").shift().trim();
              
                     //Location array "city, state, country"

                      var city    = json[i].Locations[0].Address.City;
                      var state   = json[i].Locations[0].Address.State.Name;
                      var country = json[i].Locations[0].Address.Country.Name;

                      var loc = "";
                      var array_loc = Array();

                      if(city) array_loc.push(city);
                      if(state) array_loc.push(state);
                      if(country) array_loc.push(country);


                      if(array_loc.length) loc = array_loc.join(", ");

                    job.location = loc;
                  
                    
                    /*----------DATE-POSTED-----------------------------*/

                    var datum = json[i].PostedDate; // 2019-10-07T22:50:45.562Z
                      datum = datum.split("T").shift().trim();
                  
                        var cut = "-";
              
                        var day   =  datum.split(cut)[2];
                        var month =  datum.split(cut)[1];
                        var year  =  datum.split(cut)[0];



                    job.dateposted_raw  = month +"/"+  day +"/"+ year;
                  
                   /*-------------------------------------------------*/

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

(function () {
  var jobs = [];
  var out = {};
  var count = 0;
  var follow = true;
  var json;
  do {
     var data = {"opportunitySearch":{"Top":50,"Skip": count,"QueryString":"","OrderBy":[{"Value":"postedDateDesc","PropertyName":"PostedDate","Ascending":false}],"Filters":[{"t":"TermsSearchFilterDto","fieldName":4,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":5,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":6,"extra":null,"values":[]}]},"matchCriteria":{"PreferredJobs":[],"Educations":[],"LicenseAndCertifications":[],"Skills":[],"hasNoLicenses":false,"SkippedSkills":[]}};


    $.ajax({
      url: 'https://recruiting.ultipro.com/ARH1000ARH/JobBoard/e5051b40-e91f-fa81-f0bf-ed2e9361f690/JobBoardView/LoadSearchResults',                                            // 1) url
      headers: {                                                      
        "accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type":"application/json; charset=utf-8"    // 2) headers
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      //data: data,
      data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("\x1b[32m loading jobs...");
        json = result.opportunities;                                 // 5) ruta de los trabajos
        var stop = json.length;
        if(stop< 1) follow = false
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].Title;
          var domain = 'https://recruiting.ultipro.com/ARH1000ARH/JobBoard/e5051b40-e91f-fa81-f0bf-ed2e9361f690/OpportunityDetail?opportunityId=';
          job.url = domain +json[i].Id;        
          job.location = json[i].Locations[0].Address.City +', ' + json[i].Locations[0].Address.State.Code +', ' + json[i].Locations[0].Address.Country.Code ;
          job.dateposted_raw = json[i].PostedDate.split('T').shift().trim().split('-').reverse().join('/');
          var jobtype  = json[i].FullTime;
          if(jobtype == true) 
          {
            job.source_jobtype  = 'Full Time';
          }else{
            job.source_jobtype  = 'Full Time';
          }
          
          job.temp = 1;
          jobs.push(job);
        }
        count+=50;
      },
      error: function (error) {
        msg(error);
      }
    });
  } while (follow);                                 // 6) condicion de parada


  out["jobs"] = jobs;
  return out;
})();



/*Job Description */ 
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
