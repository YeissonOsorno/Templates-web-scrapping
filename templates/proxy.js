// Proxy sintaxis
const proxy = new Proxy(target,handler);

/* Example proxi */
const target = {
    name:"ParaProgramadores",
    place:"Colombia"
};
const handler = {};
const proxy = new Proxy(target,handler);

console.log(proxy.name);
console.log(proxy.place);

/* Example get Handler Method */
const person = {
    name:"Jack",
    place:"Chennai"
};

const handler = {
    get:function(target,prop){
        return prop in target ? target[prop]
            : "Invalid Property"
    }
};

const newPerson = new Proxy(person,handler);
console.log(newPerson.name);
console.log(newPerson.age);

/* Example  set handler Method*/
const person = {
    name:"Jack"
};
const handler = {
    set: function(target,prop,value){
        if(prop === "age"){
            if(value < 100){
                target[prop] = value;
            }else{
                throw new RangeError("Invalid age");
            }
        }
    }
};
const newPerson =  new Proxy(person,handler);
newPerson.age = 25;
console.log(newPerson.age);
newPerson.age = 110;