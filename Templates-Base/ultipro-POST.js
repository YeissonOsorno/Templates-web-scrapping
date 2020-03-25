/*
* Ultipro type POST without Pagination
*/
/*Infinite Pagination for wait selector of expected jobs*/
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

  var expected_jobs_str = document.querySelector(selector).textContent.trim().split('de').pop().trim()
    var expected_jobs = regex.exec(expected_jobs_str)[0];
  
    out["expected_jobs"] = expected_jobs;

    return out;
})();


/*Extract*/

(function () {
  var jobs = [];
  var out = {};
  // var cont = 1;
  var json;
  // do {
  var data = {"opportunitySearch":{"Top":50,"Skip":0,"QueryString":"","OrderBy":[{"Value":"postedDateDesc","PropertyName":"PostedDate","Ascending":false}],"Filters":[{"t":"TermsSearchFilterDto","fieldName":4,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":5,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":6,"extra":null,"values":[]}]},"matchCriteria":{"PreferredJobs":[],"Educations":[],
"LicenseAndCertifications":[],"Skills":[],
"hasNoLicenses":false,"SkippedSkills":[]}}

  $.ajax({
    url: 'https://recruiting.ultipro.com/HAS1002/JobBoard/32d55e49-a2ef-0d9d-ec75-ee5caf4de741/JobBoardView/LoadSearchResults',                                            // 1) url
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
      //msg(json.length);
      for (var i = 0; i < json.length; i++) {
        var job = {};
         job.title = json[i].Title;
        var domain = 'https://recruiting.ultipro.com/AKE1000ASEPA/JobBoard/b855fc7e-c6e0-90cc-b829-ddbebeb6f274/OpportunityDetail?opportunityId=';
        job.url = domain +json[i].Id;        
        job.location = json[i].Locations[0].Address.City +', ' + json[i].Locations[0].Address.State.Code +', ' + json[i].Locations[0].Address.Country.Code ;
        job.dateposted_raw = json[i].PostedDate.split('T').shift().trim().split('-').reverse().join('/');
        var jobtype  = json[i].FullTime;
        if(jobtype == true)  job.source_jobtype  = 'Full Time';
        //job.logo = json[i].;
        //job.source_apply_email = json[i].;
        //job.source_empname = json[i].;
        //job.source_jobtype = json[i].;
        //job.source_salary = json[i].;
        //job.dateposted_raw = json[i].;
        //job.dateclosed_raw = json[i].;
        /*  var fecha = json[i].
                                fecha = fecha.split(" ")[0].split("-");
                                job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
        job.temp = 1;
        jobs.push(job);
      }
      // cont++;
    },
    error: function (error) {
      msg(error);
    }
  });
  //  } while (json.length > 0);                                 // 6) condicion de parada


  out["jobs"] = jobs;
  return out;
})();

/* Job Description*/
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
