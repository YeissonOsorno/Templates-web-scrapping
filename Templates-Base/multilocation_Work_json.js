(function() {
    var out = {};
    // var html_jobs = document.querySelectorAll("");
    //  This gives you an HTMLElement object
    if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    //var element = document.querySelector("pre").textContent;
    //msg(element);
    var jobs =  pass_it["json"];
    var returnedJobs = [];    
    if(!jobs){
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.body.children[0].children[0].listItems;
    }
    //msg(typeof(jobs));
    for(i in jobs) {
      var job = {};/*init*/
      // msg("Entre")
      job.title = jobs[i].title.instances[0].text;
      job.title = job.title.split("-").shift();
      job.url = "https://bb.wd3.myworkdayjobs.com" + jobs[i].title.commandLink;
      job.location = jobs[i].subtitles[0].instances[0].text;
      //job.location = job.location;
      job.temp = 5;
      //msg(job.location)
      if(job.location.indexOf("More") > -1){
        var json_desc = JSON.parse(getDescription(job.url));
        var array = json_desc.body.children[1].children[0].children;
        for(var i in array){
          if(array[i].iconName == 'LOCATION'){
            var jobx = {};
            jobx.title = job.title;
            jobx.url = job.url; 
            jobx.location = array[i].imageLabel;
            jobx.temp = job.temp;
            msg(jobx)
            returnedJobs.push(jobx);
          }
        }
      }
      else{
        returnedJobs.push(job);
      }
    }
    //msg(jobs);
    //msg(returnedJobs.length);
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