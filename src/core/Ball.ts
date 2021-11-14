import Canvas from './Canvas';
import Cells from './Cells';

import { BALL_RADIUS, CellStatuses } from '../constants';
import Player from './Player';

export default class Ball {
  private x = Math.round(Canvas.width / 2);
  private y = Math.round(Canvas.height - 30);
  private dx = 2;
  private dy = -2;
  private cells: Cells;
  private player: Player;

  constructor(cells: Cells, player: Player) {
    this.drawBall();
    this.cells = cells;
    this.player = player;
  }

  public loopCallback() {
    this.drawBall();
    this.detectCollision();

    const nextPositionX = this.x + this.dx;
    const nextPositionY = this.y + this.dy;
    if (nextPositionX > Canvas.width - BALL_RADIUS || nextPositionX < BALL_RADIUS) {
      this.dx = -this.dx;
    }

    if (nextPositionY < BALL_RADIUS || this.isPlayerCollision) {
      this.dy = -this.dy;
    } else if (nextPositionY > Canvas.height - BALL_RADIUS) {
      console.log('GAME OVER');
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  private get isPlayerCollision() {
    const { x1, x2, y1, y2 } = this.player.playerCoordinates;
    return (
      this.x + BALL_RADIUS > x1 &&
      this.x + BALL_RADIUS < x2 &&
      this.y + BALL_RADIUS > y1 &&
      this.y + BALL_RADIUS < y2
    );
  }

  private detectCollision() {
    const collisionCellIndex = this.cells.cells.findIndex(
      (cell) =>
        cell.status === CellStatuses.ACTIVE &&
        this.y + BALL_RADIUS > cell.y1 &&
        this.y - BALL_RADIUS < cell.y2 &&
        this.x + BALL_RADIUS > cell.x1 &&
        this.x - BALL_RADIUS < cell.x2,
    );

    if (collisionCellIndex >= 0) {
      this.dy = -this.dy;
      this.cells.inactivateCell(collisionCellIndex, this.cells.cells[collisionCellIndex]);
      return true;
    }
    return false;
  }

  private drawBall() {
    Canvas.context.beginPath();
    Canvas.context.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
    Canvas.context.fill();
    Canvas.context.closePath();
  }
}
