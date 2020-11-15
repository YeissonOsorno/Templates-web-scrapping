(function() {
    var out = {};
    var jobs = [];
    out.pic = true;
    out.flag = true;
    const payload = {
        method: 'Method_POST_or_GET',
        url: "url_to_API",
        data: "data"
    }
    do{
      doCORSRequest(payload,(result)=>{
        msg('\x1b[32m Success...');   
        const resParsed = JSON.parse(result);
        const json = resParsed.positionOfJobs;
        for(var i = 0; i<json.length; i++) {
              let job = {};
              var elem = json[i];
              job.title = elem.positionOfTitle;
              job.location = elem.positionOfLocation;
              job.url = elem.positionOfUrl;
              job.reqid = elem.positionOfJobid;
              //job.dateposted_raw = elem.positionOfDatePosted;
              //job.dateclosed_raw = elem.positionOfDateClosed;
              //job.source_jobtype = elem.positionOfJobtype;
              //job.source_salary = elem.positionOfSalary;         
              //job.source_empname = elem.positionOfEmpname;
              //job.logo = elem.positionOfLogo;
              //job.source_apply_email = elem.positionOfEmail;
    
              job.temp = "1";
              jobs.push(job);
        }
        out["jobs"]= jobs; 
        out.flag = false;  
        return out;
      });
      return out;
    }while(out.flag)
  
  
  
  })();
function doCORSRequest(paramOptions,UseCallback){
    const urlProxy = "https://cors-scrapper.herokuapp.com/";
    var objectRequest = new XMLHttpRequest();
    objectRequest.open(paramOptions.method,urlProxy + paramOptions.url,false);
    if(/^POST/i.test(paramOptions.method))
        objectRequest.setRequestHeader('Content-Type', 'application/json'); // or application/x-www-form-urlencoded
 
    objectRequest.onreadystatechange = function(){
        if(objectRequest.readyState == 4 && objectRequest.status == 200)
            UseCallback(objectRequest.responseText);          
    }
    objectRequest.send(paramOptions.data);
}