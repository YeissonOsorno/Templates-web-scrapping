//Buenas Practica en JavaScript
/*************************************************/
/*Objetos y funciones anonimas*/
var validation = {

	headquarter : "",
	validateLocation : (location)=>{
		console.log("imprimiendo la locacion " +location)
	}
}
var word = "New York"
validation.validateLocation(word);
/*************************************************/
/*For in en JavaScript*/
var person = {
	name: "Yeisson",
	email :"yeisson@mail.com",
	twitter :"yei",
	greet :()=>{
		return "Hello World";
	}
}
 var data = "";
 for(data in person)
 {
 	console.log(data,person[data])
 }
/*************************************************/
 /*Validar objetos en JavaScript*/
 var persona = {};
 if(persona)
 {
 	console.log('La persona existe');
 }else{
 	console.log('La persona no existe');
 }
 /*Comentario : JavaScript no es un lenguaje fuertemente tipado por lo cual a veces existen
 problemas al validar variables de algún tipo de dato*/

 /*************************************************/
 /*Expresiones Booleanas*/
 var estado = true;
 if (estado) {
 	console.log('Continuar');
 }else{
 	console.log('Detenerse');
 }
 /*************************************************/
 /*Operador Ternario*/
var estado = true;

var accion = estado ? 'Continuar' : 'Detenerse'
console.log(accion)

//El operador ternario se una para hacer una validacion de una sola desición True o False.
/*************************************************/
/*Constructor de objetos en JavaScript*/
function Person(name,lastName)
{
	this.name = name;
	this.lastName = lastName;
}

var person = new Person("Yeisson","Osorno");

console.log(person);
console.log(person.name);
console.log(person.lastName);

/*************************************************/
/*Try & Catch*/
var animals = ["dog","cat","pez"];
var totalAnimals = animals.length;
/*Forma incorrecta al trabaja con ciclos*/
for(var i = 0; i<totalAnimals;i++)
{
	try{
		//Acciones a realizar por la excepción
	}catch(e){
		//Manejo de errores
	}
}
/*Forma correcta al trabaja con ciclos*/
try{
	//Acciones a realizar por la excepción
	for(var i = 0; i<totalAnimals;i++)
	{	
	
	}
}catch(e){
	//Manejo de errores
}
/*************************************************/
/*Literales*/
