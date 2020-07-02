// Empcode : tfi-gigroup-luxury 
// ScanID : 178785
/*
    comentarios
    https://prnt.sc/p18g22 index jobs with tag "segment" equal to "cus-gi-mid" and  tag "group" contains F&L

make a location expansion for the jobs located currently in Metzingen, for the following cities:"Reutlingen","Nürtingen"

make a location expansion for the jobs located currently in Metzingen, for the following cities:"Karlsfeld","Germering","Poing","Taufkirchen","Garching"
*/
 <?php 
 
 //Datos de excepciones se obtienen de arreglo $exceptions definido en feed manager que a su vez obtiene sus valores para este empcode desde:
//http://beta.neuvoo.com/xml-spiders/services/get-feed-exception.php?empcode=tfi-gigroup-luxury
//DASH https://neuvoo.ca/services/dashboard/tv/01-servers/feed-matrix.php?empcodes=tfi-gigroup-luxury
//Manejo de Excepciones en http://beta.neuvoo.com/xml-spiders/view/manage-exceptions.php?id=178785


$group = trim((string) $j->internal->group);
$segment = trim((string) $j->segment);

if($segment==="cus-gi-mid" &&
   strpos(strtoupper($group), 'F&L')!==false){

  $city = trim((string) $j->city);
  $country = trim((string) $j->country);

  $arrloc=array();
  if($city) $arrloc[] = $city;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);
  
  if(strpos($loc, "Metzingen, Deutschland")!== false){
  	$loc = $loc."/Reutlingen, Deutschland/Nürtingen, Deutschland";
  
  }
  
  if(strpos($loc, "München, Deutschland")!== false){
  	$loc = $loc."/Karlsfeld, Deutschland/Germering, 82110, Deutschland/Poing, Deutschland/Taufkirchen, Deutschland/Garching, 85748, Deutschland";
  
  }

  $job=array();
  $job['title'] = trim((String) $j->title);
  $job['location'] = $loc;
  $multilocation = "/";
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