"use strict"

//Содаём класс клетка
class Cell {
  constructor(fieldElement, game) {
    this.game = game;

    this.fieldElement = fieldElement;

    this.element = createAndAppend({ //Используем Вспомогательную функцию написанную вначале
      className: "cell",             //Присваиваем класс для элемента
      parentElement: fieldElement    //Присваиваем родительский элемент
    });

    if (Math.random() > 0.9) {
      this.spawn();
    }
  }


  get value() {
    return this.Value || 0;
  }

  set value(value) {
    this.Value = value;

    this.element.innerHTML = value == 0 ? "" : value;
    this.element.setAttribute("cell-number", value);
  }

  clear() {
    this.value = "";
  }

  merge(cell) {
    if (this.value) {
      this.game.addScore(this.value + cell.value);
    }

    new AnimateCell(cell, this); //Используем класс анимации клетки

    this.value += cell.value;

    cell.clear()
  }

  isSameTo(cell) {
    return this.value == cell.value;
  }

  spawn() {
    this.value = Math.random() > 0.5 ? 2 : 2;
  }

  get isEmpty() {
    return this.value == 0;
  }

}


class AnimateCell {  //Создаем класс анимации
  constructor(fromCell, toCell) {
    this.element = fromCell.element.cloneNode(true);
    this.element.className = "cell animate";

    this.element.style.top = fromCell.element.offsetTop + "px";
    this.element.style.left = fromCell.element.offsetLeft + "px";

    fromCell.fieldElement.appendChild(this.element);

    this.element.style.top = toCell.element.offsetTop + "px";
    this.element.style.left = toCell.element.offsetLeft + "px";


    setTimeout(function () {
      fromCell.fieldElement.removeChild(this.element);
    }.bind(this), 1000)
  }
}
