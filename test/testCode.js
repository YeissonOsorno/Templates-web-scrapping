for (const a of full_html.querySelectorAll('span')) {
    if (a.textContent.search('Location:')>-1){
       job.location = a.textContent.split('\n').filter(elem=>elem.indexOf('Location')>-1)[0].split(':').pop().trim();
       a.remove();
    } 
}


const fruits = ["🍎","🍐","🍊","🍞","🍒","🍍"];

const filter_fruits = fruits.filter(elem=>elem =="🍒");

console.log(filter_fruits);

// response : ["🍒"]
