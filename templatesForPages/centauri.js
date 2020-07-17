/* Infinite Pagination */
/*
												*  EXPLICACION DE ESTA PLANTILLA DE INFINITE SCROLL
* Primero tienes que saber que el scroll es como un load more solo que el scroll tiene un contenedor propio entonces cuando usas la funcion
* en la linea 26 window.scrollBy(0, document.body.scrollHeight); lo que hace es que vas a hacer un Scroll por el tamaño del body, entonces
* aveces pasa que el body tiene un tamaño especifico y cuando haces el scroll no da tiempo a que cargue por ejemplo
* Supongase que el tamaño del body.scrollHeight (la altura) es de 100px entonces yo voy a hacer un scroll del tamaño de 100px
* entonces los jobs siguientes no salen, entonces lo que se hace es que se agranda el tamaño del body para que cuando yo haga scroll sea mas
*  grande y pueda tomar mas jobs
*/
(function () {
    var out = {};
    // Crea un div para darle altura a la pagina
    var ref = document.querySelector('div[class="scroll"]'); /* Selector que contiene los jobs */
    var newEle = document.createElement('div');
    ref.appendChild(newEle);
    newEle.style.height = '6000px' /* para darle altura a la pagina  */
    msg(pass_it);
    if(!pass_it["heights"])    out["pass_it"] = {"heights":[]};
    else                     out["pass_it"] = pass_it;
  
    out["has_next_page"] = true;
    if(out["pass_it"]["heights"].length > 3){
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
    }
        window.scrollBy(0, document.body.scrollHeight);
    
    out["wait"] = true;
    out["pic"] = true;
    out["html"] = true;
    out["pass_it"]["heights"].push(document.querySelectorAll('div[class="oracletaleocwsv2-accordion-head-info"]').length); /* Selector de los JOBS */ 
    return out;
  })();
  /* Extract */
  (function () {
    const out = {};
    let countries = {
      AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "entucky",
      LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
      MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
      ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
      TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming",DC:"DC"
    }
    const html_jobs = document.querySelectorAll('div[class="oracletaleocwsv2-accordion-head-info"]');
    const jobs = []; for (let x in html_jobs) {
      if (typeof html_jobs[x] == "function") continue;
      if (typeof html_jobs[x] == "number") continue;
      let job = {};    
      let geoUS = new Geo(Object.keys(countries), Object.values(countries));
  
      let elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      let _location = elem.querySelector("div").textContent.trim().split('-');
      let newLocation = geoUS.doCleaning(_location[0].trim());
      _location.splice(0, 1, newLocation[0])
      job.location = _location.reverse().join(', ').trim();
  
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    }
  
    out["jobs"] = jobs;
    return out;
  })();
  
  /* Function that convert countryCode US to State */
  function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word) => {
      let result, countryResult;
      result = this.doSearch(this.countryCodesArr, word);
      countryResult = this.countriesArr[result];
      return new Array(countryResult, result);
    }
    this.doSearch = (arraySearch, targetValue) => {
      let arrayDoSearch = arraySearch;
      let length = arrayDoSearch.length;
      for (let item = 0; item < length; item++) {
        if (arrayDoSearch[item] === targetValue) {
          console.log('\x1b[32m Find');
          return item;
        }
      }
    }
  }

  /* Without pagination */
   
  /* Description */
  (function() {
    var out = {};
    var job = {};
    var selector = 'div[class*="col-md-8"]';
    var remove_selectors = [
                                                          'script','script','link','div[class*="oracletaleocwsv2-button-navigation "]'
                                                            ,'section','div[class*="col-md-8"]>p:last-child','section','div[class*="col-md-8"]>p:last-child'
                                                    ];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Description/Responsibilities', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    //job.jobdesc   = cleanHTML(job.jobdesc);
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