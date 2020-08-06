<?php
$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);
    
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();
$job['title'] = trim((String) $j->title);
$job['location'] = ($loc);
$job['url'] = trim((String) $j->url);
$job['source_empname'] = trim((String) $j->company);
$job['html'] = (String) $j->description;
$job['jobdesc'] = $job['html'];
$job['temp']=4;
//? $loc : 'UK';

