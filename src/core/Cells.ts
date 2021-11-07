import Canvas from './Canvas';

import { CELL_HEIGHT, CELL_ROWS, CELL_WIDTH } from '../constants';

export default class Cells {
  private readonly cellsOnLine = Canvas.width / CELL_WIDTH;

  constructor() {
    this.drawCells();
  }

  private drawCells() {
    for (let row = 0; row < CELL_ROWS; row++) {
      for (let i = 0; i < this.cellsOnLine; i++) {
        Canvas.context.fillStyle = 'white';
        Canvas.context.rect(CELL_WIDTH * i, row * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
        Canvas.context.fill();
        Canvas.context.stroke();
      }
    }
  }
}
