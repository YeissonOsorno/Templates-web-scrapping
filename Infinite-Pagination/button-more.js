/*
*Descripción : Template para Infinite-pagination cuando existe un boton de more, y hace una espera
*Autor : Yeisson Osorno
*/
var selector = "#direct_moreLessLinks_listingDiv a"; // selector del boton

var f = function(){
    var out = {};
    // encuentro la propiedad que desabilita el boton para hacer el Stop 
	if(!document.querySelector('#direct_moreLessLinks_listingDiv a[style]')){
      	all_elems = document.querySelectorAll(selector);
	[].forEach.call(all_elems, function(elemento){
		elemento.click();
      
	});
	setTimeout(function(){
		all_elems = document.querySelectorAll(selector);
		if(all_elems.length > 0) f();
	}, 500);
     
    }else{
		 console.log('ya no mas jobs');
    }
}

f();