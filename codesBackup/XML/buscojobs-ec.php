<?php
//Datos de excepciones se obtienen de arreglo $exceptions definido en feed manager que a su vez obtiene sus valores para este empcode desde:
//http://beta.neuvoo.com/xml-spiders/services/get-feed-exception.php?empcode=buscojobs-ec
//Manejo de Excepciones en http://beta.neuvoo.com/xml-spiders/view/manage-exceptions.php?id=74163

$empname = trim((String) $j->company);

$empnamefound = preg_match('/('.$exceptions['array']['company']['value'].')/ui', $empname);//Match de empnames a excluir: 1 = encontrado; 0 = no encontrado

if($empnamefound===0){

  $city = trim((string) $j->city);
  $region = trim((string) $j->region);
  $country = "Ecuador";

  $arrloc=array();
  if($city) $arrloc[] = $city;
  if($region) $arrloc[] = $region;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);

  $job=array();

  $job['title'] = trim((String) $j->title);
  $job['location'] = $loc;
  $job['source_empname'] = $empname;
  $job['url'] = trim((String) $j->url)."?utm_source=neuvoo&utm_medium=organic&utm_campaign=neuvoo";

  $job['html'] = (String) $j->content;
  $job['jobdesc'] = strip_tags($job["html"]);

  $job['temp']=54;
}