import { observable, action, computed } from 'mobx';
import moment from 'moment';

const BASE_LEVEL = 4;

class ViewStore {
  @observable showStartCounter = true;
  @observable numbers = [];
  @observable numbersState = [];
  @observable wrongNumber = [];
  @observable wrongSelected = 0;
  @observable isShowResult = false;
  @observable gameStarted = false;
  @observable showGameOver = false;

  @observable level = BASE_LEVEL;
  @observable score = 0;

  startTime = 0;

  constructor() {
    this.hideCounter = this.hideCounter.bind(this);
    this.showCounter = this.showCounter.bind(this);
    this.openNumberAt = this.openNumberAt.bind(this);
    this.addWrongNumber = this.addWrongNumber.bind(this);
    this.increaseWrongSelected = this.increaseWrongSelected.bind(this);
    this.restart = this.restart.bind(this);
    this.nextGame = this.nextGame.bind(this);
  }

  @action hideCounter() {
    this.showStartCounter = false;
  }

  @action showCounter() {
    this.showStartCounter = true;
  }

  @action showResult() {
    this.isShowResult = true;
  }

  @action hideResult() {
    this.isShowResult = false;
  }

  @action openNumberAt(index) {
    if (index <= this.numbersState.length) {
      this.numbersState[index] = true;
    }

    if (this.isWon) this.calculateScore();
  }

  @action addWrongNumber(number) {
    if (this.wrongNumber.indexOf(number) < 0) {
      this.wrongNumber.push(number);
      setTimeout(
        action('remove wrong number', () => {
          const index = this.wrongNumber.indexOf(number);
          if (index >= 0) {
            this.wrongNumber.splice(index, 1);
          }
        }),
        500
      );
    }

    this.increaseWrongSelected();
  }

  @action nextGame() {
    this.reset();
    this.level++;
    this.numbers = [];
    this.numbersState = [];

    while (this.numbers.length < this.level) {
      let newNumber = this.generateNumber();
      if (this.numbers.indexOf(newNumber) < 0) {
        this.numbers.push(newNumber);
        this.numbersState.push(false);
      }
    }

    this.showResult();
    setTimeout(() => {
      this.hideResult();
      this.startGame();
    }, 1000);
  }

  @action startGame() {
    this.gameStarted = true;
    this.startTime = moment().unix();
  }

  @action restart() {
    this.reset();
    this.score = 0;
    this.showStartCounter = true;
    this.isShowResult = false;
    this.gameStarted = false;
    this.showGameOver = false;

    this.level = BASE_LEVEL;
  }

  @action reset() {
    this.numbers = [];
    this.numbersState = [];
    this.wrongNumber = [];
    this.wrongSelected = 0;
  }

  @action endGame() {
    this.gameStarted = false;
  }

  @action calculateScore() {
    const endTime = moment().unix();
    this.score += Math.floor(
      (this.level - 1) * 1000 / (endTime - this.startTime)
    );
  }

  @action increaseWrongSelected() {
    this.wrongSelected++;

    if (this.wrongSelected === 3) {
      this.showGameOver = true;
      this.isShowResult = true;
    }
  }

  @computed get isWon() {
    return (
      this.numbersState.length > 0 &&
      this.numbersState.filter(state => !state).length === 0
    );
  }

  // generate random number from 1 -> 25
  generateNumber() {
    return Math.floor(Math.random() * 25 + 1);
  }
}

export default ViewStore;
