/*
 * Nota: solo se debe colocar el enlace del JSON GET en el spider info
 * ATS WorkForce ADP - Simple GET
 */

/*
   Config
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
*/

/* Expected Jobs */
(function () {
    let out = {};

    let regex = /\d+/;

    if (typeof msg === 'undefined') msg = console.log;

    const element = document.querySelector("pre").textContent;
    const json = JSON.parse(element);
    const expected_jobs_str = json.meta.totalNumber;

    const expected_jobs = regex.exec(expected_jobs_str)[0];

    out["expected_jobs"] = expected_jobs;

    return out;
})();

/* Before Extract */
(function () {
    let out = {};
    try {
        const element = document.querySelector("pre").textContent;
        if (!element) {
            out["has_next_page"] = false;
        }
        //msg(element);
        const json = JSON.parse(element);
        const jobs = json.jobRequisitions;
        out["json"] = jobs;
    } catch (error) {
        out["wait"] = 500;

    }

    return out;
})();


/*Extract*/
(function () {
    let out = {};
    const countries = {
        AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
        FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "entucky",
        LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
        MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
        ND: "North Dakota", OH: "Ohio", OK: "Oklahoma, US", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
        TN: "Tennessee", TX: "Texas, US", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming", DC: "DC"
    }
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    const element = document.querySelector("pre").textContent;
    const json = JSON.parse(element);
    const jobs = json.jobRequisitions;
    const geoUS = new Geo(Object.keys(countries), Object.values(countries));
    let returnedJobs = [];
    for (i in jobs) {
        let job = {};

        job.title = jobs[i].requisitionTitle;
        const domain = window.location.origin + "/mascsr/default/mdf/recruitment/recruitment.html?cid=2d0c456f-0c87-47ef-b4ce-05813125f63a&jobId=";
        job.url = domain + jobs[i].customFieldGroup.stringFields[0].stringValue.trim()

        /* validate if exists location */
        if (jobs[i].requisitionLocations[0]) {
            const city = jobs[i].requisitionLocations[0].address.cityName.trim();
            const state = jobs[i].requisitionLocations[0].address.countrySubdivisionLevel1.codeValue.trim();
            console.log(state)

            const newCode = geoUS.doCleaning(state);

            job.location = city + ', ' + newCode[0];

        } else { job.location = "HQ"; }

        let date = jobs[i].postDate.split('T').shift().trim().split('-').reverse();
        job.dateposted_raw = `${date[1]}/${date[0]}/${date[2]}`;

        /* validate if Jobtype exists */
        if (jobs[i].workLevelCode) {
            job.source_jobtype = jobs[i].workLevelCode.shortName.replace('Hourly', '').trim()
        }

        job.temp = 1;

        returnedJobs.push(job);
    }

    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"] = returnedJobs;
    return out;

})();
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

/* Pagination */

(function () {
    let out = {};

    const element = document.querySelector("pre").textContent;
    const json = JSON.parse(element);

    if (typeof msg == "undefined") msg = function (x) { return x; };

    out["pass_it"] = pass_it;

    if (json.meta.startSequence + 20 > json.meta.totalNumber) {
        //last page
        out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
        out["pass_it"].cont += 20;
        const domain = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=2d0c456f-0c87-47ef-b4ce-05813125f63a&timeStamp=1594912271245&lang=en_US&ccId=19000101_000001&locale=en_US&$top=20&$skip=";
        const url = domain + out["pass_it"].cont;
        window.location.href = url;
        msg(url);
        out["has_next_page"] = true;
    }

    out["wait"] = true;
    return out;
})();

/* Description */

(function() {
    var out = {};
    var job = {};
    
    var selector = 'div.job-description-data';
    
    var remove_selectors = ['a','input','div.alert','img', 'button',
                            'script','style'
                            
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
    
      //var datePosted     = document.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted,"/",0,1,2); // SIgue el orden de los parmetros en la función "getDateFormat"
    
      //--------------------------------------------------------------------------//
      if(document.querySelector('span.job-description-worker-catergory')){
        job.source_jobtype = document.querySelector('span.job-description-worker-catergory').textContent.trim();
      }
    var full_html = document.querySelector(selector);
    
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
    
      job.html = removeTextBefore(job.html, "text_to_remove_Before", false);
      job.html = removeTextAfter(job.html, "text-to_remove_after", true);
      job.html = removeTextBefore(job.html, 'POSITION PURPOSE:', false);
    job.html = removeTextBefore(job.html, 'POSITION PURPOSE:', false);  
    job.html = removeTextAfter(job.html, 'Copyright ©', true);
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