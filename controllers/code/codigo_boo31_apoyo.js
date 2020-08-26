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

  //Limpia titulos
    job.title = job.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
    job.title = job.title.split("$").shift().trim();
    job.title = job.title.replace(/[0-9]/g,'').trim();
    let lastCharTitle = job.title.substr(job.title.length -1);
    if(lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "(" ){job.title = job.title.slice(0,-1).trim();}

    job.title = job.title.replace(/part time/i,"").trim();
    job.title = job.title.replace(/part-time/i,"").trim();
    job.title = job.title.replace(/full time/i,"").trim();
    job.title = job.title.replace(/full-time/i,"").trim();
    job.title = job.title.replace("()","").trim();


    // Funcion para validar si existe un selector
    function check(selector){
        if(document.querySelector(selector))
            return true;
        else
            return false
    }

    //dsgd
    function TimeoutCLick(){
        setTimeout(function(){ 
          var selector = 'button[class="uk-border-circle"]';
          if(document.querySelector(selector)){
            document.querySelector(selector).click();
          }
        }, 3000);
      }

//Asignar headquarter
if(job.location.indexOf(",")==-1 && job.location.indexOf("CH")==-1){    
    var city    = job.location;
    var country = 'Switzerland';

    var loc = "";
    var array_loc = Array();

    if(city) array_loc.push(city);
    if(country) array_loc.push(country);

    if(array_loc.length) loc = array_loc.join(", ");
    jobx.location = loc;
  }

//Replace clean by
job.html = job.html.replace(/<div>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>|<h7>/g,"<p>");
job.html = job.html.replace(/<\/div>|<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>|<\/h7>/g,"</p>");

//Split by viñet
job.html = job.html.split(/*/g,"<br>*");