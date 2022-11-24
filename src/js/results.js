const gameResults = document.querySelector(".game-results");
const btnPlayFirst = document.querySelector(".result__btn");

gameResults.innerHTML = "Вы прошли викторину и набрали";
let scoreResult = localStorage.getItem("score"); 

console.log(typeof scoreResult);

if (scoreResult === "30"){
    btnPlayFirst.classList.add("none");
    gameResults.innerHTML = `Вы набрали максимальное колличество баллов. Ваш результат: 30  баллов. Игра окончена`;   
}
else {
    gameResults.innerHTML = `Вы прошли викторину и набрали ${scoreResult} из 30 возможных баллов`;
};


//кнопка Попробовать еще раз

const getPlayFirst = () => {
    window.location.href = "../quiz/index.html";
}


btnPlayFirst.addEventListener("click", getPlayFirst);