/* Expected jobs */
(function () {
    var jobs = [];
    var out = {};
    var json;
  
    var data = {"sEcho": 1,
                "iColumns": "4",
                "sColumns": ",,,",
                "iDisplayStart": 0,
                "iDisplayLength": "10",
                "mDataProp_0": "0",
                "bSortable_0": "true",
                "mDataProp_1": "1",
                "bSortable_1": "true",
                "mDataProp_2": "2",
                "bSortable_2": "true",
                "mDataProp_3": "3",
                "bSortable_3": "false",
                "iSortingCols": "0",
                "settings_hash": "24876de1dd64a3542f5f436b95d98262"}
  
    $.ajax({
      url: 'https://recruiting.talentreef.com/alfa-company-pages-ajax-postions/1775333/true',                                            // 1) url
      headers: {                                                      
        "accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"    // 2) headers
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("\x1b[32m loading jobs...");
        json = result.iTotalRecords; 
        out["expected_jobs"] = json;
  
      },
      error: function (error) {
        msg(error);
      }
    });
  
  
    out["jobs"] = jobs;
    return out;
  })();
  
  

/* Extract */  

(function () {
    var jobs = [];
    var out = {};
    var cont = 1;
    var page = 0;
    var follow = true;
    var json;
    var countries = {
      AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
      LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
      MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
      ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
      TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming"
    }
    do {
  
  
    var data = {"sEcho": cont,
                "iColumns": "4",
                "sColumns": ",,,",
                "iDisplayStart": page,
                "iDisplayLength": "10",
                "mDataProp_0": "0",
                "bSortable_0": "true",
                "mDataProp_1": "1",
                "bSortable_1": "true",
                "mDataProp_2": "2",
                "bSortable_2": "true",
                "mDataProp_3": "3",
                "bSortable_3": "false",
                "iSortingCols": "0",
                "settings_hash": "24876de1dd64a3542f5f436b95d98262"}
  
    $.ajax({
      url: 'https://recruiting.talentreef.com/alfa-company-pages-ajax-postions/1775333/true',                                            // 1) url
      headers: {                                                      
        "accept": "application/json, text/javascript, */*; q=0.01",
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"    // 2) headers
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("\x1b[32m loading jobs...");
        json = result.aaData; 
  
        msg(json.length);
        var stop = json.length;
  
        if(stop < 3) follow = false;
        var temp  = document.createElement('div');    
        for(var x in json){
          if(typeof json[x] =="function") continue;
          if(typeof json[x] =="number") continue;
          var job = {};
          var elem = json[x];
          temp.innerHTML = elem;
          job.title = temp.querySelector('a').textContent.trim();
          job.url = temp.querySelector("a").href.trim();
          job.location = elem[2].split('</br>')[1].replace(/[0-9]/g,'').trim();
          var _location = job.location.split(',');
          var geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
          var newLocation = geoUS.doCleaning(_location[1].split(' ')[2].trim()); 
          job.location = _location[0].trim() + ', ' + newLocation[0].trim() + ', ' + _location[1].split(' ')[1].trim();
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          job.temp = 1;
          jobs.push(job);
        } 
  
        cont++;
        page +=10;
      },
      error: function (error) {
        msg(error);
      }
    });
    } while (follow == true);                                 
  
    out["jobs"] = jobs;
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
  
  /* Description */
  (function() {
    var out = {};
    var job = {};
    var selector = "div.salaried-description-text-container";
    var remove_selectors = [];
  
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Overview of Position:', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    if(job.jobdesc.length < 255){
      msg('\x1b[31m  Job description is very Short number characters is ' + job.jobdesc.length);
      job.flag_active = 0;
      job.html = 'Jobdata is not available yet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      job.jobdesc = job.html; 
      out["job"] = job;
      return out; 
    }
    for(const a of document.querySelectorAll('div.desc-table-column:first-child>div')){
      const text = a.textContent.trim();
      if(text.search(/STATUS:/i) > -1){
        job.source_jobtype = text.split(/STATUS:/i).pop().trim();
        //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
        a.remove();//remueve el selector si coincide con la palabra clave.
      }
    }
    for(const a of document.querySelectorAll('div.desc-table-column:last-child>div')){
      const text = a.textContent.trim();
      if(text.search(/DATE POSTED:/i) > -1){
        job.dateposted_raw = text.split(/DATE POSTED:/i).pop().trim();
        
        //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
        a.remove();//remueve el selector si coincide con la palabra clave.
      }
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
  
  