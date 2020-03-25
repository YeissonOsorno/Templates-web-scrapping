/*Infinite Pagination for expected jobs*/
(function() {
var out = {};
var selector = 'span[class="currentCount"]';
	out.waitFor = selector
  return out;
})();

/*Expected Jobs*/
(function () {
var jobs = [];
var out = {};
var json;
var data = {"filters":[{"name":"state","label":"State"},{"name":"city","label":"City"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Position Type"},{"name":"locationZip","label":"Zip Code"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"grp","label":"Functional Group"},
  {"name":"typeOfFulltime","label":"Position Type"},
  {"name":"altPostingLocationCodes","label":"Alternate Posting Locations"}]},
            "pagefilter":{"page":1},"rl":"enUS"}
$.ajax({
  url: 'https://recruiting.adp.com/srccar/public/rest/1/59201/search/',                                            // 1) url
  headers: {                                                      
    "accept": "application/json, text/plain, */*",
    "Content-Type":"application/json;charset=UTF-8"    
  },
  type: 'POST',                                        
  dataType: "json",                                  
  //data: data,
  data: JSON.stringify(data),
  async: false,
  success: function (result) {
     msg("\x1b[32m loading Expected Jobs...");
    json = result.totalCount; 
    out["expected_jobs"] = json;


  },
  error: function (error) {
    msg(error);
  }
});   
return out;
})();
/*Extract*/
(function () {
  var jobs = [];
  var out = {};
  var count = 1;
  var json;
	var follow = true
  do {
  var data = {"filters":[{"name":"state","label":"State"},{"name":"city","label":"City"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Position Type"},{"name":"locationZip","label":"Zip Code"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"grp","label":"Functional Group"},
  {"name":"typeOfFulltime","label":"Position Type"},
  {"name":"altPostingLocationCodes","label":"Alternate Posting Locations"}]},
              "pagefilter":{"page":count},"rl":"enUS"}

  $.ajax({
    url: 'https://recruiting.adp.com/srccar/public/rest/1/59201/search/',                                            // 1) url
    headers: {                                                      
      "accept": "application/json, text/plain, */*",
      "Content-Type":"application/json;charset=UTF-8"    // 2) headers
    },
    type: 'POST',                                        // 3) tipo
    dataType: "json",                                   // 4) data que retorna
    //data: data,
    data: JSON.stringify(data),
    async: false,
    success: function (result) {
      msg("\x1b[45m loading jobs...");
      json = result.jobs;                                 // 5) ruta de los trabajos
      var stop = json.length;
      if(stop < 1) follow = false
      for (var i = 0; i < json.length; i++) {
        var job = {};
        job.title = json[i].ptitle.replace(/[0-9]/g,'');          
        job.location = json[i].city + ', ' + json[i].state;
        job.url = json[i].url;
        job.source_jobtype = json[i].typeOfFulltime.split('-').shift().trim();
        //job.logo = json[i].;
        //job.source_apply_email = json[i].;
        //job.source_empname = json[i].;
        //job.source_salary = json[i].;
        //job.dateposted_raw = json[i].;
        //job.dateclosed_raw = json[i].;
        /*  var fecha = json[i].
                              fecha = fecha.split(" ")[0].split("-");
                              job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
        job.temp = 1;
        jobs.push(job);
      }
      count++;
    },
    error: function (error) {
      msg(error);
    }
  });
 } while (follow);                                 // 6) condicion de parada


  out["jobs"] = jobs;
  return out;
})();

/*Job Description*/
(function() {
  var out = {};
  var job = {};
  
  var jobid = pass_it["job"].url.split("&r=").pop();
  var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/59201/job/" + jobid + "?rl=enUS";
  //msg(endpoint);

  $.ajax({
          url: endpoint,
          headers: {
              "Content-Type": "application/json;charset=UTF-8"
          },
          type: 'GET',
          async: false,
          success: function (result) {
              var full_html = "";
                            
              for (var i = 0; i < result.fields.length; i++) {
                  // Ignorar las dos primeras posiciones porque son como basura...
                  if (result.fields[i].label == 'Job Description' || result.fields[i].label == 'Requirements') {                     
                      full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
                      full_html += "<br/>";
                  }
                  if (result.fields[i].label == 'Position Type')                      
                      job.source_empname = result.fields[i].content;
              }
              
              job.html        = full_html;

              job.html        = cleanHTML(job.html);
              var tmp         = document.createElement("DIV");
              tmp.innerHTML   = job.html;
              job.jobdesc     = tmp.textContent.trim();
            
          },
          error: function (error) {
              msg(error);
          }
      });

  out["job"] = job;
  return out;
})();
