<?php
$html = (String) $j->content;
$city = trim((string) $j->city);
$country = trim((string) $j->country);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

 if(strlen(trim((String)$html)) > 200){
  
$job=array();
$job['title'] = trim((String) $j->title);
$job['location'] = $loc;
if(strpos($job['location'], "Ausbildungsstart")!==false){$job['location'] = "Wuppertal, Deutschland";}
if(strpos($job['location'], "Initiativ")!==false){$job['location'] = "Wuppertal, Deutschland";}

$job['url'] = trim((String) $j->url);
$job['source_empname'] = trim((String) $j->company);

//$job['html'] = preg_replace('/\.|:/','.<br>',$job['html']);
//$html = preg_split('/deine Bewerbung:/',$job['html']);
//if(is_array($html)) $job['html'] = $html[0];
$job['html']  = $html;
if(strpos($job['html'], "Ihre Aufgaben:")!==false){
  $htmlremoveBefore = preg_split('/Ihre Aufgaben:/',$job['html']);
  if(is_array($htmlremoveBefore)) $job['html'] = 'Ihre Aufgaben:'.$htmlremoveBefore[1];
}else if(strpos($job['html'], "Ihre Aufgaben")!==false){
  $htmlremoveBefore = preg_split('/Ihre Aufgaben/',$job['html']);
  if(is_array($htmlremoveBefore)) $job['html'] = 'Ihre Aufgaben'.$htmlremoveBefore[1];
}
if(strpos($job['html'], "Ihr Profil:")!==false){
  $htmlremoveBefore = preg_split('/Ihr Profil:/',$job['html']);
  if(is_array($htmlremoveBefore)) $job['html'] = 'Ihr Profil:'.$htmlremoveBefore[1];
}
if(strpos($job['html'], "Das bringen Sie mit")!==false){
  $htmlremoveBefore = preg_split('/Das bringen Sie mit/',$job['html']);
  if(is_array($htmlremoveBefore)) $job['html'] = 'Das bringen Sie mit'.$htmlremoveBefore[1];
}
if(strpos($job['html'], "Wir freuen uns auf Ihre Bewerbung")!==false){
  $htmlremoveAfter = preg_split('/Wir freuen uns auf Ihre Bewerbung/',$job['html']);
  if(is_array($htmlremoveAfter)) $job['html'] = $htmlremoveAfter[0];
}
if(strpos($job['html'], "Ihre Bewerbung")!==false){
  $htmlremoveAfter = preg_split('/Ihre Bewerbung/',$job['html']);
  if(is_array($htmlremoveAfter)) $job['html'] = $htmlremoveAfter[0];
}
$job['jobdesc'] = strip_tags($job["html"]);
$job['temp']=7896;
$id = trim((String) $j->id);  
//$job['jobid'] = md5($job['title'].$job['location'].$job['source_empname'].$job['html'].$job['jobdesc'].$job['temp'].$id);
$job['jobid'] = md5($job['title'].$job['location'].$job['source_empname'].$job['temp'].$id);
  
 }