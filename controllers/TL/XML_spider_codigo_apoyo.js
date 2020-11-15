 

//Métodos básicos de PHP para XML spider

// Print

print_r($job['dateposted_raw']."\n");

//Replace

$loc = str_replace("Anywhere, ","", $loc);

//split

if(strpos($job['title'], '–')>-1){
    $htmltmp = explode("–", $job['title']);
    $job['title'] = $htmltmp[0];
  }

if(strpos($job['title'], "/")!== false){
$job['title'] = explode('/', $job['title'])[0];
}


if(strpos($job['location'], '–')>-1){
$htmltmp = explode("–", $job['location']);
$job['location'] = trim((String) $htmltmp[1]) . ", Brasil";
}

// condicional. Si existe la locación "x" la locación es "y". Como funciona el if(job.location.indexOf("")>-1{job.location = "";}) en javaScript 

if(strpos($job['location'], "Attleborough")!==false){$job['location'] = "North Attleborough, MA, United States";}


// // Cuando hay un tag dentro del otro
$job['source_jobtype'] = trim((String) $j->workingTimes->item); 


$city = trim((String) $j->location->city); 

// Filtrado de por fecha

$jobdate = trim((String) $j->date);
$valores = explode(' ', $jobdate);  //SE HACE EXPLODE POR ESPACIO
$jobdate = $valores[2]."/".$valores[1]."/".$valores[3];



// Limpiar etiquetas XML, PHP, HTML
$job['html']  = (String) $j->description;
$job['jobdesc'] = strip_tags($job["html"]);




$desc = trim((string) $j->description);
$desc = explode('stingDondeSeDeseaCortar', $desc)[0];

$job['html']  = $desc;
$job['jobdesc'] = strip_tags($job["html"]);


/////////////////////////////////////////////////////////

// Validación de fecha


$jobdate = trim((String) $j->date);
$valores = explode(' ', $jobdate);  //SE HACE EXPLODE POR ESPACIO
// month/day/year

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


$job['dateposted_raw'] = $jobdate;

print_r($job['dateposted_raw']);



//////////////////////////////////////////

20/2/2020 a 2/20/2020

$jobdate = trim((String) $j->updated);
$valores = explode('.', $jobdate);
$jobdate = $valores[1]."/".$valores[0]."/".$valores[2];
$job['dateposted_raw'] = $jobdate; 


///////////////////////////////////////

// Plantilla base

$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();
$job['temp']=1;
$job['title'] = (String) $j->title; 
$job['html']  = (String) $j->description;
$job['jobdesc'] = strip_tags($job["html"]);
$job['location'] = $loc; 
$job['source_jobtype'] = (String) $j->jobtype;
$job['url'] = (String) $j->url;
$job['source_empname'] = (String) $j->company;
$job['source_apply_email'] = (String) $j->contactemail;
$job['source_salary'] = (String) $j->salary;
$job['dateposted_raw'] = (String) $j->date;
$job['client_tag'] = (String) $j->category;

 //print_r($job['dateposted_raw']."\n");

// Plantilla base 2

$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();

$job['title'] = (String) $j->title; 
$job['url'] = (String) $j->url;
$job['location'] = $loc; 

$job['source_jobtype'] = (String) $j->jobtype;
$job['source_salary'] = (String) $j->salary;

$job['experienced_required'] = (String) $j->experience;

$job['dateposted_raw'] = (String) $j->date;

$job['source_empname'] = (String) $j->company;
$job['source_apply_email'] = (String) $j->contactemail;

$job['html']  = html_entity_decode((String) $j->description);
$job['jobdesc'] = strip_tags($job["html"]);

$job['temp']=1;


 //print_r($job['dateposted_raw']."\n");
//print_r($job);


//////////////////////////////////////////
//Ejemplo
//Si se desea valiar un empname: 

$empname = trim((String) $j->{'company_name'});


if(strpos(strtoupper($empname), 'MOMMY JOBS ONLINE')===false){
  
$city = trim((string) $j->city);
$state = trim((string) $j->state);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
$loc = implode(", ", $arrloc);

$loc = str_replace("Anywhere, ","", $loc); //Replace
  
$job=array();
$job['temp'] = 1;
$job['title'] = trim((String) $j->title);
$job['html']  = (String) $j->description;
$job['jobdesc'] = $job['html'];
$job['location'] = $loc;
  
  
  
$job['url'] = trim((String) $j->link);
$job['source_empname'] = $empname;
  

}

///////////////////////////////////////////////

// Si se desean eliminar varios empnames


$empname = trim((String) $j->company);
$url = trim((String) $j->url);
$title = trim((String) $j->title);

$exceptions = array();
$exceptions['empnames'] = 'UNILIN|PRODICOM|CONTACTCARE|WTBE|Nelipak|ViriCiti|Airborne'; //Cadena de empnames a excluir
$aux = explode("|",$exceptions['empnames']); //Explode de la cadena para luego escapar caracteres especiales
foreach($aux as $e) $exceptions['empnames_quoted'][] = preg_quote($e); //preg_quote coloca barra invertida antes de cada caracter especial
$exceptions['empnames'] = implode("|",$exceptions['empnames_quoted']);//Volvemos a construir la cadena procesada
$exceptions['empnamefound'] = preg_match('/('.$exceptions['empnames'].')/ui', $empname);//Match de empnames a excluir: 1 = encontrado; 0 = no encontrado

