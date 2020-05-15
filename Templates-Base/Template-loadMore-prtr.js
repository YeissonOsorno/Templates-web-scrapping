/*Infinite Pagination*/
(function () {
	var out = {};
  	var selector = 'span[class="num rounded bg-primary text-white p-2 js-num-of-jobs"]';
  	out.waitFor = selector
	if (!document.getElementById('box-tmp')) {
	// Crea un div para darle altura a la pagina
	var ref = document.querySelector('div.listing__jobs.bg-white.js-listing-jobs'); //Selector que contiene los jobs 
	var newEle = document.createElement('div');
	newEle.setAttribute('id', 'box-tmp')
	ref.appendChild(newEle);
	newEle.style.height = '8000px' // para darle altura a la pagina 
	}
	msg(pass_it);
	if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };
	else out["pass_it"] = pass_it;

	out["has_next_page"] = true;
	if (out["pass_it"]["heights"].length > 181) {
		var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 181);
		if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2] && last_three_heights[2] == last_three_heights[3] && last_three_heights[3] == last_three_heights[4] && last_three_heights[4] == last_three_heights[5] && last_three_heights[5] == last_three_heights[6] && last_three_heights[6] == last_three_heights[7] && last_three_heights[7] == last_three_heights[8] && last_three_heights[8] == last_three_heights[9] && last_three_heights[9] == last_three_heights[10] && last_three_heights[10] == last_three_heights[11] && last_three_heights[11] == last_three_heights[12] && last_three_heights[12] == last_three_heights[13] && last_three_heights[13] == last_three_heights[14] && last_three_heights[14] == last_three_heights[15] && last_three_heights[15] == last_three_heights[16]&& last_three_heights[16] == last_three_heights[17]&& last_three_heights[17] == last_three_heights[18]&& last_three_heights[18] == last_three_heights[19]&& last_three_heights[19] == last_three_heights[20]&& last_three_heights[20] == last_three_heights[21]&& last_three_heights[21] == last_three_heights[22]&& last_three_heights[22] == last_three_heights[23]&& last_three_heights[23] == last_three_heights[24]&& last_three_heights[24] == last_three_heights[25]&& last_three_heights[25] == last_three_heights[26]&& last_three_heights[26] == last_three_heights[27]&& last_three_heights[27] == last_three_heights[28]&& last_three_heights[28] == last_three_heights[29]&& last_three_heights[29] == last_three_heights[30]&& last_three_heights[30] == last_three_heights[31]&& last_three_heights[31] == last_three_heights[32]&& last_three_heights[32] == last_three_heights[33]&& last_three_heights[33] == last_three_heights[34]&& last_three_heights[34] == last_three_heights[35]&& last_three_heights[35] == last_three_heights[36]&& last_three_heights[36] == last_three_heights[37]&& last_three_heights[37] == last_three_heights[38]&& last_three_heights[38] == last_three_heights[39]&& last_three_heights[39] == last_three_heights[40]&& last_three_heights[40] == last_three_heights[41]&& last_three_heights[41] == last_three_heights[42]&& last_three_heights[42] == last_three_heights[43]&& last_three_heights[43] == last_three_heights[44]&& last_three_heights[44] == last_three_heights[45]&& last_three_heights[45] == last_three_heights[46]&& last_three_heights[46] == last_three_heights[47]&& last_three_heights[47] == last_three_heights[48]&& last_three_heights[48] == last_three_heights[49]&& last_three_heights[49] == last_three_heights[50]&& last_three_heights[50] == last_three_heights[51]&& last_three_heights[51] == last_three_heights[52]&& last_three_heights[52] == last_three_heights[53]&& last_three_heights[53] == last_three_heights[54]&& last_three_heights[54] == last_three_heights[55]&& last_three_heights[55] == last_three_heights[56]&& last_three_heights[56] == last_three_heights[57] && last_three_heights[57] == last_three_heights[58] && last_three_heights[58] == last_three_heights[59] && last_three_heights[59] == last_three_heights[60] && last_three_heights[60] == last_three_heights[61] && last_three_heights[61] == last_three_heights[62] && last_three_heights[62] == last_three_heights[63] && last_three_heights[63] == last_three_heights[64] && last_three_heights[64] == last_three_heights[65] && last_three_heights[65] == last_three_heights[66] && last_three_heights[66] == last_three_heights[67] && last_three_heights[67] == last_three_heights[68] && last_three_heights[68] == last_three_heights[69] && last_three_heights[69] == last_three_heights[70] && last_three_heights[70] == last_three_heights[71] && last_three_heights[71] == last_three_heights[72] && last_three_heights[72] == last_three_heights[73] && last_three_heights[73] == last_three_heights[74] && last_three_heights[74] == last_three_heights[75] && last_three_heights[75] == last_three_heights[76] && last_three_heights[76] == last_three_heights[77] && last_three_heights[77] == last_three_heights[78] && last_three_heights[78] == last_three_heights[79] && last_three_heights[79] == last_three_heights[80] && last_three_heights[80] == last_three_heights[81] && last_three_heights[81] == last_three_heights[82] && last_three_heights[82] == last_three_heights[83] && last_three_heights[83] == last_three_heights[84] && last_three_heights[84] == last_three_heights[85] && last_three_heights[85] == last_three_heights[86] && last_three_heights[86] == last_three_heights[87] && last_three_heights[87] == last_three_heights[88] && last_three_heights[88] == last_three_heights[89] && last_three_heights[89] == last_three_heights[90] && last_three_heights[90] == last_three_heights[91] && last_three_heights[91] == last_three_heights[92] && last_three_heights[92] == last_three_heights[93] && last_three_heights[93] == last_three_heights[94] && last_three_heights[94] == last_three_heights[95] && last_three_heights[95] == last_three_heights[96] && last_three_heights[96] == last_three_heights[97] && last_three_heights[97] == last_three_heights[98] && last_three_heights[98] == last_three_heights[99] && last_three_heights[99] == last_three_heights[100] && last_three_heights[100] == last_three_heights[101] && last_three_heights[101] == last_three_heights[102] && last_three_heights[102] == last_three_heights[103] && last_three_heights[103] == last_three_heights[104] && last_three_heights[104] == last_three_heights[105] && last_three_heights[105] == last_three_heights[106] && last_three_heights[106] == last_three_heights[107] && last_three_heights[107] == last_three_heights[108] && last_three_heights[108] == last_three_heights[109] && last_three_heights[109] == last_three_heights[110] && last_three_heights[110] == last_three_heights[111] && last_three_heights[111] == last_three_heights[112] && last_three_heights[112] == last_three_heights[113] && last_three_heights[113] == last_three_heights[114] && last_three_heights[114] == last_three_heights[115] && last_three_heights[115] == last_three_heights[116]&& last_three_heights[116] == last_three_heights[117]&& last_three_heights[117] == last_three_heights[118]&& last_three_heights[118] == last_three_heights[119]&& last_three_heights[119] == last_three_heights[120] && last_three_heights[120] == last_three_heights[121]&& last_three_heights[121] == last_three_heights[122]&& last_three_heights[122] == last_three_heights[123]&& last_three_heights[123] == last_three_heights[124]&& last_three_heights[124] == last_three_heights[125]&& last_three_heights[125] == last_three_heights[126]&& last_three_heights[126] == last_three_heights[127]&& last_three_heights[127] == last_three_heights[128]&& last_three_heights[128] == last_three_heights[129]&& last_three_heights[129] == last_three_heights[130]&& last_three_heights[130] == last_three_heights[131]&& last_three_heights[131] == last_three_heights[132]&& last_three_heights[132] == last_three_heights[133]&& last_three_heights[133] == last_three_heights[134]&& last_three_heights[134] == last_three_heights[135]&& last_three_heights[135] == last_three_heights[136]&& last_three_heights[136] == last_three_heights[137]&& last_three_heights[137] == last_three_heights[138]&& last_three_heights[138] == last_three_heights[139]&& last_three_heights[139] == last_three_heights[140] && last_three_heights[140] == last_three_heights[141]&& last_three_heights[141] == last_three_heights[142]&& last_three_heights[142] == last_three_heights[143]&& last_three_heights[143] == last_three_heights[144]&& last_three_heights[144] == last_three_heights[145]&& last_three_heights[145] == last_three_heights[146]&& last_three_heights[146] == last_three_heights[147]&& last_three_heights[147] == last_three_heights[148]&& last_three_heights[148] == last_three_heights[149]&& last_three_heights[149] == last_three_heights[150]&& last_three_heights[150] == last_three_heights[151]&& last_three_heights[151] == last_three_heights[152]&& last_three_heights[152] == last_three_heights[153]&& last_three_heights[153] == last_three_heights[154]&& last_three_heights[154] == last_three_heights[155]&& last_three_heights[155] == last_three_heights[156]&& last_three_heights[156] == last_three_heights[157] && last_three_heights[157] == last_three_heights[158] && last_three_heights[158] == last_three_heights[159] && last_three_heights[159] == last_three_heights[160] && last_three_heights[160] == last_three_heights[161] && last_three_heights[161] == last_three_heights[162] && last_three_heights[162] == last_three_heights[163] && last_three_heights[163] == last_three_heights[164] && last_three_heights[164] == last_three_heights[165] && last_three_heights[165] == last_three_heights[166] && last_three_heights[166] == last_three_heights[167] && last_three_heights[167] == last_three_heights[168] && last_three_heights[168] == last_three_heights[169] && last_three_heights[169] == last_three_heights[170] && last_three_heights[170] == last_three_heights[171] && last_three_heights[171] == last_three_heights[172] && last_three_heights[172] == last_three_heights[173] && last_three_heights[173] == last_three_heights[174] && last_three_heights[174] == last_three_heights[175] && last_three_heights[175] == last_three_heights[176] && last_three_heights[176] == last_three_heights[177] && last_three_heights[177] == last_three_heights[178] && last_three_heights[178] == last_three_heights[179] && last_three_heights[179] == last_three_heights[180])
			out["has_next_page"] = false;
	}
	window.scrollBy(0, document.body.scrollHeight);

	out["wait"] = true;
	out["pic"] = true;
	out["html"] = true;
	out["pass_it"]["heights"].push(document.querySelectorAll('div.listing__jobs.bg-white.js-listing-jobs').length);//Selector de los JOBS
	return out;
})();
/*Expected Jobs*/
(function() {
	var out = {};
    var selector = 'span[class="num rounded bg-primary text-white p-2 js-num-of-jobs"]';
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.trim();
  	//var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs_str;

  	return out;
})();
/*Extract */ 
(function() {
  var out = {};
  var jobs = [];
  var html_jobs = document.querySelectorAll(".job");


  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.location = elem.querySelector("div.job__location.col-12.col-lg-3").textContent.trim();
    if(	job.location =="223/97 Country Complex Tower A Fl.22nd Sanpawut Road Bangna Bangkok" ||job.location =="Rama IV Rd, Khlong Tan, Khlong Toei, Bangkok 10110")
    {
      job.location = "Sanpawut Road Bangna Bangkok";
    }
    if(job.location == "")
    {
      job.location = "Huaykwang, Bangkok";
    }
    var fecha = elem.querySelector("div.job__published-date.row.mb-2 div.col-md-10").textContent.trim().split("-");
    job.dateposted_raw = fecha[1]+'/'+fecha[2]+'/'+fecha[0];
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.dateclosed_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    job.source_jobtype = elem.querySelector("div.job__other-info.col-12.col-lg-3").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  }  

  out["jobs"]= jobs;
  return out;
})();
/*jobDescription*/
(function() {
  var out = {};
  var job = {};
  // var selector = 'div[class="job__description bg-white p-3"]';
  var selector ='article[class="job col-lg-8"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    

  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  //Extract dateposted
  if(job.jobdesc.indexOf('Job published:')>-1)
  {
    job.dateposted_raw = job.jobdesc.split('Job published:').pop().trim();
    job.dateposted_raw = job.dateposted_raw.split('Job ID:').shift().trim()
    job.dateposted_raw = job.dateposted_raw.split('-').reverse().join('/');
  }
  //Extract jobtype
  if(job.jobdesc.indexOf('Emp type:')>-1)
  {
    job.source_jobtype = job.jobdesc.split('Emp type:').pop().trim();
    job.source_jobtype = job.source_jobtype.split('Industry:').shift().trim()
  }
  //Extract salary
  if(job.jobdesc.indexOf('Salary from:')>-1)
  {
    job.source_jobtype = job.jobdesc.split('Salary from:').pop().trim();
    job.source_jobtype = job.source_jobtype.split('Location:').shift().trim()
    job.source_jobtype =job.source_jobtype.replace(/[\n]/g,'').replace(/ /g,'').replace('Salaryto:',' - ');
  }
  job.html = removeTextBefore(job.html, 'Job Description', false);
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  out["job"] = job;
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