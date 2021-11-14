import Player from './Player';
import Cells from './Cells';
import Ball from './Ball';
import Loop from './Loop';
import Canvas from './Canvas';
import Score from './Score';
import GameOver from './GameOver';

export default class Game {
  private score = new Score();
  private cells = new Cells(this.score);
  private player = new Player();
  private ball = new Ball(this.cells, this.player, this.gameOver.bind(this));
  private gameLoop = new Loop(10, this.gameLoopCallback.bind(this));

  constructor() {
    this.gameLoop.start();
  }

  private static clearCanvas() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }

  private gameOver() {
    this.gameLoop.stop();
    this.score.reset();
    setTimeout(() => {
      Game.clearCanvas();
      GameOver.drawScreen();
    });
  }

  private gameLoopCallback() {
    Game.clearCanvas();
    this.ball.loopCallback();
    this.player.loopCallback();
    this.cells.loopCallback();
  }
}
