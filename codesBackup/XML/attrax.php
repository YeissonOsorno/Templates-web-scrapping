$city = trim((string) $j->locationfreetext);
//$country = trim((string) $j->country); //no se extrae country porque en todos es UK y hay jobs que no son de UK
    
$arrloc=array();
if($city) $arrloc[] = $city;
//if($country) $arrloc[] = $country; 
$loc = implode(", ", $arrloc);

$job=array();

$job['title'] = trim((String) $j->title);
$job['location'] = $loc;
$job['source_empname'] = trim((String) $j->company);
$job['source_salary'] = trim((String) $j->salary);
$job['source_jobtype'] = trim((String) $j->jobtype);
$job['dateposted_raw'] = trim((String) $j->date);
$job['url'] = trim((String) $j->url);

$job['html'] = (String) $j->description;
$job['jobdesc'] = strip_tags($job["html"]);
print_r($job); 
$job['temp']=789;

// Jobsite -- http://jobfeed.service.4matnetworks.com/api/indeed/v1/apikey/94B837CF-D858-4C54-B331-84F436E0D0E0/enviTypeId/1/siteid/249/