const body = document.getElementById('body');
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const screenshotBtn = document.getElementById('screenshot-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const modeBtn = document.getElementById('mode-btn');
const svgs = document.querySelectorAll('.svg');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
let isLight = true;

modeBtn.addEventListener('click', ()=>{
  if(isLight){
    body.classList.add('bg-(color:--clr-black)');
    body.classList.remove('bg-(color:--clr-white)');

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
    body.classList.add('bg-(color:--clr-white)');
    body.classList.remove('bg-(color:--clr-black)');

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