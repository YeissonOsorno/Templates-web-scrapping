(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.jobs-list > div:not(:first-child)");
    var jobs = [];
    var description ;
    var url ;
    for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        if (typeof pass_it == "undefined") pass_it = {};
        if (typeof msg == "undefined") msg = console.log;


        if (!pass_it["description"]) {
            out["pass_it"] = {
                "description": description,
                "url" : url
            };
        } else {
            out["pass_it"] = pass_it;
        }
        var job = {};
        var elem = html_jobs[x];

        job.title = elem.querySelector(" div:first-child span").textContent.trim();
        job.location = elem.querySelector("div.jobs-list > div:not(:first-child) div:nth-child(2) span").textContent.trim();
        
        // var request = dataDescription();
        // job.html =  request;
        var wasClicked = elem.querySelector("div:first-child span");
        if(!wasClicked.click()){
            document.querySelector("div:first-child span").click();
            var request = setTimeout(function(){
                var full_html =  document.querySelector("div.job-description").textContent;
                var dataUrl= document.querySelector('#job .job-url a').href;
                out["pass_it"]["url"] = dataUrl;
                out["pass_it"]["description"] = full_html;
                document.querySelector('.job-actions-back button').click();
            },1500);
            request;
            job.html = out["pass_it"]["description"];
            job.url = out["pass_it"]["url"];
        }else{
            console.log('Hmmm');
        }
        
        
        out["pass_it"]["description"]= "";
        out["pass_it"]["url"]= "";



        
        
          
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
        out["jobs"]= jobs;
        return out;
        
    } 

    
    
})();
function dataDescription(){
    document.querySelector(" div:first-child span").click();
    var selector = "div.job-description";
    var full_html =  document.querySelector(selector);
    var data = full_html;
    return data;
}