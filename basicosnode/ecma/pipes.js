const suma = (num)=> num +1;
const dobla = (num) => num *2;
const triplica = (num) => num *3;

const _pipe = (f,g) => (...args) =>g(f(...args));
const pipe = (...fns) =>  fns.reduce(_pipe);

const funcionesMixtas = pipe(dobla,suma,triplica);
const resultado = funcionesMixtas(3);
console.log(resultado);

