var array = job.location.split(",");
for(var i = 0; i < array.length; i++) {
  var jobx={};
  jobx.title = job.title;
  jobx.url = job.url;
  jobx.location = array[i];
  jobx.temp = job.temp;
  jobs.push(jobx);
}
