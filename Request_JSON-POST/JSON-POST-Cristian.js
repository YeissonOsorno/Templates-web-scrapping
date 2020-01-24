(function() {
    var jobs = [];
    var out = {};
    var counter = 1; // el contador varia segun el json
    var limit = 0; //   esta variable se utilizará para asignar la cantidad de paginas
    //var seguir = true;
    var json;
    do {
        //msg("Ejecutando extraccion");
          var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"City"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Full-Time/Part-Time"},{"name":"gridControl2","label":"Business Line"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"postingLocationCode","label":"Posting Location"},{"name":"grp","label":"Functional Group"}]},"pagefilter":{"page":counter},"rl":"enUS"};
      //var data = {"filters":[{"name":"country","label":"Country"},{"name":"state","label":"State/Province"},{"name":"city","label":"City"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Full-Time/Part-Time"},{"name":"gridControl2","label":"Business Line"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"postingLocationCode","label":"Posting Location"},{"name":"grp","label":"Functional Group"}]},"pagefilter":{"page":counter},"rl":"enUS"};
        $.ajax({
            url : 'https://recruiting.adp.com/srccar/public/rest/1/82301/search/',                         
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            
           },
            type : 'POST',
            data : JSON.stringify(data),
            dataType: "json",
            async : false,
            success : function(result){
                json = result.jobs; //result.ubicacion jobs
                // var stop = result.jobs;
               /* if (stop.length < 1){
                  seguir = false;
                }*/
                    limit = result.pages + 1; // se le asigna la ruta de paginas "pages" se encuentras total paginas del json
                for(var i = 0; i<json.length; i++) {
                    var job = {};
                    job.title = json[i].ptitle;
                    job.url = json[i].url;
                    //job.location = json[i].city + ", " + json[i].state ;
                    //job.logo = elem.querySelector("").getAttribute("src").trim();
                    //job.source_apply_email = elem.querySelector("").textContent.trim();
                    //job.source_empname = elem.querySelector("").textContent.trim();
                    //job.source_jobtype = elem.querySelector("").textContent.trim();
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
     msg(counter);
     msg(limit); 
    } while (counter < limit);  
    //} while (seguir == true);

 

    out["jobs"]= jobs;
    return out;
})();