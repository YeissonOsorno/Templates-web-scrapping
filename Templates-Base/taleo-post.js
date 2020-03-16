/*Expected jobs*/
(function () {
  var jobs = [];
  var out = {};
  var json; 
  var data = {"multilineEnabled":false,"sortingSelection":{"sortBySelectionParam":"3","ascendingSortingOrder":"false"},"fieldData":{"fields":{"KEYWORD":"","LOCATION":""},"valid":true},"filterSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]}]},"advancedSearchFiltersSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION",
    "selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]},
    {"id":"JOB_NUMBER","selectedValues":[]},{"id":"URGENT_JOB",
                                             "selectedValues":[]},
                                             {"id":"EMPLOYEE_STATUS",
                                              "selectedValues":[]},
                                              {"id":"WILL_TRAVEL","selectedValues":[]},
                                              {"id":"JOB_SHIFT","selectedValues":[]}]},"pageNo":1}

  $.ajax({
    url: 'https://lifepoint.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=101430233',                                            // 1) url
    headers: {                                                      
     // "accept": "application/json, text/javascript, */*; q=0.01",
      "Content-Type":"application/json",
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "es-419,es;q=0.9,en;q=0.8",
      "Connection": "keep-alive",
      "Content-Length": "744",
      "Content-Type":" application/json",
      "Cookie": "locale=en; __atuvc=2%7C11; __atuvs=5e6a8a9bcf3029dd001",
      "Host":"lifepoint.taleo.net",
      "Origin": "https://lifepoint.taleo.net",
      "Referer": "https://lifepoint.taleo.net/careersection/.lp_corp_external/jobsearch.ftl?lang=en",
      "Sec-Fetch-Dest":" empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "tz": "GMT-05:00",
      "tzname": "America/Bogota",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest"
    },
    type: 'POST',                                        // 3) tipo
    dataType: "json",                                   // 4) data que retorna
    //data: data,
    data: JSON.stringify(data),
    async: false,
    success: function (result) {
      msg("\x1b[32m loading jobs...");
      json = result.pagingData.totalCount;                                 // 5) ruta de los trabajos
      out["expected_jobs"] = json;
      
    },
    error: function (error) {
      msg(error);
    }
  });


  out["jobs"] = jobs;
  return out;
})();

/*Extract*/


(function () {
  var jobs = [];
  var out = {};
  var count = 1;
  var follow = true
  var json;
  do {
  var data = {"multilineEnabled":false,"sortingSelection":{"sortBySelectionParam":"3","ascendingSortingOrder":"false"},"fieldData":{"fields":{"KEYWORD":"","LOCATION":""},"valid":true},"filterSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]}]},"advancedSearchFiltersSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION",
    "selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]},
    {"id":"JOB_NUMBER","selectedValues":[]},{"id":"URGENT_JOB",
                                             "selectedValues":[]},
                                             {"id":"EMPLOYEE_STATUS",
                                              "selectedValues":[]},
                                              {"id":"WILL_TRAVEL","selectedValues":[]},
                                              {"id":"JOB_SHIFT","selectedValues":[]}]},"pageNo":count}

  $.ajax({
    url: 'https://lifepoint.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=101430233',                                            // 1) url
    headers: {                                                      
     // "accept": "application/json, text/javascript, */*; q=0.01",
      "Content-Type":"application/json",
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "es-419,es;q=0.9,en;q=0.8",
      "Connection": "keep-alive",
      "Content-Length": "744",
      "Content-Type":" application/json",
      "Cookie": "locale=en; __atuvc=2%7C11; __atuvs=5e6a8a9bcf3029dd001",
      "Host":"lifepoint.taleo.net",
      "Origin": "https://lifepoint.taleo.net",
      "Referer": "https://lifepoint.taleo.net/careersection/.lp_corp_external/jobsearch.ftl?lang=en",
      "Sec-Fetch-Dest":" empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "tz": "GMT-05:00",
      "tzname": "America/Bogota",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest"
    },
    type: 'POST',                                        // 3) tipo
    dataType: "json",                                   // 4) data que retorna
    //data: data,
    data: JSON.stringify(data),
    async: false,
    success: function (result) {
      msg("\x1b[32m loading jobs...");
      json = result.requisitionList;                                 // 5) ruta de los trabajos
      //msg(json.length);
      var stop = json.length;
      
      if(stop < 3) follow = false;
      for (var i = 0; i < json.length; i++) {
        var job = {};
        job.title = json[i].column[0];          
        job.location = json[i].column[1].replace('"]','').replace('["','');
        job.url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?job='+json[i].jobId;
        job.url = job.url.replace('jobsearch.ftl','jobdetail.ftl')
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
       count++;
    },
    error: function (error) {
      msg(error);
    }
  });
  } while (follow == true);                                 // 6) condicion de parada


  out["jobs"] = jobs;
  return out;
})();








