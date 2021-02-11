/* Extract */
(function() {
    var jobs = [];
    var out = {};
    var cont = 1;
    var limit;
    do {
        if (typeof msg == "undefined") msg = console.log;

        var data = 'pr=' + cont + '&in_iframe=1&schemaId=&o=';

        $.ajax({
            // Change Url taking current url until the word "?pr="
            url: 'https://careers-ncp.icims.com/jobs/search?pr=' + cont + '&in_iframe=1&schemaId=&o=', // 1) url
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "content-type": "text/html;charset=UTF-8" // 2) headers
            },
            type: 'GET', // 3) tipo
            dataType: "html", // 4) data que retorna
            data: data,
            async: false,
            success: function(result) {
                // Result in String is passed to new element html
                var html = document.createElement("html");
                html.innerHTML = result.trim();

                // We capture the values
                var html_jobs = html.querySelectorAll("div.iCIMS_JobsTable>div.row");
                // Example "Search Results Page 2 of 5"  | we take value after the word "of"
                limit = Number(html.querySelector('h2.iCIMS_SubHeader_Jobs').textContent.split('of').pop().trim())
                msg('\x1b[45m Limit ' + Number(html.querySelector('h2.iCIMS_SubHeader_Jobs').textContent.split('of').pop().trim()))

                for (var x in html_jobs) {
                    if (typeof html_jobs[x] == "function") continue;
                    if (typeof html_jobs[x] == "number") continue;
                    var elem = html_jobs[x];

                    var loc = elem.querySelector('div[class="col-xs-6 header left"]').textContent.trim().split("|");
                    loc.forEach(function(element) {
                        var job = {};

                        job.title = elem.querySelector("a").textContent.trim();
                        job.url = elem.querySelector("a").href.trim() + "&mode=job&iis=Neuvoo";

                        job.location = element.trim();
                        job.location = job.location.split('-').reverse().join().replace(/,/gi, ', ').trim();
                        if (job.location.indexOf('Virtual Office') > -1) job.location = "HeadQuarter_here";

                        //Extract Reqid
                        for (let item of elem.querySelectorAll('div[role="list"]>dl')) {
                            if (item.textContent.search('ID') > -1) {
                                job.reqid = item.textContent.split('ID').pop().trim();
                            }
                        }
                        // let date = elem.querySelector("").textContent.trim();
                        //job.dateposted_raw = dateAgo(date, " ", 0,1)
                        //job.logo = elem.querySelector("").getAttribute("src").trim();
                        //job.source_apply_email = elem.querySelector("").textContent.trim();
                        //job.source_empname = elem.querySelector("").textContent.trim();
                        //job.source_jobtype = elem.querySelector("").textContent.trim();
                        //job.source_salary = elem.querySelector("").textContent.trim();
                        job.temp = 1;
                        jobs.push(job);
                    }, elem);
                }
                cont++;
            },
            error: function(error) {
                msg(error);
            }
        });
    } while (cont < limit);

    out["jobs"] = jobs;
    return out;
})();

function dateAgo(text, char_separator, value_DWMY, position_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_DWMY] !== 'undefined') {
        var Day_Week_Month_Year = text.split(char_separator)[position_DWMY]
    } else { var Day_Week_Month_Year = text.split(char_separator)[text.split(char_separator).length - 1] };
    var date_Now = new Date(); //declaro un objeto tipo fecha
    var nDays = 0;
    if (Day_Week_Month_Year.toUpperCase().indexOf('TODAY') > -1 || Day_Week_Month_Year.toUpperCase().indexOf('HOUR') > -1) { nDays = 0; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
    if (Day_Week_Month_Year.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
    var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date); //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var day = datePosted.getDate(); //devuelve el numero del dia del mes.
    var month = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var year = datePosted.getFullYear().toString(); //devuelve el año.
    if (day < 10) { day = '0' + day.toString().trim(); } else { day = day.toString().trim(); }
    /*Obtengo mes*/
    if (month < 10) { month = '0' + month.toString(); } else { month = month.toString(); }
    dateJob = month + '/' + day + '/' + year;
    return dateJob;
}

/* Before Job Description */
(function() {
    var out = {};
    out.waitFor = "#icims_content_iframe";
    out.waitFor = "div.iCIMS_MainWrapper";
    return out;
})();

/* Job description */

(function() {
    var out = {};
    //IFRAME
    var idIframe = "#icims_content_iframe";
    var myIframe = document.querySelector(idIframe).contentWindow.document;

    var job = {};
    var selector = "div.iCIMS_MainWrapper"; // donde está la descripción

    job.html = $(selector, myIframe).html(); //con iframe
    if (typeof job.html == 'undefined') {
        job.html = "";
    }



    job.source_salary = $(selector, myIframe).find("p:contains(PAY)").text().replace("PAY", "").split(":").pop().trim();
    job.source_jobtype = $(selector, myIframe).find("dl:contains(Type)").text().replace("Type", "").split(":").pop().trim();

    job.html = $("<div>" + job.html + "</div>").find("div.alert").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("div.iCIMS_JobOptions").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("div.iCIMS_PageFooter").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("div.iCIMS_Navigation").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("div.iCIMS_Logo").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("div.iCIMS_profilePicture").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("a,div.container-fluid.iCIMS_JobsTable,div.iCIMS_TopHeader").remove().end().html();
    job.html = $("<div>" + job.html + "</div>").find("p:contains(TITLE),p:contains(PAY),p:contains(LOCATION)").remove().end().html();


    // job.html = job.html.replace("","");

    /*
    if(job.html.indexOf("More information about this job")>-1){
    job.html = removeTextBefore(job.html, "More information about this job", true);
      }
    */
    job.html = job.html.split("Options").shift();
    job.html = cleanHTML(job.html);
    job.jobdesc = job.html;


    out["job"] = job;
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