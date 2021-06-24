"use strict";
const closeBtn = document.querySelector('span');
const popup = document.querySelector('.about');
const popLose = document.querySelector('.lose');
const button = document.querySelector('button');

function createAndAppend({ //вспомогательная функция для использования в Классах
  className,
  parentElement,
  value
}, tag = "div") {
  let element = document.createElement(tag);
  element.className = className;
  if (value) {
    element.innerHTML = value;
  }
  parentElement.appendChild(element);
  return element;
}

let getRandomInt = function (min, max) { //Функция рандомайзера для клеток
  min = Math.ceil(min); //Присваиваем значение параметра
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let myGame = new Game(document.body, 4);


closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

function showPopupLoad() {
  popup.style.display = "flex";
}

function showPopupLose() {
  popLose.style.display = "flex";
}

button.addEventListener('click', () => {
  window.location.reload();
});

window.onload = () => {
  showPopupLoad();
}
