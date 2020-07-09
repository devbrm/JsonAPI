// const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const url = "https://simplemaps.com/static/data/country-cities/in/in.json";
let data = [];

fetch(url) 
  .then( blob => blob.json())
  .then( parsed =>  data.push(...parsed)) 
  .catch(err => console.error(`Unknown error occured`))

function find(word, data) {
  let regex = new RegExp(word, "gi")
  return data.filter( obj => {
    return obj.city.match(regex) || obj.admin.match(regex);

  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function display() {

  if ( Boolean(!this.value) || (/[^a-z\s*]+/ig).test(this.value) ) {

    myList.innerHTML = "";
    return;
  }
  let result = find(this.value, data);
  let html = result.map( obj => {
    let population = numberWithCommas(obj.population);
    let regex = new RegExp(this.value, "ig")
    let city = obj.city.replace(regex, `<span class = "hc">${this.value}</span>`);
    let state = obj.admin.replace(regex, `<span class = "hs">${this.value}</span>`);
    
    return `
      <li>
      <span>${city}, ${state}</span><span>${population}</span>
      </li>
    `
  } ).join(" ")
  myList.innerHTML = html;
}


let search = document.querySelector(".searchBox");
let myList = document.querySelector(".list");
search.addEventListener( "input", display );