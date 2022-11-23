import birdsData from './birds.js';
import getRandomNum from './getRandomNum.js';
import getTimeCodeFromNum from './getTimeCodeFromNum.js';

//аудио

const audioRandomBird = document.querySelector(".random-bird__audio");
const audioInformationBird = document.querySelector(".information-bird__audio");
const randomBirdPlayPause = document.querySelector(".random-bird__play-pause");
const informationBirdPlayPause = document.querySelector(".information-bird__play-pause");
const paginationItem = document.querySelectorAll(".pagination__item");
const randomBirdProgressBar = document.querySelector(".random-bird__timebar-bar");
const informationBirdProgressBar = document.querySelector(".information-bird__timebar-bar");
const randomBirdProgressBarCircle = document.querySelector(".random-bird__timebar-circle");
const informationBirdProgressBarCircle = document.querySelector(".information-bird__timebar-circle"); 

const wrapperScore = document.querySelector(".wrapper-score__score");

let level;
let isPlayRandom;
let isPlay;
let islevelPassed = false;
let score;

//if (window.location.pathname === /src/pages/quiz/index.html){
  level = 0;
  isPlayRandom = false;
  isPlay = false;
 // islevelPassed = false;
  score = 5;

  
  paginationItem[0].classList.add("active");
  
  let randomNumber = getRandomNum(0, 5);  //находим рандомное число от 1 до 5 включительно
  console.log(randomNumber);

  function playPauseRandomAudio () {    
    if (isPlayRandom === false) {
      audioRandomBird.src = birdsData[level][randomNumber].audio; 
      audioRandomBird.play();
      isPlayRandom = true;
      randomBirdPlayPause.classList.add("pause");
      pauseInformationAudio();
      
    } else if (isPlayRandom === true) {
      audioRandomBird.pause();
      isPlayRandom = false;
      randomBirdPlayPause.classList.remove("pause");
    }
  }

  function playPauseInformationAudio () {    
    if (isPlay === false) {
      for (let i = 0; i < answersListItem.length; i += 1) {
        if (answersListItem[i].classList.contains("active")) {
          audioInformationBird.src = birdsData[level][i].audio; 
        }  
      };
      
      audioInformationBird.play();
      isPlay = true;
      informationBirdPlayPause.classList.add("pause");
      pauseRandomAudio();
    } else if (isPlay === true) {
      audioInformationBird.pause();
      isPlay = false;
      informationBirdPlayPause.classList.remove("pause");
    }
  }

  function pauseRandomAudio () {
    audioRandomBird.pause();
      isPlayRandom = false;
      randomBirdPlayPause.classList.remove("pause");
      audioRandomBird.currentTime = 0;
      randomBirdProgressBar.style.width = 0 + "%";
    randomBirdProgressBarCircle.style.left = 0 + "%";
  }

  function pauseInformationAudio () {
    audioInformationBird.pause();
      isPlay = false;
      informationBirdPlayPause.classList.remove("pause");
      audioInformationBird.currentTime = 0;
      informationBirdProgressBar.style.width = 0 + "%";
    informationBirdProgressBarCircle.style.left = 0 + "%";

  }

  
  randomBirdPlayPause.addEventListener("click", playPauseRandomAudio);
  informationBirdPlayPause.addEventListener("click", playPauseInformationAudio);
   
  //Изменение ползунка и времени
  
  setInterval(() => {

    randomBirdProgressBar.style.width = (audioRandomBird.currentTime / audioRandomBird.duration) * 100 + "%";
    randomBirdProgressBarCircle.style.left = (audioRandomBird.currentTime / audioRandomBird.duration) * 100 + "%";
    document.querySelector(".random-bird__timebar-time-info .current").textContent = getTimeCodeFromNum(
      audioRandomBird.currentTime
    );

    informationBirdProgressBar.style.width = (audioInformationBird.currentTime / audioInformationBird.duration) * 100 + "%";
    informationBirdProgressBarCircle.style.left = (audioInformationBird.currentTime / audioInformationBird.duration) * 100 + "%";
    document.querySelector(".information-bird__timebar-time-info .current").textContent = getTimeCodeFromNum(
      audioInformationBird.currentTime
    );

    if (audioRandomBird.currentTime === audioRandomBird.duration) {
      randomBirdPlayPause.classList.remove("pause");
    };

    if (audioInformationBird.currentTime === audioInformationBird.duration) {
      informationBirdPlayPause.classList.remove("pause");
    };
  }, 500);
  
  
  audioRandomBird.addEventListener(
    "loadeddata",
    () => {
      document.querySelector(".random-bird__timebar-time-info .length").textContent = getTimeCodeFromNum(
        audioRandomBird.duration
      );
      audioRandomBird.volume = 0.75;
    },
    false
  );

  audioInformationBird.addEventListener(
    "loadeddata",
    () => {
      document.querySelector(".information-bird__timebar-time-info .length").textContent = getTimeCodeFromNum(
        audioInformationBird.duration
      );
      audioInformationBird.volume = 0.75;
    },
    false
  );
  
  //нажать на временную шкалу
  //click on timeline to skip around
  const randomBirdTimebar = document.querySelector(".random-bird__timebar");
  randomBirdTimebar.addEventListener(
    "click",
    (e) => {
      const randomBirdTimelineWidth = window.getComputedStyle(randomBirdTimebar).width;
      const randomBirdTimeToSeek = (e.offsetX / parseInt(randomBirdTimelineWidth)) *audioRandomBird.duration;
      audioRandomBird.currentTime = randomBirdTimeToSeek;
    },
    false
  );
  
  const informationBirdTimebar = document.querySelector(".information-bird__timebar");
  informationBirdTimebar.addEventListener(
    "click",
    (e) => {
      const informationBirdTimelineWidth = window.getComputedStyle(informationBirdTimebar).width;
      const informationBirdTimeToSeek = (e.offsetX / parseInt(informationBirdTimelineWidth)) *audioInformationBird.duration;
      audioInformationBird.currentTime = informationBirdTimeToSeek;
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
  
  
/*for (let i = 0; i < answersListItem.length; i += 1) {
    answersListItem[i].classList.remove("active");
    console.log(i);
  };*/


 
  (function () {
      for (let i = 0; i < answersListItem.length; i += 1) {
        answersListItem[i].addEventListener("click", () => {
          pauseInformationAudio();
          for (let i = 0; i < answersListItem.length; i += 1) {
            answersListItem[i].classList.remove("active");
            console.log(i);
          };
          answersListItem[i].classList.add("active");
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
            pauseRandomAudio ();
            score = score;
            wrapperScore.innerHTML = score;
              
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
    pauseRandomAudio ();
    pauseInformationAudio();
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