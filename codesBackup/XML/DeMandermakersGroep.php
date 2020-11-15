<?php
$city = trim((string) $j->locations->location->city);
$state = trim((string) $j->locations->location->county);
$country = trim((string) $j->locations->location->country);

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();
$job['temp']=3;
$job['title'] = (String) $j->title; 
//$job['html']  = (String) $j->description;
//$job['jobdesc'] = strip_tags($job["html"]);
if($loc ==""){
  $job['location'] = "head_q";
}else{
  $job['location'] = $loc; 
}
//$job['source_jobtype'] = (String) $j->jobtype;
$job['url'] = (String) $j->link;
//$job['source_empname'] = (String) $j->company;
//$job['source_apply_email'] = (String) $j->contactemail;
//$job['source_salary'] = (String) $j->salary;
$jobdate = trim((String) $j->publication->internet['from']);
$valores = explode('-', $jobdate);  //SE HACE EXPLODE POR ESPACIO
// month/day/year

$month = ucwords(strtolower($valores[1]));

if(strpos($month, "Jan")!== false){$month = "01";}
if(strpos($month, "Feb")!== false){$month = "02";}
if(strpos($month, "Mar")!== false){$month = "03";}
if(strpos($month, "Apr")!== false){$month = "04";}
if(strpos($month, "May")!== false){$month = "05";}
if(strpos($month, "Jun")!== false){$month = "06";}
if(strpos($month, "Jul")!== false){$month = "07";}
if(strpos($month, "Aug")!== false){$month = "08";}
if(strpos($month, "Sep")!== false){$month = "09";}
if(strpos($month, "Oct")!== false){$month = "10";}
if(strpos($month, "Nov")!== false){$month = "11";}
if(strpos($month, "Dec")!== false){$month = "12";}

for($i = 0; $i<= 10;$i++){
  $jobtype = trim((String) $j->categories->category[$i]);
  if($jobtype =="Parttime"){
    $job['source_jobtype'] = $jobtype;
  }else{
    if($jobtype =="Fulltime"){
      $job['source_jobtype'] = $jobtype;
    }
  }
}

$job['dateposted_raw'] = $month."/".$valores[0]."/".$valores[2];
//$job['client_tag'] = (String) $j->category;

//print_r($job['dateposted_raw']."\n");