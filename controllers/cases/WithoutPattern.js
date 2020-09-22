(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('strong[data-ada-original-font-size="14"]');
    var jobs = [];
    for (var x in html_jobs) {
      if (typeof html_jobs[x] == "function") continue;
      if (typeof html_jobs[x] == "number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.textContent.trim();
      job.url = window.location.href;
      job.location = "Katy, Texas,US";
      var full_html = document.querySelector('table#bodyTable>tbody>tr>td');
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
    }
    for (var y in jobs) {
      if (typeof jobs[y] == "function") continue;
      if (typeof jobs[y] == "number") continue;
      var elem = jobs[y];
      var next = jobs[parseInt(y) + 1];
      msg("elem.title " + elem.title);
      elem.html = removeTextBefore(elem.html, elem.title, false);
      elem.jobdesc = removeTextBefore(elem.html, elem.title, false);
      if (y < jobs.length - 1) {
        msg("next---> " + next.title);
        elem.html = removeTextAfter(elem.html, next.title, true);
        elem.html = removeTextAfter(elem.html, 'appreciated.', false);
        elem.jobdesc = removeTextAfter(elem.html, next.title, true);
        elem.jobdesc = removeTextAfter(elem.html, 'appreciated.', false);
      }
    }
  
    out["jobs"] = jobs;
    return out;
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
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