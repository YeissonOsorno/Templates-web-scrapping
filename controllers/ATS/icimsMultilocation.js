/* Extract Multilocation with conutry codes */
/* Extract */
(function () {
    var jobs = [];
    var out = {};
    var cont = 1;
    var json;
    var seguir = true;
    var limit;
    let countries = {
      AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "entucky",
      LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
      MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
      ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
      TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming",DC:"DC"
    }
  
    do {
    if (typeof msg == "undefined") msg = console.log;
  
    var data = 'pr=' + cont + '&in_iframe=1&schemaId=&o=';
    let search = window.location.search;
    $.ajax({
      url: window.location.href.replace(search,'?pr=') + cont + '&in_iframe=1&schemaId=&o=',                                            // 1) url
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "text/html;charset=UTF-8"    // 2) headers
      },
      type: 'GET',                                        // 3) tipo
      dataType: "html",                                   // 4) data que retorna
      data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        var html = document.createElement("div");
        html.innerHTML = result;
        var html_jobs = html.querySelectorAll(".container-fluid.iCIMS_JobsTable .row");
        limit = html.querySelector('div.container-fluid.iCIMS_SearchResultsHeader > div > div.pull-left > h2').innerText.split('of').pop();// 5) ruta de los trabajos
        msg('\x1b[45m' + html.querySelector('div.container-fluid.iCIMS_SearchResultsHeader > div > div.pull-left > h2').innerText)
        for (var x in html_jobs) {
          if (typeof html_jobs[x] == "function") continue;
          if (typeof html_jobs[x] == "number") continue;
          var elem = html_jobs[x];
  
          var loc = elem.querySelector("div.col-xs-6.header.left span:nth-child(2)").textContent.trim().split("|");
          loc.forEach(function (element) {
            var job = {};
  
            job.title = elem.querySelector("a > span:nth-child(2)").textContent.trim();
            job.url = elem.querySelector("a").href.trim() + "&mode=job&iis=Neuvoo";
            let _location = element.trim();
            _location = _location.split('-').reverse().join().replace(/,/gi, ', ').trim();
            if (_location.indexOf('Virtual Office') > -1) { _location = _location.replace('Virtual Office', 'Bloomington, Minnesota'); }
            let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
            _location = _location.split(',');          
            let newLocation = geoUS.doCleaning(_location[1].trim());
            _location.splice(1,1,newLocation[0])          
            job.location = _location.join(',').trim();
            /*var fecha = elem.querySelector("").textContent.trim().split("/");
            job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
            job.dateposted_raw = dateAgo(elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").textContent.split("(").shift().trim(), " ", 0,1)
            //job.logo = elem.querySelector("").getAttribute("src").trim();
            //job.source_apply_email = elem.querySelector("").textContent.trim();
            //job.source_empname = elem.querySelector("").textContent.trim();
            //job.source_jobtype = elem.querySelector("").textContent.trim();
            //job.source_salary = elem.querySelector("").textContent.trim();
            job.temp = 1;
            jobs.push(job);
          }, elem);
        }
        cont++;
      },
      error: function (error) {
        msg(error);
      }
    });
    } while (cont < limit);
  
    out["jobs"] = jobs;
    return out;
  })();
  
  function dateAgo(text, char_separator, value_DWMY, position_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_DWMY] !== 'undefined') {
      var Day_Week_Month_Year = text.split(char_separator)[position_DWMY]
      } else { var Day_Week_Month_Year = text.split(char_separator)[text.split(char_separator).length - 1] };
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (Day_Week_Month_Year.toUpperCase().indexOf('TODAY') > -1 || Day_Week_Month_Year.toUpperCase().indexOf('HOUR') > -1) { nDays = 0; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
    var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);  //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var day = datePosted.getDate(); //devuelve el numero del dia del mes.
    var month = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var year = datePosted.getFullYear().toString(); //devuelve el año.
    if (day < 10) { day = '0' + day.toString().trim(); } else { day = day.toString().trim(); }
    /*Obtengo mes*/
    if (month < 10) { month = '0' + month.toString(); } else { month = month.toString(); }
    dateJob = month + '/' + day + '/' + year;
    return dateJob;
  }
  
  /* function change country code */
  
  function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word)=>{
      let result, countryResult;
      result = this.doSearch(this.countryCodesArr,word);
      if(typeof result =="string") return result;
      countryResult = this.countriesArr[result];
      return new Array(countryResult, result);
    }
    this.doSearch = (arraySearch, targetValue)=> {
      let arrayDoSearch = arraySearch;
      let length = arrayDoSearch.length;
      for(let item = 0; item<length; item++){
        if(arrayDoSearch[item] === targetValue){
          console.log('\x1b[32m Find');
          return item;
        }
      }  
    }
  }
  
  /* job Description */
  (function() {
    var out = {};
    var job = {};
    var selector = "div.iCIMS_JobContent";
    var remove_selector = "div.iCIMS_JobOptions";
    //var job = pass_it["job"];
  
    var iframe_selector = "#icims_iframe_span > iframe";   
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var remove_selectors = ["script"]; 
  
  
  
    var full_html = iframeDocument.querySelector(selector);
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    if(full_html){
      // remove something from the jobdatata 
      if (remove_selector != "") full_html.querySelector(remove_selector).remove();
      if (full_html.querySelector("div.container-fluid.iCIMS_JobsTable")) 
        full_html.querySelector("div.container-fluid.iCIMS_JobsTable").remove();
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  
      for (const a of full_html.querySelectorAll("a")) {        
        if (a.textContent.includes("www")){//tambien se puede usar search o match
          a.remove();
        }else {
          a.remove();
        }
      }
  
      job.html 		= full_html.innerHTML.trim();
  
      /*if(job.html.search(/CV|resume|cover letter|curriculum/gi)>-1){
          if(job.html.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi) > -1){
            job.source_apply_email = job.html.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0];
          }
        }*/
  
  
      job.html = removeTextBefore(job.html, "Description", false);
      job.html = removeTextAfter(job.html, "Connect With ", true);
      job.html = removeTextAfter(job.html, "Software Powered by iCIMS", true);
      
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
  
      job.jobdesc= removeTextAfter(job.jobdesc, "Connect With Us!", true);
  
  
      //To view all benefits offered by Room & Board, please visit:
      job.html 		= cleanHTML(job.html);
      job.jobdesc 	= cleanHTML(job.jobdesc);
    } else {
  
      job.dateclosed_raw='01/01/2012';
      job.flag_active=0;
    }
  
    out["job"] = job;
    return out;
  
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
  })();
  