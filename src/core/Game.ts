import Player from './Player';
import Cells from './Cells';
import Ball from './Ball';
import Loop from './Loop';
import Canvas from './Canvas';

export default class Game {
  private player = new Player();
  private cells = new Cells();
  private ball = new Ball(this.cells);
  private gameLoop = new Loop(10, this.gameLoopCallback.bind(this));

  constructor() {
    this.gameLoop.start();
  }

  private gameLoopCallback() {
    Game.clearCanvas();
    this.ball.loopCallback();
    this.player.loopCallback();
    this.cells.loopCallback();
  }

  private static clearCanvas() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }
}
