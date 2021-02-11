     
    
    
    
      //scanid-- - > 187600
//Jobsite-- - > "https://www.manageengine.com/careers.html";
(function() {​
    var out = {​}​;
    var html_jobs = document.querySelectorAll("section h3");
    var jobs = [];
    for (var x in html_jobs) {​
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {​}​;
        var elem = html_jobs[x];
        job.title = elem.textContent.trim();
        job.url = "https://www.manageengine.com/careers.html";
        job.location = document.querySelector("li.comSubTreeAct").textContent.trim();
        var full_html = document.querySelector('div.container.sec-pTB.clearfix');
        job.html = full_html.innerHTML.trim();
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    }​
    for (var y in jobs) {​
        if (typeof jobs[y] == "function") continue;
        if (typeof jobs[y] == "number") continue;
        var elem = jobs[y];
        var next = jobs[parseInt(y) + 1];
        msg("elem.title " + elem.title);
        elem.html = removeTextBefore(elem.html, elem.title, false);
        if (y < jobs.length - 1) {​
            msg("next---> " + next.title);
            elem.html = removeTextAfter(elem.html, next.title, true);
            elem.html = removeTextAfter(elem.html, 'appreciated.', false);
        }​
    }​
    out["jobs"] = jobs;
    return out;
}​)();
function removeTextBefore(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).pop();
        if (!flag) {​
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }​
    }​
    return newHtml;
}​
function removeTextAfter(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).shift();
        if (!flag) {​
            newHtml = newHtml + "<p>" + text + "</p>";
        }​
    }​
    return newHtml;
}​
//IndexOf(INDEX)
//scanid --->187726
//job site --->http://www.bloomcos.com/careers/career-opportunities/
//ocurrencias, index, iteraciones
(function() {​
    var out = {​}​;
    var html_jobs = document.querySelectorAll("h3 > strong");
    var jobs = [];
    for (var x in html_jobs) {​
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {​}​;
        var elem = html_jobs[x];
        job.title = elem.textContent.trim();
        if (job.title.includes("Bridge Engineer/Project Manager")) {​
            job.title = job.title.split('–').shift().trim();
        }​
        job.url = "http://www.bloomcos.com/careers/career-opportunities/";
        var full_html = document.querySelector('div.active.individual-toggle-section');
        job.html = full_html.innerHTML.trim()
        job.html = removeTextBefore(job.html, job.title, false);
        job.html = removeTextAfter_variacion(job.html, 'For immediate consideration', true, x);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        job.location = job.title.split('–').pop().trim();
        job.title = job.title.split('–').shift().trim();
        job.temp = 1;
        jobs.push(job);
    }​
    out["jobs"] = jobs;
    return out;
}​)();
function removeTextBefore(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).pop();
        if (!flag) {​
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }​
    }​
    return newHtml;
}​
function removeTextAfter(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).shift();
        if (!flag) {​
            newHtml = newHtml + "<p>" + text + "</p>";
        }​
    }​
    return newHtml;
}​
function removeTextAfter_variacion(html, text, flag, index) {​
    var newHtml = html;
    if (newHtml.indexOf(text, index) > -1) {​
        newHtml = newHtml.split(text).shift();
        if (!flag) {​
            newHtml = newHtml + "<p>" + text + "</p>";
        }​
    }​
    return newHtml;
}​
//plantilla yamel 
(function() {​
    var out = {​}​;
    var jobs = [];
    var jobsSelector = '.journal-content-article h2'; //SELECTOR DE LOS JOBS
    $(jobsSelector).each(function(index) {​
        var job = {​}​;
        job.title = $(this).text().replace(/\[.*?\]/g, '').trim();
        job.location = 'localidad';
        job.url = window.location.href;
        // remove selector
        $(this).find('a').remove().end().html();
        $(this).find('input').remove().end().html();
        $(this).find('div.alert').remove().end().html();
        $(this).nextUntil("h2").each(function() {​
            job.html += $(this).html();
        }​);
        $(this).nextUntil("h2").each(function() {​
            job.jobdesc += $(this).text();
        }​);
        //job.html = $(this).html();
        // job.jobdesc = $(this).html();
        job.html = cleanHTML(job.html).replace(/undefined/g, '');
        job.jobdesc = cleanHTML(job.jobdesc).replace(/undefined/g, '');
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextAfter(job.html, "", true);
        job.temp = 1;
        jobs.push(job);
    }​);
    out["pic"] = true;
    out["jobs"] = jobs;
    return out;
}​)();
function removeTextBefore(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).pop();
        if (!flag) {​
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }​
    }​
    return newHtml;
}​
function removeTextAfter(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).shift();
        if (!flag) {​
            newHtml = newHtml + "<p>" + text + "</p>";
        }​
    }​
    return newHtml;
}​
    
    
  
  

