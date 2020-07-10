


// Nota: solo se debe colocar el enlace del JSON GET en el spider info hasta el número del cliente o "clientRequestID="
// con su número incluído

// ATS myworkdayjobs - Multi-location AJAX 

{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": true,
"waitForResources": false
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}


//Expected jobs

(function() {
  var out = {};
  
    var regex = /\d+/;
  
    if (typeof msg === 'undefined') msg = console.log;
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;

    var expected_jobs = regex.exec(expected_jobs_str)[0];
  
    out["expected_jobs"] = expected_jobs;

    return out;
})();

// Before extract-------------------------------------//

(function() {
var out = {};
out.waitFor = "pre";
out["wait"]= 1500;
return out;
})();


// Extract -----------------------------------------------------------------------------------------------------------//

(function() {
  var out = {};
   
  if(typeof pass_it == "undefined") pass_it = {};
 
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems; //json.body.children[1].children[0].listItems;

  var returnedJobs = [];  
  for(j in jobs) {
       var job = {};

      
    job.title = jobs[j].title.instances[0].text;
    job.url   = window.location.protocol + "//" + window.location.hostname + jobs[j].title.commandLink;

    job.temp = "2020";

    if (job.title.length > 1){

    var json_desc = JSON.parse(getDescription(job.url));
     var array = json_desc.body.children[1].children[0].children;
     

      for(var i in array){
        if(array[i].iconName == 'LOCATION'){
          var jobx = {};
          
          jobx.title    = job.title;
          jobx.url      = job.url; 
          jobx.location = array[i].imageLabel;
          
          job.temp      = "2020";
          
  
          //msg(jobx)
           if(jobx.title.indexOf('Open application') > -1) {jobx.title = '';}
           if(jobx.title.length > 0){

            returnedJobs.push(jobx);
        }
         // returnedJobs.push(jobx);
        }
        }
    }
      
  }
//    msg(jobs);
//    msg(returnedJobs.length);
  
    out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
    return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send(); 
  return response;
}


// Pagination -----------------------------------------------------------------------------------------------------------//



(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

    if (out["pass_it"]["jobs"] > 0) {
      
   
       var dom             = window.location.protocol + "//" + window.location.hostname; 
       var pagConstant     = window.location.pathname.split("be/").shift() + "be/"; 
       var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
      

      
       var url = dom + pagConstant  + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;


      
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();
// Job Description --------------------------------------------------------------------------------------------------------------------//

(function() {
  var out = {};
  var job = {};
  
  var selector = ".GWTCKEditor-Disabled:eq(1)";
 
  var full_html = $(selector);
  
    
    //---------INFO-------------------------------------

     var html_2 = $("#workdayApplicationFrame").text(); 
 
    
    if(html_2.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
    if(html_2.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}
    /*
    if(html_2.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){
    if(html_2.search(/CV|resume|cover letter|apply|curriculum/gi)>-1){
     job.source_apply_email = job.html_2.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0]; }
    */
  


    //job.location       = $("").text().trim();
    //job.source_jobtype = $("").text().trim();

    //job.source_empname = $("").text().trim();
    //job.logo           = $("").attr("src");

    //job.source_salary  = $("").text().trim();



      /*----------DATE-POSTED----------------------------
          
      var datum = $("").text().trim();
     
      var cut   = "";

      var day   =  datum.split(cut)[0];
      var month =  datum.split(cut)[1];
      var year  =  datum.split(cut)[2];
          
      job.dateposted_raw  = month +"/"+  day +"/"+ year;

      /*-------------------------------------------------*/

     
  
 //---------REMOVE---------------------------------------
    full_html.find("div[id^=labeledImage]").remove().end().html();
    full_html.find("li:has(button)").remove().end().html();
    full_html.find('a').remove().end().html();
    full_html.find('style, script').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
   
    full_html.find("h1").remove().end().html();

    full_html.find("footer").remove().end().html();
    full_html.find("li:has(svg)").remove().end().html();
    full_html.find("ul.WGYM.WIYM, .wd-player-media").remove().end().html();
    //
    

   // full_html.find("li:first").remove().end().html();
    //full_html.find("").remove().end().html();

    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();

 //----------------------------------------------------- 
  
  var full_html = full_html.html();
  
   job.html     = full_html.trim();
 
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];

  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  



  //CLEAN EMOJIS
  //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  

  job.html      = cleanHTML(job.html);
  job.jobdesc   = job.html;
  
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CODE #2 BU


(function() {
  var out = {};
  //  This gives you an HTMLElement object
  var element = document.querySelector("pre").textContent;
  //  This gives you a string in JSON syntax of the object above that you can 
  // send with XMLHttpRequest.
  var json = JSON.parse(element);
  var jobs = json.body.children[0].children[0].listItems;
  var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;

  //
  


  if(typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "total_jobs": json.total,
      "expected_jobs":expected_jobs_str,
      //"total_pages": json.meta.totalPages
    }
  } else {
    out["pass_it"] = pass_it;
  }

  //msg(out["pass_it"]["total_jobs"])
  //msg(out["pass_it"]["total_pages"])

  var returnedJobs = [];  
  for(i in jobs) {
    var job = {};/*init*/

    job.title = jobs[i].title.instances[0].text;
    
    job.title = job.title.split(" - ").shift().trim();
  
    if (typeof jobs[i].subtitles[1]!='undefined'){
              job.location = jobs[i].subtitles[1].instances[0].text.split("-").reverse().join(", ").replace("Virtual","").replace("VIRTUAL","").replace("Remote -","").split("(").shift();
    } else{
              job.location = 'USA';
            }
    
    job.location = TLCtoCountry(job.location);
    
    
    job.url =  "https://ncr.wd1.myworkdayjobs.com"+ jobs[i].title.commandLink;
    
    if(typeof jobs[i].subtitles[2]!='undefined')
       job.dateposted_raw = dateAgo(jobs[i].subtitles[2].instances[0].text.replace('+',''),' ',1,2); 
   
    
    job.temp = "MAY/2020";
    
    //job.dateposted_raw = jobs[i].postDate;
    //job.source_jobtype = jobs[i].workLevelCode.shortName;
    
    if(job.location.indexOf("More") > -1){
      var json = JSON.parse(getDescription(job.url));
      var array = json.body.children[1].children[0].children;
      for(var i in array){
       
        var jobx = {};  
        
        if(!job.source_jobtype){
        if (array[i].iconName == 'JOB_TYPE'){
          jobx.source_jobtype = array[i].imageLabel;
        }
        }  
        if(array[i].iconName == 'LOCATION'){         
          jobx.title = job.title;
          jobx.url = job.url; 
          jobx.location = array[i].imageLabel;
          jobx.location = jobx.location.replace("Virtual ","").replace("Virtual","").split("(").shift();
          
          jobx.location = TLCtoCountry(jobx.location);
          
          jobx.temp = job.temp;
         // jobx.html =job.html;
         // jobx.jobdesc =job.jobdesc; 
         // msg(jobx)
          returnedJobs.push(jobx);
        }
      }
    }
    else{
      returnedJobs.push(job);
    }
  

    
  }

  out["pass_it"]["jobs"] += returnedJobs.length;
  out["jobs"]= returnedJobs;
  return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send(); 
  return response;
}

/*Tomar Date Ago*/
function dateAgo (text, char_separator, value_DWMY, position_DWMY){  
  var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_DWMY]!=='undefined'){
  var dayWeekMonthYear = text.split(char_separator)[position_DWMY]
  }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
      if (dayWeekMonthYear.toUpperCase().indexOf('TODAY')>-1 || dayWeekMonthYear.toUpperCase().indexOf('HOUR')>-1){nDays = 0;}
      if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
      if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
      if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
      if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
      if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
      var dateJob    = date_Now.getDate() - nDays;//resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);        //obtengo la fecha de publicacion.
        //Obtengo dia mes y Año
        var dd    = datePosted.getDate();           //devuelve el numero del dia del mes.
      var mm    = datePosted.getMonth()+1;        //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
      var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
      if (dd < 10){dd ='0'+dd;}  
      if (mm<10){mm ='0'+ mm;}  
      dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}

function TLCtoCountry(loc){
loc = loc.replace("AFG","Afghanistan");
loc = loc.replace("ALA","Aland Islands");
loc = loc.replace("ALB","Albania");
loc = loc.replace("DZA","Algeria");
loc = loc.replace("ASM","American Samoa");
loc = loc.replace("AND","Andorra");
loc = loc.replace("AGO","Angola");
loc = loc.replace("AIA","Anguilla");
loc = loc.replace("ATA","Antarctica");
loc = loc.replace("ATG","Antigua and Barbuda");
loc = loc.replace("ARG","Argentina");
loc = loc.replace("ARM","Armenia");
loc = loc.replace("ABW","Aruba");
loc = loc.replace("AUS","Australia");
loc = loc.replace("AUT","Austria");
loc = loc.replace("AZE","Azerbaijan");
loc = loc.replace("BHS","Bahamas");
loc = loc.replace("BHR","Bahrain");
loc = loc.replace("BGD","Bangladesh");
loc = loc.replace("BRB","Barbados");
loc = loc.replace("BLR","Belarus");
loc = loc.replace(" BEL","Belgium");
loc = loc.replace("BLZ","Belize");
loc = loc.replace("BEN","Benin");
loc = loc.replace("BMU","Bermuda");
loc = loc.replace("BTN","Bhutan");
loc = loc.replace("BOL","Bolivia");
loc = loc.replace("BES","Bonaire, Saint Eustatius and Saba");
loc = loc.replace("BIH","Bosnia and Herzegovina");
loc = loc.replace("BWA","Botswana");
loc = loc.replace("BVT","Bouvet Island");
loc = loc.replace("BRA","Brazil");
loc = loc.replace("IOT","British Indian Ocean Territory");
loc = loc.replace("VGB","British Virgin Islands");
loc = loc.replace("BRN","Brunei");
loc = loc.replace("BGR","Bulgaria");
loc = loc.replace("BFA","Burkina Faso");
loc = loc.replace("BDI","Burundi");
loc = loc.replace("KHM","Cambodia");
loc = loc.replace("CMR","Cameroon");
loc = loc.replace("CAN","Canada");
loc = loc.replace("CPV","Cape Verde");
loc = loc.replace("CYM","Cayman Islands");
loc = loc.replace("CAF","Central African Republic");
loc = loc.replace("TCD","Chad");
loc = loc.replace("CHL","Chile");
loc = loc.replace("CHN","China");
loc = loc.replace("CXR","Christmas Island");
loc = loc.replace("CCK","Cocos Islands");
loc = loc.replace("COL","Colombia");
loc = loc.replace("COM","Comoros");
loc = loc.replace("COK","Cook Islands");
loc = loc.replace("CRI","Costa Rica");
loc = loc.replace("HRV","Croatia");
loc = loc.replace("CUB","Cuba");
loc = loc.replace("CUW","Curacao");
loc = loc.replace("CYP","Cyprus");
loc = loc.replace("CZE","Czech Republic");
loc = loc.replace("COD","Democratic Republic of the Congo");
loc = loc.replace("DNK","Denmark");
loc = loc.replace("DJI","Djibouti");
loc = loc.replace("DMA","Dominica");
loc = loc.replace("DOM","Dominican Republic");
loc = loc.replace("TLS","East Timor");
loc = loc.replace("ECU","Ecuador");
loc = loc.replace("EGY","Egypt");
loc = loc.replace("SLV","El Salvador");
loc = loc.replace("GNQ","Equatorial Guinea");
loc = loc.replace("ERI","Eritrea");
loc = loc.replace("EST","Estonia");
loc = loc.replace("ETH","Ethiopia");
loc = loc.replace("FLK","Falkland Islands");
loc = loc.replace("FRO","Faroe Islands");
loc = loc.replace("FJI","Fiji");
loc = loc.replace("FIN","Finland");
loc = loc.replace("FRA","France");
loc = loc.replace("GUF","French Guiana");
loc = loc.replace("PYF","French Polynesia");
loc = loc.replace("ATF","French Southern Territories");
loc = loc.replace("GAB","Gabon");
loc = loc.replace("GMB","Gambia");
loc = loc.replace("GEO","Georgia");
loc = loc.replace("DEU","Germany");
loc = loc.replace("GHA","Ghana");
loc = loc.replace("GIB","Gibraltar");
loc = loc.replace("GRC","Greece");
loc = loc.replace("GRL","Greenland");
loc = loc.replace("GRD","Grenada");
loc = loc.replace("GLP","Guadeloupe");
loc = loc.replace("GUM","Guam");
loc = loc.replace("GTM","Guatemala");
loc = loc.replace("GGY","Guernsey");
loc = loc.replace("GIN","Guinea");
loc = loc.replace("GNB","Guinea-Bissau");
loc = loc.replace("GUY","Guyana");
loc = loc.replace("HTI","Haiti");
loc = loc.replace("HMD","Heard Island and McDonald Islands");
loc = loc.replace("HND","Honduras");
loc = loc.replace("HKG","Hong Kong");
loc = loc.replace("HUN","Hungary");
loc = loc.replace("ISL","Iceland");
loc = loc.replace("IND","India");
loc = loc.replace("IDN","Indonesia");
loc = loc.replace("IRN","Iran");
loc = loc.replace("IRQ","Iraq");
loc = loc.replace("IRL","Ireland");
loc = loc.replace("IMN","Isle of Man");
loc = loc.replace("ISR","Israel");
loc = loc.replace("ITA","Italy");
loc = loc.replace("CIV","Ivory Coast");
loc = loc.replace("JAM","Jamaica");
loc = loc.replace("JPN","Japan");
loc = loc.replace("JEY","Jersey");
loc = loc.replace("JOR","Jordan");
loc = loc.replace("KAZ","Kazakhstan");
loc = loc.replace("KEN","Kenya");
loc = loc.replace("KIR","Kiribati");
loc = loc.replace("XKX","Kosovo");
loc = loc.replace("KWT","Kuwait");
loc = loc.replace("KGZ","Kyrgyzstan");
loc = loc.replace("LAO","Laos");
loc = loc.replace("LVA","Latvia");
loc = loc.replace("LBN","Lebanon");
loc = loc.replace("LSO","Lesotho");
loc = loc.replace("LBR","Liberia");
loc = loc.replace("LBY","Libya");
loc = loc.replace("LIE","Liechtenstein");
loc = loc.replace("LTU","Lithuania");
loc = loc.replace("LUX","Luxembourg");
loc = loc.replace("MAC","Macao");
loc = loc.replace("MKD","Macedonia");
loc = loc.replace("MDG","Madagascar");
loc = loc.replace("MWI","Malawi");
loc = loc.replace("MYS","Malaysia");
loc = loc.replace("MDV","Maldives");
loc = loc.replace("MLI","Mali");
loc = loc.replace("MLT","Malta");
loc = loc.replace("MHL","Marshall Islands");
loc = loc.replace("MTQ","Martinique");
loc = loc.replace("MRT","Mauritania");
loc = loc.replace("MUS","Mauritius");
loc = loc.replace("MYT","Mayotte");
loc = loc.replace("MEX","Mexico");
loc = loc.replace("FSM","Micronesia");
loc = loc.replace("MDA","Moldova");
loc = loc.replace("MCO","Monaco");
loc = loc.replace("MNG","Mongolia");
loc = loc.replace("MNE","Montenegro");
loc = loc.replace("MSR","Montserrat");
loc = loc.replace("MAR","Morocco");
loc = loc.replace("MOZ","Mozambique");
loc = loc.replace("MMR","Myanmar");
loc = loc.replace("NAM","Namibia");
loc = loc.replace("NRU","Nauru");
loc = loc.replace("NPL","Nepal");
loc = loc.replace("NLD","Netherlands");
loc = loc.replace("ANT","Netherlands Antilles");
loc = loc.replace("NCL","New Caledonia");
loc = loc.replace("NZL","New Zealand");
loc = loc.replace("NIC","Nicaragua");
loc = loc.replace("NER","Niger");
loc = loc.replace("NGA","Nigeria");
loc = loc.replace("NIU","Niue");
loc = loc.replace("NFK","Norfolk Island");
loc = loc.replace("PRK","North Korea");
loc = loc.replace("MNP","Northern Mariana Islands");
loc = loc.replace("NOR","Norway");
loc = loc.replace("OMN","Oman");
loc = loc.replace("PAK","Pakistan");
loc = loc.replace("PLW","Palau");
loc = loc.replace("PSE","Palestinian Territory");
loc = loc.replace("PAN","Panama");
loc = loc.replace("PNG","Papua New Guinea");
loc = loc.replace("PRY","Paraguay");
loc = loc.replace("PER","Peru");
loc = loc.replace("PHL","Philippines");
loc = loc.replace("PCN","Pitcairn");
loc = loc.replace("POL","Poland");
loc = loc.replace("PRT","Portugal");
loc = loc.replace("PRI","Puerto Rico");
loc = loc.replace("QAT","Qatar");
loc = loc.replace("COG","Republic of the Congo");
loc = loc.replace("REU","Reunion");
loc = loc.replace("ROU","Romania");
loc = loc.replace("RUS","Russia");
loc = loc.replace("RWA","Rwanda");
loc = loc.replace("BLM","Saint Barthelemy");
loc = loc.replace("SHN","Saint Helena");
loc = loc.replace("KNA","Saint Kitts and Nevis");
loc = loc.replace("LCA","Saint Lucia");
loc = loc.replace("MAF","Saint Martin");
loc = loc.replace("SPM","Saint Pierre and Miquelon");
loc = loc.replace("VCT","Saint Vincent and the Grenadines");
loc = loc.replace("WSM","Samoa");
loc = loc.replace("SMR","San Marino");
loc = loc.replace("STP","Sao Tome and Principe");
loc = loc.replace("SAU","Saudi Arabia ");
loc = loc.replace("SEN","Senegal");
loc = loc.replace("SRB","Serbia");
loc = loc.replace("SCG","Serbia and Montenegro");
loc = loc.replace("SYC","Seychelles");
loc = loc.replace("SLE","Sierra Leone");
loc = loc.replace("SGP","Singapore");
loc = loc.replace("SXM","Sint Maarten");
loc = loc.replace("SVK","Slovakia");
loc = loc.replace("SVN","Slovenia");
loc = loc.replace("SLB","Solomon Islands");
loc = loc.replace("SOM","Somalia");
loc = loc.replace("ZAF","South Africa");
loc = loc.replace("SGS","South Georgia and the South Sandwich Islands");
loc = loc.replace("KOR","South Korea");
loc = loc.replace("SSD","South Sudan");
loc = loc.replace("ESP","Spain");
loc = loc.replace("LKA","Sri Lanka");
loc = loc.replace("SDN","Sudan");
loc = loc.replace("SUR","Suriname");
loc = loc.replace("SJM","Svalbard and Jan Mayen");
loc = loc.replace("SWZ","Swaziland");
loc = loc.replace("SWE","Sweden");
loc = loc.replace("CHE","Switzerland");
loc = loc.replace("SYR","Syria");
loc = loc.replace("TWN","Taiwan");
loc = loc.replace("TJK","Tajikistan");
loc = loc.replace("TZA","Tanzania");
loc = loc.replace("THA","Thailand");
loc = loc.replace("TGO","Togo");
loc = loc.replace("TKL","Tokelau");
loc = loc.replace("TON","Tonga");
loc = loc.replace("TTO","Trinidad and Tobago");
loc = loc.replace("TUN","Tunisia");
loc = loc.replace("TUR","Turkey");
loc = loc.replace("TKM","Turkmenistan");
loc = loc.replace("TCA","Turks and Caicos Islands");
loc = loc.replace("TUV","Tuvalu");
loc = loc.replace("VIR","U.S. Virgin Islands");
loc = loc.replace("UGA","Uganda");
loc = loc.replace("UKR","Ukraine");
loc = loc.replace("ARE","United Arab Emirates");
loc = loc.replace("GBR","United Kingdom");
loc = loc.replace("USA","United States");
loc = loc.replace("UMI","United States Minor Outlying Islands");
loc = loc.replace("URY","Uruguay");
loc = loc.replace("UZB","Uzbekistan");
loc = loc.replace("VUT","Vanuatu");
loc = loc.replace("VAT","Vatican");
loc = loc.replace("VEN","Venezuela");
loc = loc.replace("VNM","Vietnam");
loc = loc.replace("WLF","Wallis and Futuna");
loc = loc.replace("ESH","Western Sahara");
loc = loc.replace("YEM","Yemen");
loc = loc.replace("ZMB","Zambia");
loc = loc.replace("ZWE","Zimbabwe");

return loc;

}
