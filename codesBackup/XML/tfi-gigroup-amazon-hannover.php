// Empcode : tfi-gigroup-amazon-hannover
// ScanID : 180254

/*
* Comentarios
[02/07/2020]
Empcode was inactivated by request ticket #52409
They ask to index the following jobs:"4111465","1483189","8514162","9831731","4929546","4686433","2005143","6100216" 
 "7294441","8238192"
*/
<?php 
$refid = trim((string) $j->internal->referenceid);

if(strpos($refid, '4111465')!==false ||
   strpos($refid, '1483189')!==false ||
   strpos($refid, '8514162')!==false ||
   strpos($refid, '9831731')!==false ||
   strpos($refid, '4929546')!==false ||
   strpos($refid, '4686433')!==false ||
   strpos($refid, '2005143')!==false ||
   strpos($refid, '6100216')!==false ||
   strpos($refid, '7294441')!==false ||
   strpos($refid, '8238192')!==false
  /*
   strpos($refid, '4918054')!==false ||
   strpos($refid, '7537449')!==false ||
   strpos($refid, '7677489')!==false ||
   strpos($refid, '638054')!==false ||
   strpos($refid, '4880457')!==false ||
   strpos($refid, '5395630')!==false ||
   strpos($refid, '3573711')!==false ||
   strpos($refid, '1451790')!==false ||
   strpos($refid, '2048139')!==false ||
   strpos($refid, '702274')!==false ||
   strpos($refid, '2617128')!==false ||
   strpos($refid, '9510756')!==false ||
   strpos($refid, '1720784')!==false ||
   strpos($refid, '9822023')!==false ||
   strpos($refid, '880248')!==false ||
   strpos($refid, '5074525')!==false ||
   strpos($refid, '7972757')!==false ||
   strpos($refid, '7985110')!==false ||
   strpos($refid, '5371060')!==false ||
   strpos($refid, '7120830')!==false ||
   strpos($refid, '1469295')!==false ||
   strpos($refid, '4928506')!==false */){

  $city = trim((string) $j->city);
  $country = trim((string) $j->country);

  $arrloc=array();
  if($city) $arrloc[] = $city;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);

  $job=array();
  $job['title'] = trim((String) $j->title);
  $job['location'] = $loc;
  $job['url'] = trim((String) $j->url);
  $job['source_empname'] = trim((String) $j->company);
  $job['html'] = (String) $j->content;
  $job['jobdesc'] = $job['html'];
  $job['temp']=1;
  /*
  $id = trim((string) $j->id);
  $group = trim((string) $j->internal->group);
  $data = $id." - ".$group;
  print_r($data);*/

}

?>