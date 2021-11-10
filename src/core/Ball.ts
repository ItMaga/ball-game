import Canvas from './Canvas';
import Cells from './Cells';

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
    if (nextPositionX > Canvas.width - 8 || nextPositionX < 8) {
      this.dx = -this.dx;
    }
    if (nextPositionY < 8 || nextPositionY > Canvas.height - 8) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  private drawBall() {
    Canvas.context.beginPath();
    Canvas.context.arc(this.x, this.y, 8, 0, Math.PI * 2);
    Canvas.context.fill();
    Canvas.context.closePath();
  }
}
