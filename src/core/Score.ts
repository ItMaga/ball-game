export default class Score {
  private score: number;
  private scoreElement = document.getElementById('score');

  constructor() {
    this.score = 0;
  }

  public increment() {
    this.score += 10;
    this.updateScore();
  }

  private updateScore() {
    this.scoreElement.innerText = String(this.score);
  }
}
