

/*

Ultipro multi-location 
Jobsite: https://recruiting.ultipro.com/SOU1031SOUCB/JobBoard/208ddef8-7478-4f53-8418-831215cfd860/?q=&o=postedDateDesc&w=&wc=&we=&wpst=


*/

// Extract 

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

                  var dom = window.location.origin + window.location.pathname + "OpportunityDetail?opportunityId=";
                  
                  var reqid = json[i].RequisitionNumber;
                  
                  
                    job.title = json[i].Title;
                    job.url   = dom + json[i].Id;
                  	job.temp  = "2020";
                  
                    job.title = job.title.split(reqid).shift();
                    job.title = job.title.split(/Remote/i).shift();
                    job.title = job.title.replace(/\{.*?\}/g, '').trim();
                  
                      job.title = job.title.trim();
                      let lastCharTitle = job.title.substr(job.title.length -1);
                       if(lastCharTitle === "-"){job.title = job.title.slice(0,-1).trim();}
                      job.title = job.title.trim();
                      let lastCharTitle2 = job.title.substr(job.title.length -1);
                       if(lastCharTitle2 === "-"){job.title = job.title.slice(0,-1).trim();}
                  
                          if(job.title.indexOf("-")>-1){

                          let deleteFromJobTitle = job.title.split("-").pop().trim();
                          if(deleteFromJobTitle.search(/NC|SC|VA|GA|FL|Charlotte|South/g,"")>-1){
                            job.title = job.title.replace(deleteFromJobTitle,"").trim();
                              let lastChar = job.title.substr(job.title.length -1);
                                if(lastChar === "-"){job.title = job.title.slice(0,-1);}
                                }
                          }
          
                    
                  
           	     /*----------DATE-POSTED----------------------------------*/
				    var datum = json[i].PostedDate;
                        datum = datum.split("T").shift().trim();
                        
                    job.dateposted_raw = getDateFormat(datum,"-",2,1,0);
				 /*------------------------------------------------------*/
               
                    if(json[i].Locations){
                      
                          var locs = json[i].Locations, w;
                              for(w in locs){
                                    if(typeof locs[w] =="function") continue;
                                    if(typeof locs[w] =="number") continue;

							    var jobw = {};

                                  jobw.title    = job.title;
                                  jobw.url      = job.url;
                                  jobw.temp     = job.temp;
                                  jobw.dateposted_raw = job.dateposted_raw;

                                   //Location array "city, state, country"

                                    var city    = locs[w].Address.City,
                                        state   = locs[w].Address.State.Name,
                                        country = locs[w].Address.Country.Name;

                                    var loc = "";
                                    var array_loc = Array();

                                    if(city && city.search(/Remote/i)==-1 & typeof city !== null) array_loc.push(city);
                                    if(state && typeof state !== null) array_loc.push(state);
                                    if(country && typeof country !== null) array_loc.push(country);

								    if(array_loc.length) loc = array_loc.join(", ");

                                    jobw.location = loc;
                                
                                      // Split on city 2
                                      if(jobw.location.indexOf(",")>-1){
                                         let city = jobw.location.split(",")[0].trim();
                                              var preClean = jobw.title.split(city).shift().trim();
                                               if(preClean.length > 10){
                                                   jobw.title = jobw.title.split(city).shift().trim();
                                                      let lastChar = jobw.title.substr(jobw.title.length -1);
                                                        if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                                                          jobw.title = jobw.title.slice(0,-1);}
                                                        }else{
                                                          jobw.title = jobw.title.replace(city,"").trim();
                                                          jobw.title = jobw.title.trim().replace(/^\-|\–/,"").trim();
                                                          }
                                      }   
                                

					              jobs.push(jobw);
                              }
                      }  
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

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

          if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr/i)>-1){month = "04";}
            if(month.search(/may/i)>-1){month = "05";}
            if(month.search(/jun/i)>-1){month = "06";}
            if(month.search(/jul/i)>-1){month = "07";}
            if(month.search(/aug/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
}