if($exceptions['empnamefound']===0 &&
   strpos($url, "3039/2012636")===false && 
   
if(strpos(strtoupper($title), "VACATURE LOOKING")===false){ // Filtrar los títulos que contienen "VACATURE LOOKING"

  $city = trim((string) $j->locations->location->city);
  $country = trim((string) $j->locations->location->country);

  $arrloc=array();
  if($city) $arrloc[] = $city;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);

  $job=array();
  $job['title'] = $title;
  if($loc) $job['location'] = $loc;
  else $job['location'] = 'NL';
  $job['url'] = $url;
  //$job['logo'] = trim((String) $j->logo);
  //$job['source_apply_email'] = trim((String) $j->source_apply_email);
  $job['source_empname'] = $empname;
  $job['source_jobtype'] = trim((String) $j->workingTimes->item);
  //$job['source_salary'] = trim((String) $j->salary);
  $job['html'] = (String) $j->fullDescription;
  $job['jobdesc'] = $job['html'];
  //$job['source_ppc'] = trim((String) $j->cpc);
  //$job['job_pixel'] = trim((String) $j->tracking_url);
  $job['temp']=1234;

}
}


//////////////////////////////


//Datos de excepciones se obtienen de arreglo $exceptions definido en feed manager que a su vez obtiene sus valores para este empcode desde:
//http://beta.neuvoo.com/xml-spiders/services/get-feed-exception.php?empcode=timesjobs
//Manejo de Excepciones en http://beta.neuvoo.com/xml-spiders/view/manage-exceptions.php?id=161666

$loc = trim((string) $j->Location);
$loc = preg_replace('/Other City\(s\) in|Other International Location\(s\)|Others/i','',$loc);
$url = trim((String) $j->URL).'&utm_source=neuvoo';
$empname = trim((String) $j->COMPANYNAME);
$title = trim((String) $j->JOBTITLE);

$empnamefound = preg_match('/('.$exceptions['array']['COMPANYNAME']['value'].')/ui', $empname);//Match de empnames a excluir: 1 = encontrado; 0 = no encontrado
$urlfound = preg_match('/('.$exceptions['array']['URL']['value'].')/ui', $url);//Match de url a excluir: 1 = encontrado; 0 = no encontrado
$titlefound = preg_match('/('.$exceptions['array']['JOBTITLE']['value'].')/ui', $title);//Match de title a excluir: 1 = encontrado; 0 = no encontrado

if($empnamefound===0 &&
   $urlfound === 0 &&
   $titlefound === 0 && $empname!='Boehringer Ingelheim' && $empname!='Boehringer Ingelheim India Pvt Ltd'){

  $job=array();
  $job['title'] = $title;
  $job['title'] = html_entity_decode($job['title'], ENT_QUOTES | ENT_XML1, 'UTF-8');
  $job['location'] = ($loc) ? $loc : 'India';
  $multilocation = "|";
  if(strpos($job['location'], "Other Gulf/Middle East Location(s)")!==false){$job['location'] = "United Arab Emirates";}
  $job['url'] = $url;
  $job['source_empname'] = $empname;
  $job['source_empname'] = html_entity_decode($job['source_empname'], ENT_QUOTES | ENT_XML1, 'UTF-8');
  $job['html'] = (String) $j->JOBDESCRIPTION;
  $job['html'] = preg_replace('/. /','.<br>',$job['html']);
  $job['html'] = preg_replace('/•/','<br>•',$job['html']);
  $job['html'] = html_entity_decode($job['html'], ENT_QUOTES | ENT_XML1, 'UTF-8');
  $job['jobdesc'] = $job['html'];
  $job['temp']=1;
}


/////////////////////////////////////////////////

// ADP  191413

// Location array ------------------------//
$addresses = (String) $j->AllAddresses;
$loc1 = trim((string) explode(",",$addresses)[1]);
$loc2 = trim((string) explode(",",$addresses)[2]);
$arrloc=array();

if($loc1) $arrloc[] = $loc1;
if($loc2) $arrloc[] = $loc2;
$loc = implode(", ", $arrloc);

// Loc cleaning 
$loc = preg_replace('/[0-9]+/', '', $loc);
$loc = str_replace('-', '', $loc);

// Description array ------------------------//
$descp1 = trim((string) $j->description);
$descp2 = trim((string) $j->requirements);
$arrdesc=array();

if($descp1) $arrdesc[] = $descp1;
if($descp2) $arrdesc[] = $descp2;
$desc = implode(", ", $arrdesc);
//------------------------------------------//

$job=array();

$job['title'] = trim((String) $j->title); 
$job['url']  = trim((String) $j->url);
$job['location'] = trim((String)$loc); 

$job['source_jobtype'] = trim((String) $j->jobtype);
$job['source_salary'] = trim((String) $j->salary);

$job['source_empname'] = trim((String) $j->Company);

$jobdate = trim((String) $j->date);
if(strpos($jobdate, "20")!==false){
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
$job['dateposted_raw'] = $jobdate;
// print_r($job['dateposted_raw']."\n");
}  

// Description 
if(strpos($desc, 'For a complete job description')>-1){
    $desc = explode("For a complete job description", $desc);
    $desc = $desc[0];
  }
$job['html']  = $desc;
$job['jobdesc'] = strip_tags($job["html"]);


$job['temp']=1292020;



//print_r($job);


https://www.convivio.fr/emploi-restauration-collective/offres-emploi/patissier-fh-%E2%80%93-nantes-44-loire-atlantique

https://www.convivio.fr/emploi-restauration-collective/offres-emploi/Patissier+F%2FH+%E2%80%93+Nantes+%2844%29


/offres-emploi/patissier-fh-%E2%80%93-nantes-44-loire-atlantique

/offres-emploi/patissier%20f%2fh%20%e2%80%93%20nantes%20%2844%29

offres-emploi/cuisinier-fh–sainte-luce-sur-loire-44