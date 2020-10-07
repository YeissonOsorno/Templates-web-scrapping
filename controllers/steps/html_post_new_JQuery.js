(function () {
    var jobs = [];
    var out = {};
    // var cont = 1;
    var json;
    // do {
    var data = '';

    $.ajax({
        url: '',                                           
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
     
        },
        type: 'POST',                                       
        dataType: "html",                                  
        data: data,
        //data: JSON.stringify(data),
        async: false,
        success: function (result) {
            msg("\x1b[43m loading jobs... ");
            //  var jobs = [];
            var jobsSelector = 'li.jobs-list-item'';                      

            $(jobsSelector).each(function (index) {
                var job = {};
              
              var dom = "";
              
                        job.title    = $(this).find("div.job-title").text().trim();
                        job.url      = dom + $(this).find('a[ph-tevent="job_click"]').attr("href");
                        job.location = $(this).find("span.job-location").text().trim();

             
                job.temp = 1;
              
                if (job.location.indexOf("###!!!") > -1) {
                    var locs = job.location;
                    locs = locs.split('|');
                    for (l in locs) {
                        var jobx = {};
                      

                        jobx.title    = job.title; 
                        jobx.url      = job.url;
                        jobx.location = job.location;

                        jobx.temp = job.temp;
                        if (jobx.location.length > 0) {
                            jobs.push(jobx);
                        }
                    }
                } else {
                    job.location = job.location;

                    jobs.push(job);
                }   // cont++;
            }
            )
        },
        error: function (error) {
            msg(error);
        }
    });
    //  } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();
