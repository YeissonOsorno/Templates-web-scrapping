<?php
function getDateFormat($date){
    $jobdate = $date;
    $valores = explode(' ', $jobdate);  
    $month = $valores[2];
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

    $jobdate = $month."/".$valores[1]."/".$valores[3];
    return $jobdate;
}

/*
$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);
*/
$job=array();

$job['temp']=1;
$job['title'] = (String) $j->title; 
$job['location'] = "Gorinchem, Zuid-Holland"; 
$job['url'] = (String) $j->link;
$job['source_empname'] = (String) $j->employer;	
$dateposted_raw = trim((String) $j->pubDate);
$dateclosed_raw = trim((String) $j->expiryDate);
$job['dateposted_raw'] = getDateFormat($dateposted_raw)
$job['dateclosed_raw'] = getDateFormat($dateclosed_raw);

print_r($job['dateposted_raw']."\n"."Dateclosed : ".$job['dateclosed_raw']);
