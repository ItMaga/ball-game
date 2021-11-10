import Canvas from './Canvas';

import { CELL_HEIGHT, CELL_ROWS, CELL_WIDTH } from '../constants';

export interface Cell {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export default class Cells {
  private readonly cellsOnLine = Math.round(Canvas.width / CELL_WIDTH);
  public cells: Array<Cell> = [];

  constructor() {
    this.drawCells();
  }

  public loopCallback() {
    this.drawCells();
  }

  private drawCells() {
    this.resetCells();

    for (let row = 0; row < CELL_ROWS; row++) {
      for (let i = 0; i < this.cellsOnLine; i++) {
        const x = CELL_WIDTH * i;
        const y = row * CELL_HEIGHT;

        Canvas.context.fillStyle = 'white';
        Canvas.context.rect(x, y, CELL_WIDTH, CELL_HEIGHT);
        Canvas.context.fill();
        Canvas.context.stroke();
        this.pushCell({ x1: x, x2: x + CELL_WIDTH, y1: y, y2: y + CELL_HEIGHT });
      }
    }
  }

  private pushCell({ x1, x2, y1, y2 }: Cell) {
    this.cells.push({ x1, x2, y1, y2 });
  }

  private resetCells() {
    this.cells = [];
  }
}
