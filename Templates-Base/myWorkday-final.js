/*Expected jobs*/
(function() {
  var out = {};
     try{
       var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.body.children[0].facetContainer.paginationCount.value;
       out["expected_jobs"] = jobs;
       
     }catch(error){
        out["wait"] = 500;
       
     }
  
    return out;
})();

/*Before Extract */
(function() {
  var out = {};
     try{
       var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.body.children[0].children[0].listItems;
       out["json"] = jobs;
     }catch(error){
        out["wait"] = 500;
       
     }
  
    return out;
})();

/*Extract*/
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

  var jobs =  pass_it["json"];
  var returnedJobs = [];    
  if(!jobs){
    var element = document.querySelector("pre").textContent;    
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
  }

  for(i in jobs) {
    var job = {};
    job.title = jobs[i].title.instances[0].text; 
    job.url = "https://q2ebanking.wd5.myworkdayjobs.com" + jobs[i].title.commandLink;
    var location=validateLocation(jobs[i].subtitles[1].instances[0].text.split("-").reverse().join(", "));
    job.location = location ;
    var dateposted = jobs[i].subtitles[2].instances[0].text.replace(/Posted|Ago/ig,'').trim();
    job.dateposted_raw = dateAgo(dateposted, ' ', 0, 1);
    job.temp = 1;

    //Validate multi location
    if(job.location.indexOf("More") > -1){
      var json_desc = JSON.parse(getDescription(job.url));
      var array = json_desc.body.children[1].children[0].children;
      for(var i in array){
        if(array[i].iconName == 'LOCATION'){
          var jobx = {};
          jobx.title = job.title;
          jobx.url = job.url; 
          var locationx=validateLocation(array[i].imageLabel);
          jobx.location =  locationx;
          jobx.dateposted_raw  =  job.dateposted_raw;
          jobx.temp = job.temp;
          returnedJobs.push(jobx);
        }
      }
    }
    else{
      returnedJobs.push(job);
    }
  }

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
//Function convert ago to date
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;}
  if (mm<10){mm ='0'+ mm;}
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}
//Function validate location and headquarter
function validateLocation(location)
{
  var headquarter = 'Austin, TX' ;
  if(location.indexOf('Remote')>-1)
  {
    location = headquarter;
  }
  if(location.indexOf('Posted')>-1)
  {
    location = headquarter ; 
  }
  return location;
}

/* Pagination */ 
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

    if (out["pass_it"]["jobs"] >= 50) {
    
    //url, cambia según el JSON
    var url = "https://q2ebanking.wd5.myworkdayjobs.com/Q2/0/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont;
  out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();

/* Job Description */
(function() {
  var out = {};
  var job = {};
  var selector = 'div[id="wd-HBox-NO_METADATA_ID-uid3"] >div >div:first-child div[id="wd-PageContent-vbox"] >div >ul:nth-child(3)';
  var remove_selectors = [];

  //Validate if jobtype exists
  var selector_jobtype = 'div[id="wd-HBox-NO_METADATA_ID-uid3"] >div >div:last-child div[id="wd-PageContent-vbox"] >div >ul >li:nth-child(2)'
  if(document.querySelector(selector_jobtype))
  {
    msg('\x1b[32m Yes!, contain jobtype')
    job.source_jobtype = document.querySelector(selector_jobtype).textContent.trim()

  }
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();  
 
  job.html = removeTextAfter(job.html, 'Location', true);
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);  
  job.html      = cleanHTML(job.html);
  job.html = removeTextAfter(job.html, 'Location', true);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
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