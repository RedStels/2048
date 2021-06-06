"use strict";
//вспомогательная функция для использования в Классах
function createAndAppend({ className, parentElement, value}, tag= "div") {
  let element = document.createElement(tag);
  element.className = className;
  if (value) {
    element.innerHTML = value;
  }
  parentElement.appendChild(element);
  return element;
}

let getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let myGame = new Game(document.body, 4);
