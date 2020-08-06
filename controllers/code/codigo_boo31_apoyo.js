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

// Para validar la existencia del selector. Si no existe habrá error de selector. 

var check_location = document.querySelector('selectorDeLaLocacion') !== null;
if(check_location){
    job.location = document.querySelector('selectorDeLaLocacion').textContent.trim();
}else{
    job.location = ""; // Cualquiera que sea su head office entre las comillas dobles 
}

// Para validar la existencia del empane. Si no existe habrá error de selector. 
var check_empname = document.querySelector('selectorDelEmpname') !== null;
if(check_empname){
    job.source_empname = document.querySelector('selectorDelEmpname').textContent.trim();
}


// Extract Location
for(const a of document.querySelectorAll('div')){
    const text = a.textContent.trim();
    if(text.search(/Lieu/i) > -1){
        job.location = a.textContent.split(':').pop().trim();
        job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
      
        if(job.location.search(/AIX-EN-PROVENCE|SOPHIA-ANTIPOLIS|PARIS|MARSEILLE|NICE|TOULON/i)>-1 && job.location.search(",")==-1 && job.location.search(", France")==-1){
     
            let city    = job.location;
            let country = "France";
            
            let loc = "";
            let array_loc = Array();

            if(city) array_loc.push(city);
            if(country) array_loc.push(country);
            
            if(array_loc.length) loc = array_loc.join(", ");

            job.location = loc;    
        }   
    }
    // else{job.location = "Aix en provence, France"; /* HQ's location */ }
  }


  // valida si un elemento existe en el DOM 
  var check     = document.querySelector('selector_a_validar') != null;
  if(check){job.dateclosed = getDateFormat(document.querySelector('selector_a_extraer').textContent.trim()," ",0,1,2); }