/*EXPECTED JOBS*/
(function () {
    var jobs = [];
    var out = {}; 
    var expected_jobs
    var data = {
      'partnerId': '25103',
      'siteId': '5019',
      'keyword':'',
      'location':'', 
      'keywordCustomSolrFields': 'FORMTEXT2,FORMTEXT6,AutoReq',
      'facetfilterfields':'' ,
      'turnOffHttps': 'false',
      'Latitude': '0',
      'Longitude': '0',
      'encryptedsessionvalue': '^sm1WVWgV70KUEPIYon//aHXScuttuUnVXYdrQREtzMvYYVCDXy6vjU6F1VFgUrVSyh3alHiCpmXyhZEi4MESV3TaHgqtoMlKwfs63JAoOIo=' 
    }
    $.ajax({
      url: 'https://sjobs.brassring.com/TgNewUI/Search/Ajax/MatchedJobs',                                            // 1) url
      headers: {                                                      
        "Accept": "*/*",
        "Content-Type":"application/json; charset=utf-8"    // 2) headers
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                  // 4) data que retorna
      //data: data,
      data: JSON.stringify(data),
      async: false,
      success: function (result) {     
        expected_jobs = result.JobsCount;        
        msg("=====> "+expected_jobs)
        out["expected_jobs"] = expected_jobs;
      },
      error: function (error) {
        msg(error);
      }
    });  
    return out;
  })();
  

  /*EXTRACT */
  (function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var json;
    var seguir =  true;
  
    do {
      var data = {"partnerId":"25103",
                  "siteId":"5019",
                  "keyword":"",
                  "location":"",
                  "keywordCustomSolrFields":"FORMTEXT2,FORMTEXT6,AutoReq",
                  "linkId":"",
                  "Latitude":0,
                  "Longitude":0,
                  "facetfilterfields":{"Facet":[]},
                  "powersearchoptions":{"PowerSearchOption":[]},
                  "SortType":"score",
                  "pageNumber":counter,
                  "encryptedSessionValue":"^sm1WVWgV70KUEPIYon//aHXScuttuUnVXYdrQREtzMvYYVCDXy6vjU6F1VFgUrVSyh3alHiCpmXyhZEi4MESV3TaHgqtoMlKwfs63JAoOIo="}
      $.ajax({
        url: 'https://sjobs.brassring.com/TgNewUI/Search/Ajax/ProcessSortAndShowMoreJobs',                                            // 1) url
        headers: {                                                      
          "Accept": "*/*",
          "Content-Type":"application/json; charset=utf-8"    // 2) headers
        },
        type: 'POST',                                        // 3) tipo
        dataType: "json",                                  // 4) data que retorna
        //data: data,
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
          msg("\x1b[32m SUCCES");
          json = result.Jobs.Job;  
          out["expected_jobs"] = result.JobsCount;
          msg("=====> "+result.JobsCount)
          
          //msg(json.length);
          var stop = json.length;
          if(stop < 1) seguir = false
          msg("======> "+stop)
          for (var i = 0; i < json.length; i++) {
            var job = {};
            job.title = json[i].Questions[10].Value;         
            //job.location = json[i].Questions[11].Value;
            job.location = 'Falls Church, VA';
            job.url = json[i].Link;
            if(json[i].Questions[6].Value){
                    job.dateposted_raw = json[i].Questions[6].Value;
            }
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;
            //job.source_jobtype = json[i].;
            //job.source_salary = json[i].;
  
            //job.dateclosed_raw = json[i].;
            /*  var fecha = json[i].
                          fecha = fecha.split(" ")[0].split("-");
                          job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
            job.temp = 'Feb-10-2020-1';
            jobs.push(job);
          }
         counter+=1;
        },
        error: function (error) {
          msg(error);
        }
      });
   } while (seguir);                                 // 6) condicion de parada
      
    out["jobs"] = jobs;
    return out;
  })();

