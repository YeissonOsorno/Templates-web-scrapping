/* Extract */


(function() {
    var out = {};
    var iframe_selector = "iframe[name*='easyXDM_default']";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div#jobList > div.row-table");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
  
      job.title    = elem.querySelector("a").textContent.trim().replace(/\(([^)]*)\)/g,'')
      job.url      = elem.querySelector('a').href.trim();
      job.location = elem.querySelector(" div:nth-child(2)").textContent.trim()+', DE';
  
      job.dateposted_raw = elem.querySelector("div:nth-child(4)").textContent.trim(); 
      job.dateposted_raw = getDateFormat(job.dateposted_raw,".",0,1,2); //dateRaw, cut, dayPosition, monthPosition, yearPosition
  
  
      job.source_jobtype = elem.querySelector("div:nth-child(3)").textContent.trim();
  
      job.temp = 'June-2020';
      jobs.push(job);
      //}
  
    } 
  
  
  
    out["jobs"]= jobs;
    return out;
  })();
  
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
  
    if(year.length == 2){year = "20" + year;}
    var datum = month +"/"+  day +"/"+ year;
    return datum;
  }
  
  /* Description */
  (function() {
    var out = {};
    //IFRAME
    var idIframe = 'iframe[name*="easyXDM_default"]';
    var myIframe = document.querySelector(idIframe).contentWindow.document;
  
    var job = {};
    var selector = "#jobAdContainer"; // donde está la descripción
  
    job.html = $(selector,myIframe).html(); //con iframe
    if (typeof job.html == 'undefined'){
      job.html = "";
    }
  
  
    job.html = $("<div>"+job.html+"</div>").find("a, style, script, img, div.alert, button").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("h1, div.info-section.section-grey, div.btn-container").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.logo-text").remove().end().html();
    //job.html = $("<div>"+job.html+"</div>").find("").remove().end().html();
    //job.html = $("<div>"+job.html+"</div>").find("").remove().end().html();
  
  
  
    if(job.html.trim().length < 200){
      // if(job.html.trim().length < 200 || job.html.indexOf("Error")>-1){
  
  
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
  
    }else{
  
      var full_html = job.html;
  
  
  
  
      job.html = job.html.split("Diese Beilagen servieren")[0];
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
      //job.html = job.html.split("")[0];
  
  
      //var title = pass_it["job"].title;
      //job.html  = job.html.replace(title,"");
  
      //CLEAN EMOJIS
      // job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();
  
  
  
      job.html    = cleanHTML(job.html);
      job.jobdesc = job.html;
    }
    out["job"]  = job;
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