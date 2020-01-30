boo.start();

//Funcion para abrir el jobsiteurl
boo.then(function() {
  boo.open(boo.out.url);
  boo.pushThen(['wait-for-page-load']);
}, "go-to-page");

//funcion para esperar por la informacion de la pagina
boo.saveThen(function() {
  // boo.waitFor
  boo.pushThen(['extract']);
},"wait-for-page-load");

//Funcion para extraer los jobs
boo.saveThen(function() {
  //html = this.takeHTML();
  var json = JSON.parse(this.getPageContent());
  jobs = json.annunci;
  //Echo # of page and add +1 to current page counter
  boo.msg("Starting page: "+(++boo.out.numpage));

  //create page object -- pagejobs => array , have_next_page => false , nextpage => currentpage +1
  page = {pagejobs:[], have_next_page: false, nextpage: boo.out.numpage + 1};

  /*extract-start*/
  //var remap = {};
  //$("",html).each(function( index ) {/*loop-start*/
  //var job = {};/*init*/

  // job.title = $(this).find("").text();
  // job.location = $(this).find("").text();
  // job.location = boo.cleanLoc(job.location, '', remap); 
  // job.multilocation = "";
  // job.url = $(this).find("").attr("href");
  // job.logo = $(this).find("").attr("src");
  // job.source_apply_email = $(this).find("").text();
  // job.source_empname = $(this).find("").text();
  // job.source_jobtype = $(this).find("").text();
  // job.source_salary = $(this).find("").text();
  /*	job.temp = 1;*/

  for(i in jobs){
    var job = {};

    job.title = jobs[i].titolo;
    job.location = jobs[i].localita + " ," +jobs[i].provincia;
    job.url = "http://"+ jobs[i].link+"?utm_source=neuvoo";
    job.html = "<p>"+jobs[i].descrizione.split("Luogo di lavoro")[0]+"</p><br><p>Requisiti</p><br><p>Titolo di studio: "+jobs[i].requisito_titolo_studio_1+"</p>";
    job.html = boo.cleanHTML(job.html);
    job.temp = "201810";
    page.pagejobs.push(job);
  }



  /*	
	});*//*loop-end*/
  /*extract-end*/

  //Echo # of jobs found
  boo.msg("Jobs found: "+page.pagejobs.length);
  //Send jobs to Ghost Process
  boo.send_jobs(page.pagejobs);	

  //	boo.pushThen(['have-next-page']);
}, "extract");

boo.saveThen(function() {
  var have_next_page = false;

  /* Si existe el elemento
	if($("", html).length > 0){
    	have_next_page = true;    
    } 
    */

  /* PaginaciÃ³n por nÃºmeros
    $("", html).each(function(){
        if($(this).text().trim() == page.nextpage){
            have_next_page = true;
        }
    });
	*/

  if(have_next_page) boo.pushThen(['go-to-next-page']);
}, "have-next-page"); 

boo.saveThen(function() {
  /*Haciendo click en un elemento
	boo.clickLabel(page.nextpage,'a');
	boo.pushThen(['wait-for-page-load']);
	*/

  /* Abriendo un link en la pÃ¡gina
	boo.multilink_set({urls:[""]});
	boo.multilink_open('wait-for-page-load');
	*/
}, "go-to-next-page");

boo.run();