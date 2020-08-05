// Replace (),[],<> in location
job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();

//Reemplazar locacion del titulo
if(job.location.indexOf(",")>-1){
    let city = job.location.split(",")[0].trim();
    var preClean = job.title.split(city).shift().trim();
    if(preClean.length > 10){
        job.title = job.title.split(city).shift().trim();
        let lastChar = job.title.substr(job.title.length -1);
        if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
            job.title = job.title.slice(0,-1);
        }
        
    }else{
        job.title = job.title.replace(city,"").trim();
    }

} 
