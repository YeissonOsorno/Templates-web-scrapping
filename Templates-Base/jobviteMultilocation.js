(function () {
    var out = {};
    var html_jobs = document.querySelectorAll("table.jv-job-list.jv-search-list>tbody tr");
    var jobs = []; for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("a").textContent.trim();
        job.url = elem.querySelector("a").href.trim();
        job.location = elem.querySelector("td.jv-job-list-location").innerText.trim();
        job.location = job.location.replace("SFO", "San Francisco");
        job.location = job.location.replace("West Coast", "Helena, MN");
        job.temp = 2;
        if (job.location.indexOf('Locations') > -1) {
            msg('\x1b[32m Contain Multi Location');
            var full_html = getDescription(job.url);
            var div = document.createElement("div");
            div.innerHTML = full_html;
            let locations = div.querySelector('p.jv-job-detail-meta').textContent.trim().split('  ').join('/');
            locations = locations.split('/').filter(elem => elem != "");
            locations = locations.join('-').replace(/\n/g, '').trim();
            locations = locations.split('--');
            for (var location of locations) {                
                if (location.indexOf(',-') > -1) {
                    let jobx = {};
                    jobx.title = job.title;
                    jobx.url = job.url;
                    jobx.location = location.replace(',-',',');
                    jobx.temp = job.temp;
                    jobs.push(jobx);
                }
            }


        } else {
            jobs.push(job);
        }
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();


    }

    out["jobs"] = jobs;
    return out;
})();
function getDescription(url) {

    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job

    var response = "";
    xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };

    xhrrequest.send();
    return response;
}