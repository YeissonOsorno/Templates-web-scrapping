(function() {
    var out = {};
    var job = {};
  
    var selector = "div.job-details";
  
    var full_html = $(selector);
  
    //---------INFO-------------------------------------
  
    var html_2 = $(selector).text(); 
  
  
    //if(html_2.toLowerCase().indexOf("part time")>-1){job.source_jobtype = "Part-Time";}
    //if(html_2.toLowerCase().indexOf("part-time")>-1){job.source_jobtype = "Part-Time";}
    //if(html_2.toLowerCase().indexOf("full time")>-1){job.source_jobtype = "Full-Time";}
    //if(html_2.toLowerCase().indexOf("full-time")>-1){job.source_jobtype = "Full-Time";}
  
    // job.location           = $("").text().trim();
    //job.source_jobtype     = $("li.det-level-2.clearfix:contains(Employee Type:)").text().split(":").pop().trim();
    // job.source_empname     = $("").text().trim();
    // job.logo               = $("").attr("src");
    // job.source_salary      = $("").text().trim();
    // job.dateclosed_raw     = $("").text().trim();
  
    /*----------DATE-POSTED-----------------------------
  
        var datum = $("").text().trim();
            datum = datum.trim();
  
            var cut = "";
  
        var day   =  datum.split(cut)[0];
        var month =  datum.split(cut)[1];
        var year  =  datum.split(cut)[2];
  
        job.dateposted_raw  = month +"/"+  day +"/"+ year;
  
        /*-------------------------------------------------*/
  
    /*
       if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
       job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
       */
  
    //---------REMOVE---------------------------------------
  
    full_html.find('a').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
    full_html.find('style, script').remove().end().html();
  
    //full_html.find("h1").remove().end().html();
  
    full_html.find("p:contains(POSTING DATE:)").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
  
    //full_html.find("").remove().end().html();
  
    //----------------------------------------------------- 
  
  
    var full_html_text = full_html.text();
  
    //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
    if(full_html_text.trim().length < 200){
  
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
  
  
    }else{
  
      var full_html = full_html.html();
  
      job.html = full_html.trim();
  
      job.html = removeTextBefore(job.html, "Key Responsibilities:", false);
      job.html = removeTextBefore(job.html, "Description", false);
  
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
      //  job.html = full_html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  
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
  