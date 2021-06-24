"use strict"

//Создаём класс Game для отображения элементов без HTML

class Game { //Создаем класс Game и передаем функцию хелпера для создания элементов на странице без HTML
  constructor(parentElement, size = 4) {

    this.size = size;

    let gameFieldElement = createAndAppend({
      className: "game",
      parentElement
    });

    this.headerElement = createAndAppend({
      className: "header",
      parentElement: gameFieldElement
    });

    this.ratingElement = createAndAppend({
      className: "rating",
      parentElement: this.headerElement
    });

    this.rating = 0;

    let fieldElement = createAndAppend({
      className: "field",
      parentElement: gameFieldElement
    });

    this.field = [];

    for (let i = 0; i < size; i++) {
      this.field[i] = [];
      for (let j = 0; j < size; j++) {
        this.field[i][j] = new Cell(fieldElement, this);
      }
    }

    let move = window.onkeyup = function (event) { //Используем конструкцию switch case для управления с клавиатуры
      switch (event.keyCode) {
        case 38:
          this.moveUp();
          break;
        case 40:
          this.moveDown();
          break;
        case 37:
          this.moveLeft();
          break;
        case 39:
          this.moveRight();
          break;
      }
    }.bind(this);

    console.log(this.field);
  }

  addScore(value) { //создаём метод для добавления очков игрока
    this.rating += value;
  }

  spawnCell() { //создаём метод для генерации клетки в любую пустую ячейку
    let epmtyCells = [];

    for (let i = 0; i < this.field.length; i++) { //Проходим всё поле
      for (let j = 0; j < this.field[i].length; j++) {
        if (!this.field[i][j].value) { //Если это значение вовзращает ошибку, то помещаем это в emptyCells
          epmtyCells.push(this.field[i][j]); //Помещаем клетку в epmtyCells
        }
      }
    }
    if (epmtyCells.length) {
      epmtyCells[getRandomInt(0, epmtyCells.length - 1)].spawn();
    } else {
      showPopupLose();
    }
  }

  set rating(value) {
    this.Rating = value;
    this.ratingElement.innerHTML = "Очки: " + value;
  }

  get rating() {
    return this.Rating;
  }

  moveRight() { //создаём метод для управления
    let hasMove = false;
    for (let i = 0; i < this.size; i++) { //Проходим все клетки слево на право
      for (let j = this.size - 2; j >= 0; j--) { //До тех пор пока j >= 0
        let currentCell = this.field[i][j]; //Объявляем и присваиваем текущую клетку из массива
        if (currentCell.isEmpty) { //Берём ячейку, проверяем если она не пустая
          continue;
        }

        let nextCellKey = j + 1; //Объевляем и присваиваем значение следующей клетке
        while (nextCellKey < this.size) {

          let nextCell = this.field[i][nextCellKey];
          if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
            if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) ||
              nextCell.isSameTo(currentCell)) {
              this.field[i][nextCellKey].merge(currentCell);
              hasMove = true;
            } else if (!nextCell.isEmpty && nextCellKey - 1 != j) {
              this.field[i][nextCellKey - 1].merge(currentCell);
              hasMove = true;
            }
            break;
          }
          nextCellKey++;
          nextCell = this.field[i][nextCellKey];
        }
      }
      if (hasMove) { //Проверяем было ли движение
        this.spawnCell(); //Если условие сработало, вызываем метод для спавна клетки
      }
    }

  }
  isLastKey(key) {
    return key == (this.size - 1);
  }

  isFirstKey(key) {
    return key == 0;
  }

  moveLeft() {
    let hasMove = false;
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        let currentCell = this.field[i][j];
        if (currentCell.isEmpty) {
          continue;
        }

        let nextCellKey = j - 1;
        while (nextCellKey >= 0) {

          let nextCell = this.field[i][nextCellKey];
          if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
            if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) ||
              nextCell.isSameTo(currentCell)) {
              this.field[i][nextCellKey].merge(currentCell);
              hasMove = true;
            } else if (!nextCell.isEmpty && nextCellKey + 1 != j) {
              this.field[i][nextCellKey + 1].merge(currentCell);
              hasMove = true;
            }
            break;
          }
          nextCellKey--;
          nextCell = this.field[i][nextCellKey];
        }
      }
      if (hasMove) {
        this.spawnCell();
      }
    }


  }

  moveDown() {
    let hasMove = false;
    for (let j = 0; j < this.size; j++) {
      for (let i = this.size - 2; i >= 0; i--) {
        let currentCell = this.field[i][j];
        if (currentCell.isEmpty) {
          continue;
        }

        let nextCellKey = i + 1;
        while (nextCellKey < this.size) {

          let nextCell = this.field[nextCellKey][j];
          if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
            if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) ||
              nextCell.isSameTo(currentCell)) {
              this.field[nextCellKey][j].merge(currentCell);
              hasMove = true;
            } else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
              this.field[nextCellKey - 1][j].merge(currentCell);
              hasMove = true;
            }
            break;
          }
          nextCellKey++;
          nextCell = this.field[nextCellKey][j];
        }
      }
      if (hasMove) {
        this.spawnCell();
      }
    }
  }
  moveUp() {
    let hasMove = false;
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        let currentCell = this.field[i][j];
        if (currentCell.isEmpty) {
          continue;
        }

        let nextCellKey = i - 1;
        while (nextCellKey < this.size) {

          let nextCell = this.field[nextCellKey][j];
          if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
            if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) ||
              nextCell.isSameTo(currentCell)) {
              this.field[nextCellKey][j].merge(currentCell);
              hasMove = true;
            } else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
              this.field[nextCellKey + 1][j].merge(currentCell);
              hasMove = true;
            }
            break;
          }
          nextCellKey--;
          nextCell = this.field[nextCellKey][j];
        }
      }
      if (hasMove) {
        this.spawnCell();
      }
    }
  }
}
