import PopUp from "./popup.js";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
}); //실수할 가능성을 줄이기 위해

//Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }
  withBugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }

  build() {
    console.log(this);
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}
class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn = document.querySelector(".game__button");
    this.gameLevel = document.querySelector(".game__level");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.level = 1;

    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(this.onClick);
    this.gameField = new Field(
      carrotCount,
      bugCount,
      () => this.started,
      () => this.level
    );
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();

      if (this.carrotCount * this.level === this.score) {
        this.win();
      }
    } else if (item === ItemType.bug) {
      //벌레!
      this.lose();
    }
  };

  win() {
    this.stop(Reason.win);
    this.level++;
  }
  lose() {
    this.stop(Reason.lose);
    this.level = 1;
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove(".fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      this.updateTimerText(--remainingTimeSec);
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(
          this.carrotCount * this.level === this.score
            ? this.win()
            : this.lose()
        );
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerHTML = `${minutes}:${seconds}`;
  }

  initGame() {
    this.upDatelevel();
    this.score = 0;
    this.gameScore.innerText = this.carrotCount * this.level;
    this.gameField.init();
  }
  upDatelevel() {
    this.gameLevel.innerText = `Level ${this.level}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount * this.level - this.score;
  }
}
