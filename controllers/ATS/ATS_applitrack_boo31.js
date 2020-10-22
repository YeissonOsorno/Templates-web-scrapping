


/*
Nota: el URL se construye a partir del botón que dice "print"


*/

// EXTRACT 

(function() {
  var out = {};

      var html_jobs = document.querySelectorAll('div#AppliTrackListContent ul.postingsList');
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];
      
      var jobID = elem.getAttribute("id").replace("p","").replace("_","").trim();

      job.title    = elem.querySelector('li.title').innerHTML.split("<").shift().trim(); 
      job.url      =  window.location.href + "&AppliTrackJobId=" + jobID + "&AppliTrackLayoutMode=detail&AppliTrackViewPosting=1";
      job.location = "Schaumburg, IL"; // HQ's location of "Frontline Recruiting and Hiring"
      
       for (const a of elem.querySelectorAll('li')) {
        if (a.textContent.search('Date Posted')>-1){
          var datePosted = a.querySelector('span.normal').textContent.trim();
          job.dateposted_raw = getDateFormat(datePosted,'/',1,0,2);
         } 
      }
  
   


    
      job.temp  = "Aug-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);

    
      if(job.title.search(/Non-specified|Internal Only|Job Fair/i)>-1){job.title = "";}
      
     
     if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
      }
    
    } 
  
  out["jobs"]= jobs;
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

  // PAG 

  (function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

// JOB DESCRIPTION 

(function() {

  var out = {};
  var job = {};

  var selector  = "ul.postingsList"; 

  var full_html = $(selector);
  var html_2    = $(selector).text();


  
 //-----------REMOVE SELECTORS--------------------------------------//

    full_html.find('a, input, button').remove().end().html();
    full_html.find('img, div.alert, style, script').remove().end().html();
    full_html.find('form').remove().end().html();
    
    //full_html.find("h1").remove().end().html();

    full_html.find("li.title").remove().end().html();
    full_html.find("li:contains(Date Posted)").remove().end().html();
    full_html.find("li:contains(Location)").remove().end().html();
    full_html.find("li:contains(Closing Date)").remove().end().html();

    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();


 //-----------------------------------------------------------------// 

  var full_html_text = full_html.text();

    if(cleanHTML(full_html_text).trim().length < 200){
  //if(cleanHTML(full_html_text).trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
  

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{

  var full_html = full_html.html();

   job.html = full_html.trim();

  job.html = removeTextBefore(job.html, "JOB SUMMARY", false);
  job.html = removeTextBefore(job.html, "Summary of Function", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
/*
    if(job.html.indexOf("")>-1 && job.html.indexOf("")>-1){
        
    let a = job.html.indexOf("");
    let b = job.html.indexOf("");
    let x = job.html.slice(a,b);
    job.html = job.html.replace(x,"").trim();
  }

*/
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

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