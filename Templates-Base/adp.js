/****** EXTRACT******/
(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
        var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State"},{"name":"grp","label":"Area of Interest"},{"name":"gridControl","label":"Company"},{"name":"zzreqlevelofexperience","label":"Level of Experience"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"zzreqlevelofexperience","label":"Level of Experience"},
        		   {"name":"typeOfFulltime","label":"Full-time"},{"name":"grp","label":"Area of Interest"}]},"pagefilter":{"page":counter},"rl":"enUS"};
        $.ajax({
            url : 'https://recruiting.adp.com/srccar/public/rest/1/123507/search/',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            type : 'POST',
            data : JSON.stringify(data),
            dataType: "json",
            async : false,
            success : function(result){
                json = result.jobs;
                limit = result.pages +1;
                for(var i = 0; i<json.length; i++) {
                    var job = {};
                    job.title = json[i].ptitle;
                    job.url = json[i].url;
                    job.location = json[i].city + ", " + json[i].state;
                    //job.logo = elem.querySelector("").getAttribute("src").trim();
                    //job.source_apply_email = elem.querySelector("").textContent.trim();
                    //job.source_empname = elem.querySelector("").textContent.trim();
                    job.source_jobtype =json[i].typeOfFulltime;
                    //job.source_salary = elem.querySelector("").textContent.trim();
                    //job.temp = 1;
                    jobs.push(job);
                }
                counter = counter + 1;
            },
            error: function(error){
                msg(error);
            }
        });
    } while (counter < limit);

    out["jobs"]= jobs;
    return out;
})();
/**********JOBDATA********/
(function() {
    var out = {};
    var job = {};
    
    var jobid = pass_it["job"].url.split("&r=").pop();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/123507/job/" + jobid + "?rl=enUS";
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
