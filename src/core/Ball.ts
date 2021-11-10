import Canvas from './Canvas';
import Cells from './Cells';

import { BALL_RADIUS } from '../constants';

export default class Ball {
  private x = Math.round(Canvas.width / 2);
  private y = Math.round(Canvas.height - 30);
  private dx = 2;
  private dy = -2;
  private cells: Cells;

  constructor(cells: Cells) {
    this.drawBall();
    this.cells = cells;
  }

  public loopCallback() {
    this.drawBall();
    const nextPositionX = this.x + this.dx;
    const nextPositionY = this.y + this.dy;
    if (nextPositionX > Canvas.width - BALL_RADIUS || nextPositionX < BALL_RADIUS) {
      this.dx = -this.dx;
    }
    if (nextPositionY < BALL_RADIUS || nextPositionY > Canvas.height - BALL_RADIUS) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  private drawBall() {
    Canvas.context.beginPath();
    Canvas.context.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
    Canvas.context.fill();
    Canvas.context.closePath();
  }
}
