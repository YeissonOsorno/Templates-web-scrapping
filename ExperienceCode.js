job.experience_required = tagExperienceRequired();

function tagExperienceRequired(elem = document){
  let primerFiltro = []
  elem.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|erfahrung/gi) && (word.textContent.match(/[0-9]/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE")) {
      if(word.innerText.match(/experience|expérience|erfahrung/gi))
        primerFiltro.push(word.textContent.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g))

    }
    primerFiltro = primerFiltro.flat()
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i)
  var segundoFiltro = []
  deleteDuplicados.forEach(elem => {
    if(elem.match(/experience|expérience|erfahrung|Berufserfahrung/gi) && elem.match(/\d+/g))
      segundoFiltro.push(elem.trim())

  })
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i)
  return arrayFinal[0]
}