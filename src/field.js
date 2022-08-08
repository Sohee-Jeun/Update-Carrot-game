"use strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;
const MOVE_DURATION = 500;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount, isGameRunning, level) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.isGameRunning = isGameRunning;
    this.level = level;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.x2 = this.fieldRect.width - CARROT_SIZE;
    this.y2 = this.fieldRect.height - CARROT_SIZE;

    //this.onClick = this.onClick.bind(this); //this Binding 1
    this.field.addEventListener("click", this.onClick); //('click', (event) => this.onClick(event)); this binding 2
  }

  init() {
    if (this.level > 4) {
      this.field.innerHTML = "";
      //벌레와 당근을 생성한 뒤 field에 추가해줌
      this._addItem(
        "carrot",
        this.carrotCount * this.level(),
        "carrot/img/carrot.png"
      );
      this._addItem("bug", this.bugCount * this.level(), "carrot/img/bug.png");
    } else {
      this.field.innerHTML = "";
      //벌레와 당근을 생성한 뒤 field에 추가해줌
      this._addItem(
        "carrot",
        this.carrotCount * this.level(),
        "carrot/img/carrot.png"
      );
      this._addItem("bug", this.bugCount * this.level(), "carrot/img/bug.png");
      this.move();
    }
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
  _addItem(className, count, imgPath) {
    //__underscore을 씀으로 인해 외부에서 이 함수를 쓸 수 없음
    //클래스의 이름과 개수 그리고 이미지의 경로를 추가해준다.
    const x1 = 0;
    const y1 = 0;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, this.x2);
      const y = randomNumber(y1, this.y2);

      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      this.field.appendChild(item);
    }
  }
  onClick = (event) => {
    //this binding 3
    const target = event.target;
    if (target.matches(".carrot")) {
      //당근!
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      //벌레!
      this.onItemClick && this.onItemClick("bug");
    }
  };
  move() {
    const bugs = document.querySelectorAll(".bug");

    this.timer = setInterval(() => {
      bugs.forEach((bug) => {
        const x = randomNumber(-50, 50);
        const y = randomNumber(-50, 50);
        bug.style.transition = "all 2000ms ease";

        let fieldX = parseFloat(bug.style.left);
        fieldX += x;

        //bug shouldn't be out of windows
        if (fieldX > 0 && fieldX < this.x2) {
          bug.style.left = `${fieldX}px`;
        }

        let fieldY = parseFloat(bug.style.top);
        fieldY += y;

        //bug shouldn't be out of windows
        if (fieldY > 0 && fieldY < this.y2) {
          bug.style.top = `${fieldY}px`;
        }
      });
    }, MOVE_DURATION);
  }
  stopMove() {
    clearInterval(this.timer);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
