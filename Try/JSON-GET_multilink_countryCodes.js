/*
*Descripción :  JSON GET con multilink + country codes
*Autor : Miguel Angel Montoya
*/

/*Infinite pagination */
(function () {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    
    if (!pass_it["urls"]) {
      out["pass_it"] = {        
        "jobs": 0,
        "cont": 0,
        // Arreglo de URLs
        "urls": [],
        "click" : 1,
        "json_jobs": 0,
        "currentUrl": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    
    
	//Extraemos los country codes
    var country_code = document.querySelectorAll("div.country-name");

    for(var x in country_code){
      if(typeof country_code[x] =="function") continue;
      if(typeof country_code[x] =="number") continue;
      var job = {};
      var elem = country_code[x];

      var code = elem.getAttribute("data-item-country-id").trim();

      out["pass_it"].urls.push(code);

    } 

    msg(out["pass_it"].urls);


    out["wait"] = true;
    return out;
  })();

  /*Before Extract */
  (function() {
    var out = {};  
    out["pass_it"] = pass_it;

    document.querySelector("div#country-value ul.list-unstyled > li:nth-child(" + out["pass_it"].click + ")").click();
    out.waitFor = "div.result.resultSolidHover";

    //Ghacemos retardos para obtener la cantidad total de jobs 
    out.pic = true;
    out.html = true;
    out.wait = true;
    return out;
  })();

  /*Extract*/
  (function () {
    var jobs = [];
    var out = {};
    var count = 0;
    var json;
    var follow = true;
    out["pass_it"] = pass_it;
    
    //cantidad de jobs por pagina
    var total_jobs = document.querySelector("div#result-count-message").textContent.trim().replace("results","");
    parseInt(total_jobs);
    
    //Mensaje de verificación
    msg("====>" + out["pass_it"]["click"]);
    msg("===>" + total_jobs);
    
    do {
      msg("===>" + out["pass_it"].urls[out["pass_it"]["currentUrl"]]);
     //var data {}

      $.ajax({
        url: 'https://careers.concentrix.com/ajax/job-search.php?country_code='+ out["pass_it"].urls[out["pass_it"]["currentUrl"]] +'&state_id=&city_id=&keyword=&loaded=' + out["pass_it"]["cont"]  + '&zipcode=',                                            // 1) url
        headers: {                                                      
          "accept": "*/*",
          "Content-Type":"text/html; charset=UTF-8"    
        },
        type: 'GET',                                        
        dataType: "json",                                   
        //data: data,
        //data: JSON.stringify(data),
        async: false,
        success: function (result) {
          msg("\x1b[32m loading jobs...");
          json = result;                                 
          var stop = json.lenght;

          if(total_jobs == out["pass_it"]["json_jobs"] ){ follow = false}
          for (var i = 0; i < json.length; i++) {
            var job = {};
            job.title = json[i].title;        
            job.location = json[i].subtitle;
            job.url = 'https://careers.concentrix.com'+json[i].link;
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;
            //job.source_jobtype = json[i].;
            //job.source_salary = json[i].;
            //job.dateposted_raw = json[i].;
            //job.dateclosed_raw = json[i].;

            job.temp = 1;
            
            if(job.title){
              jobs.push(job);
              //cantidad total de jobs
              out["pass_it"]["json_jobs"] = jobs.length
            }
          }
          out["pass_it"]["cont"]+=30;
        },
        error: function (error) {
          msg(error);
        }
      });
    } while (follow==true);                                 


    out["jobs"] = jobs;
    return out;
  })();

  /*Pagination*/
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    
    out["pass_it"]["currentUrl"] += 1;
    out["pass_it"]["click"] += 1; // contador para dar click a la siguiente opción
   
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
      //var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
      // window.location.href = url;
      out["pass_it"]["cont"] = 0;
      out["pass_it"]["json_jobs"] = 0;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    out["wait"] = true;
    return out;
  })();
