import birdsData from './birds.js';
import getRandomNum from './getRandomNum.js';
import getTimeCodeFromNum from './getTimeCodeFromNum.js';


//слайдер

/*const slideNext = document.querySelector(".slide-next");
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
 slidePrev.addEventListener ("click", getSlidePrev);*/


//аудио

const audioRandomBirs = document.querySelector(".random-bird__audio");
const audioInformationBird = document.querySelector(".information-bird__audio");
const randomBirdPlayPause = document.querySelector(".random-bird__play-pause");
const informationBirdPlayPause = document.querySelector(".information-bird__play-pause");
const paginationItem = document.querySelectorAll(".pagination__item");
const randomBirdProgressBar = document.querySelector(".random-bird__timebar-bar");
const progressBarCircle = document.querySelector(".timebar-circle");
const wrapperScore = document.querySelector(".wrapper-score__score");

//console.log(window.location.pathname);

let level;
let isPlay;
let islevelPassed = false;
let score;

//if (window.location.pathname === /src/pages/quiz/index.html){
  level = 0;
  isPlay = false;
 // islevelPassed = false;
  score = 5;
  
  paginationItem[0].classList.add("active");
  
  //paginationItem[0].style.backgroundColor = "#ffffff";
  
  let randomNumber = getRandomNum(0, 5);  //находим рандомное число от 1 до 5 включительно
  console.log(randomNumber);

  function playPauseRandomAudio () {    
    if (isPlay === false) {
      audioRandomBirs.src = birdsData[level][randomNumber].audio; 
      audioRandomBirs.play();
      isPlay = true;
      randomBirdPlayPause.classList.add("pause");
    } else if (isPlay === true) {
      audioRandomBirs.pause();
      isPlay = false;
      randomBirdPlayPause.classList.remove("pause");
    }
  }

  function playPauseInformationAudio () {    
    if (isPlay === false) {
      audioInformationBird.src = birdsData[level][randomNumber].audio; 
      audioInformationBird.play();
      isPlay = true;
      informationBirdPlayPause.classList.add("pause");
    } else if (isPlay === true) {
      audioInformationBird.pause();
      isPlay = false;
      informationBirdPlayPause.classList.remove("pause");
    }
  }
  
  randomBirdPlayPause.addEventListener("click", playPauseRandomAudio);
  informationBirdPlayPause.addEventListener("click", playPauseInformationAudio);
   
  //Изменение ползунка и времени
  
  setInterval(() => {

    randomBirdProgressBar.style.width = (audioRandomBirs.currentTime / audioRandomBirs.duration) * 100 + "%";
    progressBarCircle.style.left = (audioRandomBirs.currentTime / audioRandomBirs.duration) * 100 + "%";
    document.querySelector(".timebar-time-info .current").textContent = getTimeCodeFromNum(
      audioRandomBirs.currentTime
    );
  
    if (audioRandomBirs.currentTime === audioRandomBirs.duration) {
      randomBirdPlayPause.classList.remove("pause");
      informationBirdPlayPause.classList.remove("pause");
  
    };
  }, 500);
  
  
  audioRandomBirs.addEventListener(
    "loadeddata",
    () => {
      document.querySelector(".timebar-time-info .length").textContent = getTimeCodeFromNum(
        audioRandomBirs.duration
      );
      audioRandomBirs.volume = 0.75;
    },
    false
  );
  
  //нажать на временную шкалу
  //click on timeline to skip around
  const timebar = document.querySelector(".timebar");
  timebar.addEventListener(
    "click",
    (e) => {
      const timelineWidth = window.getComputedStyle(timebar).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) *audioRandomBirs.duration;
      audioRandomBirs.currentTime = timeToSeek;
    },
    false
  );
  
  
  //звук при правильном и неправильном ответе
  
  function soundCorrectAnswer() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../../assets/sounds/correct.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }
  
  function soundIncorrectAnswer() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../../assets/sounds/incorrect.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }
  
  //вариант ответа
  
  const answersListItem = document.querySelectorAll(".answers__list-item");
  const ramdomBirdImage = document.querySelector(".random-bird__bird-image");
  const randomBirdName = document.querySelector(".random-bird__name-bird");
  const informationBirdName = document.querySelector(".information-bird__name-bird");
  const informationBirdSpecies = document.querySelector(".information-bird__species-bird");
  const informationBirdImage = document.querySelector(".information-bird__bird-image");
  const informationBirdDescription = document.querySelector(".information-bird__description-bird");
  const btnNextLevel = document.querySelector(".btn-next-level");
  const informationbirdTask = document.querySelector(".information-bird__task");
  //const informationBirdWrapperName = document.querySelector(".information-bird__wrapper-name-bird");
  const informationBirdWrapperImagePlayer = document.querySelector(".information-bird__wrapper-image-player");
  
  
  (function () {
    
      for (let i = 0; i < answersListItem.length; i += 1) {
        answersListItem[i].addEventListener("click", () => {
          if(answersListItem[i].textContent.trim() === birdsData[level][randomNumber].name){
            answersListItem[i].classList.add("correct");
            btnNextLevel.classList.add("active");
            if(level === 5) {
              btnNextLevel.innerHTML = "Game result";
              localStorage.setItem("score", score);
            }
            ramdomBirdImage.src = birdsData[level][randomNumber].image;
            randomBirdName.innerHTML = birdsData[level][randomNumber].name;
            informationbirdTask.classList.add("none-active");
            informationBirdDescription.classList.add("active");
            informationBirdWrapperImagePlayer.classList.add("active");
            informationBirdName.innerHTML = birdsData[level][randomNumber].name;
            informationBirdSpecies.innerHTML = birdsData[level][randomNumber].species;
            informationBirdImage.src = birdsData[level][randomNumber].image;
            informationBirdDescription.innerHTML = birdsData[level][i].description;
            audioRandomBirs.pause();
            randomBirdPlayPause.classList.remove("pause");
          audioRandomBirs.currentTime === 0;
            randomBirdProgressBar.style.width = 0 + "%";
            progressBarCircle.style.left = 0 + "%";
            score = score;
            //console.log(score);
            wrapperScore.innerHTML = score;
            
          //  number = i;
            //informationBirdPlayPause.addEventListener("click", playPauseInformationAudio);
            
            if (islevelPassed !== true) {
              soundCorrectAnswer();
            }
            islevelPassed = true;
            
            
          }
          if(answersListItem[i].textContent.trim() !== birdsData[level][randomNumber].name) {
            if (islevelPassed !== true) {
              answersListItem[i].classList.add("incorrectly");
              soundIncorrectAnswer();
              score = score - 1; 
            }
            informationbirdTask.classList.add("none-active");
            informationBirdDescription.classList.add("active");
            informationBirdWrapperImagePlayer.classList.add("active");
            informationBirdName.innerHTML = birdsData[level][i].name;
            informationBirdSpecies.innerHTML = birdsData[level][i].species;
            informationBirdImage.src = birdsData[level][i].image;
            informationBirdDescription.innerHTML = birdsData[level][i].description;
            
          }
        });
    };
  })();
  
  //новый уровень
  
  const item = document.querySelectorAll(".item");
  
  btnNextLevel.addEventListener("click", getNewLevel);
  
  function getNewLevel() {
    if (btnNextLevel.classList.contains("active")){
      if(level === 5){
       // paginationItem[level].classList.remove("active");
       // console.log(level);
        window.location.href = "../result/index.html";
      }
      else if(level !== 5) {
        level = level + 1;
        score = score + 5;
        paginationItem[level-1].classList.remove("active");
        paginationItem[level].classList.add("active");
        randomNumber = getRandomNum(0, 5);
        console.log(randomNumber);
        randomBirdName.innerHTML = "******";
        ramdomBirdImage.src = "../../assets/image/bird.06a46938.jpg";
        
        for (let i = 0; i < answersListItem.length; i += 1) {
       //   if(level !== 6){
            answersListItem[i].classList.remove("correct");
       //   }
          
          answersListItem[i].classList.remove("incorrectly");
        };
        for (let j = 0; j < item.length; j += 1) {
          item[j].innerHTML = birdsData[level][j].name; 
          //console.log(item[j]);
        }
        islevelPassed = false;
        informationbirdTask.classList.remove("none-active");
        informationBirdDescription.classList.remove("active");
        informationBirdWrapperImagePlayer.classList.remove("active");
        //console.log(answersListItem[3].innerHTML);
      }
     
    }
    if (btnNextLevel.classList.contains("active")){
      btnNextLevel.classList.remove("active");
    }
  
  };
//}






// Переход на страницу результатов

//if (answersListItem[randomNumber].classList.contains("correct") && level === 5) {
  //console.log(level);
// console.log(randomNumber);
  //window.location.href = url("../main/index.html");


//};

/*function setLocalStorage() {
  console.log(score);
  //  перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
  localStorage.setItem("score", score.volume); //localStorage.setItem - метод сохраняющий данные в localStorage, передается имя и значение ключа
  //localStorage.setItem("city", city.value);

}
window.addEventListener("beforeunload", setLocalStorage); //window - объект окна браузера, с ним связана загрузка и перезагрузка страницы*/

//let stringScore = String(score);
//localStorage.setItem("score", score);
//localStorage.clear();

//localStorage.setItem('test', 1);



//станица результатов

/*const gameResults = document.querySelector(".game-results");

gameResults.innerHTML = "Вы прошли викторину и набрали";

*/