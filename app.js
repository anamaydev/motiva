const body = document.getElementById('body');
const quotePlaceholder = document.getElementById('quote-placeholder');
const authorPlaceholder = document.getElementById('author-placeholder');
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const screenshotBtn = document.getElementById('screenshot-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const modeBtn = document.getElementById('mode-btn');
const svgs = document.querySelectorAll('.svg');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const URL = 'https://raw.githubusercontent.com/anamaydev/temp-quotes-api/refs/heads/main/quotes.json';
let index = 0;
let dataLength = 0;
let isLight = true;

// generating random index to select quote
function generateRandomIndex(dataLength){
  index =  Math.floor(Math.random()*dataLength);
  console.log(`random index: ${index}`);
}

// inserting selected data
function showData(index, data){
  const quote = data[index];
  quotePlaceholder.innerText = quote['text'];
  authorPlaceholder.innerText = `- ${quote['author']}`;
}

function getNextData(dataLength, data){
  index = (index + 1) % dataLength;
  console.log(`next index: ${index}`);
  showData(index, data);
}

function getPreviousData(dataLength, data){
  index = (index - 1 + dataLength) % dataLength;
  console.log(`previous index: ${index}`);
  showData(index, data);
}

function setEventListeners(dataLength, data){
  nextBtn.addEventListener('click', ()=>{
    getNextData(dataLength, data);
  });
  previousBtn.addEventListener('click', ()=>{
    getPreviousData(dataLength, data);
  });
}

// getting data
async function getData(){
  const response = await fetch(URL);
  const data = await response.json();
  dataLength = data.length;
  console.log(data);

  // calling for random index
  await generateRandomIndex(dataLength);
  // calling to insert selected data
  await showData(index, data);

  setEventListeners(dataLength, data);
}

window.addEventListener('load', getData);

modeBtn.addEventListener('click', ()=>{
  if(isLight){
    // changing theme to dark
    body.classList.add('bg-(color:--clr-black)');
    body.classList.remove('bg-(color:--clr-white)');

    // changing font color to light
    body.classList.add('text-(color:--clr-white)');
    body.classList.remove('text-(color:--clr-black)');

    // isLight changed to dark
    isLight = false;

    // changing fill of all svg paths
    svgs.forEach((svg)=>{
      let paths = svg.querySelectorAll('path');
      paths.forEach((path)=>{
        path.classList.add('fill-[var(--clr-white)]');
        path.classList.remove('fill-[var(--clr-black)]');
      })
    })

    // changing icon from moon -> sun
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');

    // changing mode button text to light
    const modeText = modeBtn.querySelector('span');
    modeText.innerText = 'light';

  }else{
    // changing font color to light
    body.classList.add('bg-(color:--clr-white)');
    body.classList.remove('bg-(color:--clr-black)');

    // changing font color to dark
    body.classList.add('text-(color:--clr-black)');
    body.classList.remove('text-(color:--clr-white)');

    // isLight changed to light
    isLight = true;

    // changing fill of all svg paths
    svgs.forEach((svg)=>{
      let paths = svg.querySelectorAll('path');
      paths.forEach((path)=>{
        path.classList.add('fill-[var(--clr-black)]');
        path.classList.remove('fill-[var(--clr-white)]');
      })
    })

    // changing icon from sun -> moon
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');

    // changing mode button text to dark
    const modeText = modeBtn.querySelector('span');
    modeText.innerText = 'dark';
  }
})