boo.start(boo.out.url);

boo.then(function() {
  //lets take a picture of the current page and save its html
  //this.pic();
  var html = this.getHTML();
  //Echo # of page and add +1 to current page counter
  this.msg("Starting page: "+(++this.out.numpage));

  //create page object -- pagejobs => array , have_next_page => false , nextpage => currentpage +1
  var page = {pagejobs:[], have_next_page: false, nextpage: this.out.numpage + 1};

  /*extract-start*/
  //var remap = {};
  html = $.parseXML( html );
  $("job",html).each(function( index ) {/*loop-start*/
    var job = {};/*init*/

    job.title = $(this).find("name").text().trim();
    var source_empname = $(this).find("company").text().trim();
    job.source_empname =  (source_empname!="" && source_empname.indexOf("Confidencial")==-1 
                           && source_empname.indexOf("CONFIDENCIAL")==-1 && source_empname.indexOf("confidencial")==-1
                           && source_empname.indexOf("Importante")==-1 && source_empname.indexOf("importante")==-1 
                           && source_empname.indexOf("IMPORTANTE")==-1 && source_empname.indexOf("contenido reservado")==-1
                           && source_empname.indexOf("Contenido Reservado")==-1 && source_empname.indexOf("Confidential")==-1
                           && source_empname.indexOf("CONTENIDO RESERVADO")==-1 && source_empname.indexOf("Out Helping")==-1
                           && source_empname.indexOf("OUT HELPING")==-1 && source_empname.indexOf("out helping")==-1)   ? source_empname : "Full Empleo";

    var empname2 = job.source_empname.toUpperCase();
    if (empname2.indexOf('HOLIDAY INN') > -1) {job.source_empname ="";}
    if (job.source_empname.indexOf('TRADECO INFRAESTRUCTURA') > -1) {job.title = '';}
    job.location = $(this).find("region").text().trim()+", Mexico";
    if(job.location.indexOf("Aguascalientes")!==-1){
      job.location = "Mexito City, Mexico"; 
    }
    if(job.location.indexOf("Apodaca")!==-1){
      job.location = "Mexito City, Mexico"; 
    }
    if(job.location.indexOf("Chimalhuacán")!==-1){
      job.location = "Mexito City, Mexico"; 
    }
    //job.location = boo.cleanLoc(job.location,country,remap);
    job.url = $(this).find("link").text().trim();


    job.html = $(this).find("description").text();	
    job.html = job.html.split("https:").shift();
    job.html = job.html.split(". ").join(".<br>");

    job.html = boo.cleanHTML(job.html);
    job.html = job.html.split("Funciones Generales:").join("<br>Funciones Generales:<br>");
    job.html = job.html.split("Sueldo:").join("<br>Sueldo:<br>");
    job.html = job.html.split("Conocimientos:").join("<br>Conocimientos:<br>");
    job.html = job.html.split("Experiencia:").join("<br>Experiencia:<br>");
    job.html = job.html.split("Edad Minima:").join("<br>Edad Minima:<br>");
    job.html = job.html.split("Estado civil:").join("<br>Estado civil:<br>");
    job.html = job.html.split("Nivel de estudios:").join("<br>Nivel de estudios:<br>");
    job.html = job.html.split("Ubicación del empleo:").join("<br>Ubicación del empleo:<br>");
    job.html = job.html.split("CONOCIMIENTOS:").join("<br>CONOCIMIENTOS:<br>");
    job.html = job.html.split("Carrera:").join("<br>Carrera:<br>");
    job.html = job.html.split("REQUISITOS").join("<br>REQUISITOS<br>");
    job.html = job.html.split("EXCELENTE PRESENTACIÓN").join("<br>EXCELENTE PRESENTACIÓN<br>");
    job.jobdesc = $("<div>"+job.html+"</div>").text();
    if (job.source_empname.indexOf('CROWNE PLAZA') > -1 || job.source_empname.toUpperCase().indexOf("TECMA")>-1) {job.title = '';}


    job.temp = "abr";
    if(job.source_empname.indexOf("Alévo")==-1 && job.source_empname.indexOf("Alevo")==-1)
      if(job.source_empname.toUpperCase().indexOf("RANDSTAD") == -1 && job.source_empname.indexOf("Canguroencasa")==-1
         && job.location.indexOf("México") == -1  
         && job.source_empname.toUpperCase().indexOf("UBER")===-1 && 
         job.source_empname.toUpperCase().indexOf("FASTER")===-1 && 
         job.source_empname.toUpperCase().indexOf("LEROY MERLIN")===-1
         && job.source_empname.toUpperCase().indexOf("BOYCOR")==-1
         && job.source_empname.toUpperCase().indexOf("TRADECO INFRAESTRUCTURA")===-1
         && (job.source_empname.toLowerCase().indexOf("crowne plaza")==-1))



        if (job.title.length > 0 && job.location.length > 0 && job.source_empname.length > 0) {
          page.pagejobs.push(job);
        }
    if (job.url.indexOf("careersearch") >-1 &&
        job.url.indexOf("ihg") >-1 &&
        job.url.indexOf("com") >-1 &&
        job.url.indexOf("en") >-1 &&
        job.url.indexOf("holiday") >-1 &&
        job.url.indexOf("inn") >-1 && 
        job.source_empname.toUpperCase().indexOf("IBM")===-1 && 
        job.source_empname.toUpperCase().indexOf("NATIONAL GUARD")===-1 && 
        job.source_empname.toUpperCase().indexOf("MASTERCARD")===-1) {
      boo.msg('No pasan la prueba');
    }else{
      page.pagejobs.push(job);
    }

  });/*loop-end*/
  /*extract-end*/

  //Echo # of jobs found
  this.msg("Jobs found: "+page.pagejobs.length);
  //Send jobs to Ghost Process
  this.send_jobs(page.pagejobs);

  /*check-nextpage-start*//*check-nextpage-end*/

  /*goto-nextpage-start*//*goto-nextpage-end*/

}, "extract");
boo.run();

/*nextpage-func-start*//*nextpage-func-start*/