
 (function () {
    var jobs = [];
    var out = {};
    // var cont = 1;
    var json;
    // do {


    var data = {"key":"da029c0c4481e4aad5b5b7e25498519f2e801f23","channel":0,"locale":"de","sort":{"by":"createdOn","order":"desc"},"page":{"offset":0,"num":1000},"filter":{}};


    $.ajax({
      url: 'https://jobs.b-ite.com/api/v1/postings/search',                                            // 1) url
      headers: {                                                      
        "accept": "*/*",
        "Content-Type":"application/json;charset=UTF-8"    // 2) headers
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      //data: data,
      data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("\x1b[45m loading jobs...");
        json = result.jobPostings;                                 // 5) ruta de los trabajos
        //msg(json.length);
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].title;
          job.title = job.title.split(": ").pop().split("|").shift();
          job.location = json[i].jobSite;
          job.url = json[i].url;
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






