(function () {
    var out = {};
    var content = document.querySelector("body").textContent;
    var dataJSON = JSON.parse(content);
    var jobs = dataJSON.jobPosts;

    var returnedJobs = [];
    for (var element in jobs) {
        var job = {};
        job.title = jobs[element].jobTitle;
        if (jobs[element].location.length > 0) {
            job.location = jobs[element].location;
        } else {
            job.location = "";
        }
        job.url = "https://hirenetworks.com/jobs/?rpid=" + jobs[element].jobPostIdEnc;
        var dateposted = jobs[element].postDateUtc.slice(0, 10);
        job.dateposted_raw = dateposted;
        job.source_jobtype = jobs[element].jobType;


        var div = document.createElement("div");
        div.id = "result";
        var containerData = document.querySelector("result");
        job.html = dataGet(job.url);

        div.innerHTML = job.html;
        // job.jobdesc = full_html;
        //msg(job.jobdesc);
        job.temp = "1";
        returnedJobs.push(job);
    }


    var selector = "";
    f();
    out["jobs"] = returnedJobs;
    return out;
})();
var f = function () {
    all_elems = document.querySelectorAll(selector);
    [].forEach.call(all_elems, function (elemento) {
        elemento.click();
    });
    setTimeout(function () {
        all_elems = document.querySelectorAll(selector);
        if (all_elems.length > 0) f();
    }, 500);
}

function dataGet(urlJob) {
    var url = urlJob;
    var ourData = new XMLHttpRequest();

    ourData.open("GET", url);
    ourData.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            out.iframeSelector = "#compas-jobs-iframe"
            out.iframeWaitFor = "div.job-description"
            var iframe = document.querySelector('#compas-jobs-iframe').contentWindow.document;
            var html = this.responseText;
            var data = iframe.querySelector('div.job-description').textContent.trim();
            msg(data);
            msg(html)
            out.pic = true;
            return data;
        } else {
            out.pic = true;
            out.iframeSelector = "#compas-jobs-iframe"
            out.iframeWaitFor = "div.job-description"
        }
    }
    ourData.send();
}