
// JSON POST - brassring ATS 
(function () {
    var jobs = [];
    var out = {};
    var cont = 1;
    var json;
    //var ToKen;
  // Required values to take from JSON POST - Otherwise redirects to another JSON not corresponding to the current jobsite 
  
  var partnerID = "25898";
  var siteID    = "5283";
  //var encryptedSessionVALUE = "^vbh5Rl/x8fdGJabV93zpAWCG7pP2fFeLYSZ1MFbB4NG1OMhveXPyril9kC8oVuFHVk9ughKAHI96GEpE/QQIFmoN0r_slp_rhc_aV6NrP4rXKIKSLs8=";
  
  // partnerid=25898&siteid=5283&PageType=searchResults
 
  // url variables
  var main_dom     = window.location.origin;
  var company_name = window.location.pathname.split("/")[1];
  var JSON_path    = "/Search/Ajax/ProcessSortAndShowMoreJobs"
  
 
  do {

    var data = {"partnerId": partnerID,
                "siteId": siteID,
                "keyword":"","location":"",
                "keywordCustomSolrFields":"JobTitle,FORMTEXT4,FORMTEXT6,FORMTEXT7",
                "locationCustomSolrFields":"FORMTEXT5,FORMTEXT6",
                "linkId":"0","Latitude":0,"Longitude":0,
                "facetfilterfields":{"Facet":[]},
                "powersearchoptions":{"PowerSearchOption":[{"VerityZone":"AutoReq","Type":"text","Value":null},
                                                           {"VerityZone":"JobTitle","Type":"text","Value":null},
                                                           {"VerityZone":"FORMTEXT6","Type":"single-select","OptionCodes":[]},
                                                           {"VerityZone":"FORMTEXT7","Type":"single-select","OptionCodes":[]},
                                                           {"VerityZone":"FORMTEXT4","Type":"radio","OptionCodes":[]},
                                                           {"VerityZone":"FORMTEXT3","Type":"radio","OptionCodes":[]},
                                                           {"VerityZone":"Location","Type":"select","OptionCodes":[]},
                                                           {"VerityZone":"LastUpdated","Type":"date","Value":null}]},
                											"SortType":"score","pageNumber": cont //,
                //"encryptedSessionValue": encryptedSessionVALUE
            };

        $.ajax({
            url: main_dom + "/" + company_name + JSON_path,          // 1) url
            headers: {                                                      
                "Accept": "application/json, text/plain, */*",
                "Content-Type":"application/json;charset=UTF-8"                // 2) headers
            },
            type: 'POST',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            //data: data,
            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.Jobs.Job; 
                //ToKen = result.;                               // 5) ruta de los trabajos
				//msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = ""; 


                    job.title    = json[i].Questions[7].Value;
                    job.url      = dom + json[i].Link;
                    job.location = json[i].Questions[10].Value.replace(/\(.*?\)/g, '').trim();
                 
                  
                  	job.title = job.title.split("$").shift().trim();
                  
               
                  
                        //split on city 2
                      if(job.location.indexOf(",")>-1){

                      let city = job.location.split(",")[0].trim();
                        var preClean = job.title.split(city).shift().trim();

                        if(preClean.length > 10){

                              job.title = job.title.split(city).shift().trim();
                                let lastChar = job.title.substr(job.title.length -1);
                                  if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                                    job.title = job.title.slice(0,-1);}
                              }else{

                                job.title = job.title.replace(city,"").trim();
                              }

                    } 
                  

                      job.title = job.title.replace(/part time/i,"").trim();
                      job.title = job.title.replace(/part-time/i,"").trim();
                      job.title = job.title.replace(/full time/i,"").trim();
                      job.title = job.title.replace(/full-time/i,"").trim();
                      job.title = job.title.replace("()","").trim();
                  
                      job.title = job.title.trim();
                    let lastCharTitle = job.title.substr(job.title.length -1);
                     if(lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "(" ){job.title = job.title.slice(0,-1).trim();}
                  
                  
                    var datePosted     = json[i].Questions[6].Value;
      				job.dateposted_raw = getDateFormat(datePosted,"-",0,1,2);

                   

                    job.temp = 1;

                    jobs.push(job);
                }
                cont++;
            },
            error: function (error) {
                msg(error);
            }
        });
     } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();


 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml =   text + " " + newHtml;
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
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition], 
            month =  dateRaw.split(cut)[monthPosition], 
            year  = dateRaw.split(cut)[yearPosition];

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

  // Jobdata 

  
(function() {
var out = {};
var job = {};

  var selector  = 'div.jobDetailsLiner.mainDetails';

// -------------------------- INFO ------------------------------------//
  
  //job.location       = document.querySelector('').textContent.trim();
  //job.source_jobtype = document.querySelector('').textContent.trim();
  
  //let datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
 //---------------------------------------------------------------------//

var full_html = document.querySelector(selector); 
var full_html_text = full_html.innerText;
  
    
      for (const a of document.querySelectorAll('p.question')) {
        if (a.textContent.indexOf('Employee Group')>-1){
          job.source_empname = a.nextElementSibling.textContent.trim();
              } 
      }
  
  
      for (const a of document.querySelectorAll('p.question')) {
        if (a.textContent.indexOf('City')>-1){
     
          
                    //Location array "city, state, country"

          var city    = a.nextElementSibling.textContent.trim();
          var state   = document.querySelector("p.position3InJobDetails").innerText.trim();
          var country = document.querySelectorAll("p.position3InJobDetails")[2].innerText.trim();
         
          var loc = "";
          var array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(country) array_loc.push(country);
       

          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;

         } 
      }
 

// To Remove selectors 
for (const a of full_html.querySelectorAll('a, h1, div.jobDetailsFooter, div[aria-label="Next Job"],img, script, style, button')) {
    if (a){
      a.remove();
    }
}
  
      for (const a of document.querySelectorAll('p.question')) {
        if (a.textContent.search(/City|Employee Group|Auto req ID|No\. of Positions|Auto req ID/i)>-1){
            a.nextElementSibling.remove();
      a.remove();
         } 
      }
 
    
 
  

 


if(cleanHTML(full_html_text).trim().length < 200){

  job.flag_active =  0;
  job.html        = "";
  job.jobdesc     = "";

}else{
   
   job.html = full_html.innerHTML.trim();

  job.html = removeTextBefore(job.html, "Job Description (Posting).", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

job.html    = cleanHTML(job.html.trim());
job.jobdesc = job.html;
}

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

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
dateRaw = dateRaw.replace(/\,/g,"").trim();
let day   =  dateRaw.split(cut)[dayPosition],
    month =  dateRaw.split(cut)[monthPosition],
    year  = dateRaw.split(cut)[yearPosition];

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
