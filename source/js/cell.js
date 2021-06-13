"use strict"

//Содаём класс клетка
class Cell {
  constructor(fieldElement, game) {
    this.game = game;

    this.fieldElement = fieldElement;

    this.element = createAndAppend({
      className: "cell",
      parentElement: fieldElement
    });


<<<<<<< HEAD
    if (Math.random() > 0.9) {
      this.spawn();
    }
=======
    if (Math.random() > 0.8) {
      this.spawn();
    }

    // this.element.onclick = this.merge.bind(this);
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
    if (this.value) {
      this.game.addScore(this.value + cell.value);
    }

    new AnimateCell(cell, this);

    this.value += cell.value;

=======
    this.value += cell.value;
>>>>>>> refs/remotes/origin/master
    cell.clear()
  }

  isSameTo(cell) {
    return this.value == cell.value;
  }

  spawn() {
<<<<<<< HEAD
    this.value = Math.random() > 0.5 ? 2 : 2;
  }

  get isEmpty() {
    return this.value == 0;
  }

}


class AnimateCell {
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

    // toCell.element.offsetTop
    // toCell.element.offsetLeft
=======
    this.value = Math.random() > 0.5 ? 4 : 2;
  }

  get isEmpty(){
    return this.value == 0;
>>>>>>> refs/remotes/origin/master
  }
}
