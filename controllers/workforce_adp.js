/* Extract*/
(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
      if (!pass_it["cont"]) {
        out["pass_it"] = {
          "cont": 1,
          "jobs": 0
         
        };
      } else {
        out["pass_it"] = pass_it;
      }
    
   
  
      var element = document.querySelector("pre").textContent;
      var json = JSON.parse(element);
      var jobs = json.jobRequisitions;
    
   
    var returnedJobs = [];  
    for(i in jobs) {
          var job = {};/*init*/
      
            //Values taken from current URL in spider info/dev comment
      
        var currentURLdomConstant = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?";
        var cidTillType           = "cid=054f0ef8-a23f-4b58-af47-8659c9c75948&ccId=1507758876_7793&type=MP"; 
        var jobId                 = jobs[i].itemID;
        var lang                  = "&lang=en_US";
          
        job.title = jobs[i].requisitionTitle;
      
         // Multi-location 
         if(jobs[i].requisitionLocations[0].nameCode.shortName){
  
        var locs = jobs[i].requisitionLocations; 
        for (var w in locs) {
               if(typeof locs[w] =="function") continue;
               if(typeof locs[w] =="number") continue;
      
   
        job.location += "/" + locs[w].nameCode.shortName + "/";
          
       // job.location = job.location.replace(/undefined/gi).trim();
        
        var lastCharLoc = job.location.substr(job.location.length -1);
        if(lastCharLoc === "/"){job.location = job.location.slice(0,-1).trim();}
          
      
       }
           
          
        }else{
          job.location = "US";
        }
      
        if(job.location.indexOf("/")>-1){           
  
  
            let splitOnFirstCommaLoc = job.location.split("/").shift().trim(); 
                job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();
                            
                let firstCharLoc = job.location.charAt(0);
                if(firstCharLoc === "/"){job.location = job.location.slice(1).trim();}
  
      }    
   
        job.url = currentURLdomConstant + cidTillType + "&jobId=" + jobId  + lang;
        
        
        
        //----------DATE-POSTED-------------------------------------
       
       var datum  = jobs[i].postDate.split("T")[0];
       job.dateposted_raw = getDateFormat(datum,"-",2,1,0);
  
       //---------------------------------------------------------
  
        
        if(job.location.indexOf(",")>-1 && job.location.indexOf("/")==-1){
          
          let commas = job.location.match(/\,/g).length;
          if(commas == 3){
                job.location = job.location.split(",");
              job.location.shift();
              job.location = job.location.join(", ").trim();
          }
        }
      
        job.temp = "Sep/2020";
  
        //if(job.location.indexOf("Billings, MT, Billings,")>-1){job.location = "Billings, MT, US";}
        //if(job.location.indexOf("McPherson, KS, McPherson,")>-1){job.location = "McPherson, KS, US";}
      
      
          if(job.location.indexOf(",")>-1){           
         
         let numberOfCommas = job.location.match(/\,/g).length;  
         if(numberOfCommas == 2){ 
  
           
           var state   = job.location.split(",")[1].trim();
           job.title = job.title.split(state).shift().trim();
                               
                               }
  
         } 
      
      
        if (job.location.indexOf("/") > -1) {
  
  
          var locclean = job.location;
  
          var locs = locclean;
  
          locs = locs.split('/');
          for (l in locs) {
  
            var jobx = {};
  
            jobx.title    = job.title;
            jobx.url      = job.url;
            jobx.location = locs[l].trim();
            jobx.temp     = job.temp;
            jobx.dateposted_raw = job.dateposted_raw;
            
                  if(jobx.location.indexOf(",")>-1){
          
                      let commas = jobx.location.match(/\,/g).length;
                      if(commas == 3){
                          jobx.location = jobx.location.split(",");
                          jobx.location.shift();
                          jobx.location = jobx.location.join(", ").trim();
                      }
                    }
  
            if(jobx.location.length > 0){returnedJobs.push(jobx);}
             
        }
        
        }else {
          job.location = job.location; 
          returnedJobs.push(job);
        }
   
    }
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();   
      
    function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
         dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
            
          let day   =  dateRaw.split(cut)[dayPosition].trim(), 
              month =  dateRaw.split(cut)[monthPosition].trim(), 
              year  = dateRaw.split(cut)[yearPosition].trim();
           if(day < 10 && day.length < 2){day = "0" + day;} 
      
          if(dateRaw.search(/[a-z]/gi)>-1){ 
              if(month.search(/jan/i)>-1){month = "01";}
              if(month.search(/feb|fév/i)>-1){month = "02";}
              if(month.search(/mar/i)>-1){month = "03";}
              if(month.search(/apr|avr/i)>-1){month = "04";}
              if(month.search(/may|mai/i)>-1){month = "05";}
              if(month.search(/jun|juin/i)>-1){month = "06";}
              if(month.search(/jul|juil/i)>-1){month = "07";}
              if(month.search(/aug|août/i)>-1){month = "08";}
              if(month.search(/sep/i)>-1){month = "09";}
              if(month.search(/oct/i)>-1){month = "10";}
              if(month.search(/nov/i)>-1){month = "11";}
              if(month.search(/dec|déc/i)>-1){month = "12";}
            }
     var datum = month +"/"+  day +"/"+ year;
       return datum;
    }
  
    /* pagination */
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
            const domain = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=054f0ef8-a23f-4b58-af47-8659c9c75948&timeStamp=1601930024494&lang=en_US&ccId=1507758876_7793&locale=en_US&$top=20&$skip=";
            
              const url = domain + out["pass_it"].cont;
            window.location.href = url;
            msg(url);
            out["has_next_page"] = true;
        }
    
        out["wait"] = true;
        return out;
    })();
    /* Job description*/
    (function() {
        var out = {};
        out.pic = true;
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