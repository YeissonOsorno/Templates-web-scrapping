(function () {
    var jobs = [];
    var out = {};
    var counter = 1;//CONTADOR DE LA PAGINACION
    var sum = 0;
    var totalJobs = 0;
    //var seguir = true;//FLAG PARA VALIDAR LA PARADA DE PAGINACION
    var json;
    //var Tken = '=';
    do {
      //DATOS PARA LA CARGA DEL JSON POST
      //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
      var data = {"multilineEnabled":false,"sortingSelection":{"sortBySelectionParam":"3","ascendingSortingOrder":"false"},"fieldData":{"fields":{"KEYWORD":"","LOCATION":""},"valid":true},"filterSelectionParam":{"searchFilterSelections":[{"id":"POSTING_DATE","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]},{"id":"JOB_SCHEDULE","selectedValues":[]}]},"advancedSearchFiltersSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]},{"id":"JOB_NUMBER","selectedValues":[]},{"id":"URGENT_JOB","selectedValues":[]},{"id":"EMPLOYEE_STATUS","selectedValues":[]},{"id":"STUDY_LEVEL","selectedValues":[]},{"id":"WILL_TRAVEL","selectedValues":[]},{"id":"JOB_SHIFT","selectedValues":[]}]},"pageNo":counter};
      //FUNCION AJAX DE JQUERY
      $.ajax({
        url: 'https://ual-pro.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=46100014529', //URL DEL JSON 
        headers: {
          "Content-Type": "application/json;charset=UTF-8" ,//HEADERS
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "tz": "GMT-05:00",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 ",
          "Content-Type": "application/json",
          "Origin": "https://ual-pro.taleo.net",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Referer": "https://ual-pro.taleo.net/careersection/10550/jobsearch.ftl?lang=en",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "es-419,es;q=0.9"
      
              },
              type: 'POST', //TIPO DE PETICION
              data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
              dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
              async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
              success: function (result) { //FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
                  json = result.requisitionList; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
                  totalJobs = result.pagingData.totalCount;
                
                  //SE PREGUNTA POR LA LONGITUD DEL ARRAY DE LOS JOBS, PARA DETENER LA PAGINACION
                
                 /* if (stop_pag.length < 1) {
                      seguir = false;
                      msg(`---> FINAL DE PAGINACIÓN`);
                  }*/
                
                  //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
                  for (var i in json) {
                      var job = {};
                      job.title = json[i].column[0].split('-').shift();
                      //job.url = json[i].;
                      job.url = `https://ual-pro.taleo.net/careersection/10550/jobdetail.ftl?job=${json[i].jobId}`;
                      job.location = json[i].column[0].split('-').pop();
                      job.dateposted_raw = json[i].column[1];
                      //job.logo = json[i].;
                      //job.source_apply_email = json[i].;
                      //job.source_empname = json[i].;
                      //job.source_jobtype = json[i].;
                      //job.source_salary = json[i].;
                      //job.html= json[i].;
                      //job.jobdesc = job.html;;
                      job.temp = 1;
                      jobs.push(job);
                  }
                  //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
                  counter += 1;
                    sum +=25;
                  msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
              },
              error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
                  msg(error);
              }
          });
      } while (sum <= totalJobs);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
      out["jobs"] = jobs;
      return out;
  })();