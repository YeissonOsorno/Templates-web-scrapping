/* before extract */
(function() {
    var out = {};
      out.iframeSelector = "iframe#icims_content_iframe"
      out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable >div.row"
      return out;
  })();
  
/* Extract */
(function() {
    var out = {};
    var countries = {
      AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
      LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
      MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
      ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
      TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
    }
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable >div.row");
    var jobs = [];
  
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a > span:nth-child(2)").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("div.col-xs-6.header.left span:nth-child(2)").textContent.trim();
      job.location = job.location.split("-");
      let city =job.location[2];
      let state=job.location[1];
      let coutry= job.location[0];      
      let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
      let newLocation = geoUS.doCleaning(state);
      job.location= city +", " + newLocation[0] + ", "+ coutry;
      var dateposted =  elem.querySelector('div[class="col-xs-6 header right"] span[title*="/"]').textContent.trim();
      job.dateposted_raw = dateAgo(dateposted, ' ', 1, 2);
      job.source_jobtype = elem.querySelector('div.iCIMS_JobHeaderGroup >dl:nth-child(3) dd').textContent.trim();
      job.temp = 1;
      jobs.push(job);
    }
  
    //out.wait=2000;
    out["jobs"]= jobs;
    return out;
  })();
  function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word)=>{
      var result, countryResult;
      result = this.doSearch(this.countryCodesArr,word);
      countryResult = this.countriesArr[result];
      return new Array(countryResult, result);
    }
    this.doSearch = (arraySearch, targetValue)=> {
      let arrayDoSearch = arraySearch;
      let length = arrayDoSearch.length;
      for(var item = 0; item<length; item++){
        if(arrayDoSearch[item] === targetValue){
          console.log('\x1b[32m Find');
          return item;
        }
      }  
    }
  }
  
  function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
      var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
      }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
    var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
    var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
    var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10){dd ='0'+dd;}
    if (mm<10){mm ='0'+ mm;}
    dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }
  /* Before Pagination */
  (function() {
    var out = {};
      out.iframeSelector = "#icims_content_iframe"
      out.iframeWaitFor = "h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs"
      return out;
  })();
  
  /* Pagination */
  (function() {
    var out = {};
    out.wait = 2000;
    if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function (x) { return x; };

  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
      };
  } else {
      out["pass_it"] = pass_it;
  }

    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var textPaginador = iframeDocument.querySelector(".pull-left > h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs").textContent.trim();

var max = textPaginador.split(" of ").pop();
var min = textPaginador.split(" of ").shift().split("Page ").pop();

if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
        msg(min + " - " + max);
      var nuevaUrl = "https://careers-southampton.icims.com/jobs/search?pr=" + out["pass_it"].cont;
      out["pass_it"].cont++;
      window.location.href = nuevaUrl;
        out["has_next_page"] = true;
} else {
  //try again
  out["has_next_page"] = false;
}



    out["wait"] = true;
    return out;
})();

/* Before job description */
(function() {
    var out = {};
      out.iframeSelector = "#icims_iframe_span > iframe";   
      out.iframeWaitFor = "div.iCIMS_JobContent";
      return out;
  })();
    
  

  /* JOb description */


  (function() {
    var out = {};
    var job = {};
  
    var selector = 'div.iCIMS_JobContent';  
    var selector_iframe = "#icims_iframe_span > iframe";
    var iframeDocument = document.querySelector(selector_iframe).contentWindow.document;
    var remove_selectors = ['a','input','div.alert','img', 'button',
                            'script','style','div.iCIMS_JobOptions'
  
                           ];
    //var job = pass_it["job"];
  
    //------------INFO----------------------------------------------------------//
    /* // Para validar la existencia del selector. Si no existe habrá error de selector. 
    var check = document.querySelector('selectorDeLaLocacion') !== null;
    if(check){
      job.location = document.querySelector('selectorDeLaLocacion').textContent.trim();
   }else{
    job.location = ""; // HQ's location
  
  
   }
  */
    // job.location       = document.querySelector('').textContent.trim();
    // job.source_jobtype = document.querySelector('').textContent.trim();
    // job.source_salary  = document.querySelector('').textContent.trim();
  
    // job.experienced_required = document.querySelector('').textContent.trim();
  
    var check = iframeDocument.querySelector('div[class="col-xs-6 header right"]');
    if(check){
      var datePosted     = iframeDocument.querySelector('div[class="col-xs-6 header right"] >span:last-child').getAttribute('title').split(' ')[0].trim();
      job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2); // SIgue el orden de los parmetros en la función "getDateFor
    }
    //--------------------------------------------------------------------------//
  
    var full_html = iframeDocument.querySelector(selector);
  
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
  
  
    var full_html_text = full_html.textContent;
  
    /*  // E-mail 
    if(full_html_text.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    job.source_apply_email = full_html_text.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
    */
  
    /*
      for (const a of full_html.querySelectorAll('tr')) {
        if (a.textContent.search('Location:')>-1){
           //job.location = a.textContent.trim();
           //job.source_jobtype = a.textContent.trim();
        } 
      }
  
      */
  
  
    // TO Remove selectors 
    for (const a of full_html.querySelectorAll('a, img, script')) {
      if (a){
        a.remove(); 
      } 
    }
  
  
    if(cleanHTML(full_html_text).trim().length < 200){
      //if(cleanHTML(full_html_text).trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
      msg('\x1b[31m Sorry! :( description not available')
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
  
    }else{
  
      job.html    = full_html.innerHTML.trim();
  
      job.html = removeTextBefore(job.html, "Overview", false);
      job.html = removeTextAfter(job.html, "Montrose is an Equal Opportunity Employer", true);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
  
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
  
      /*
    if(job.html.indexOf("Location")>-1 && job.html.indexOf("Job Description")>-1){
  
      let a = job.html.indexOf("Location");
      let b = job.html.indexOf("Job Description");
      let x = job.html.slice(a,b);
  
      let b_length = "Job Description".lenth;
      job.html = job.html.replace(x + b_length,"").trim();
    }
  */
  
      //job.html = job.html.replace("","");
      //job.html = job.html.replace("","");
      //job.html = job.html.replace("","");
  
      //var title = pass_it["job"].title;
      //job.html  = job.html.replace(title,"");
  
      //CLEAN EMOJIS
      // job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  
  
      job.html    = cleanHTML(job.html);
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
        newHtml = text + " " + newHtml;
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