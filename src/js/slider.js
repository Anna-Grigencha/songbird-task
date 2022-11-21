import getRandomNum from './getRandomNum.js';


const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const slider = document.querySelector(".main__slider");

function getSlideNext() {
  console.log("11111");
  getImageFlickr();
  
 };

 function getSlidePrev(){
  getImageFlickr();
  
 }

async function getImageFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ccd140bcd1787466e4208030fca5e875&tags=bird&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();

  let randomImageFlickr = getRandomNum(0, data.photos.photo.length-1);
  img.src = data.photos.photo[randomImageFlickr].url_l;
  img.onload = () => {     
    slider.style.backgroundImage = `url(${img.src})`;  
  }; 

 }

 slideNext.addEventListener ("click", getSlideNext);
 slidePrev.addEventListener ("click", getSlidePrev);