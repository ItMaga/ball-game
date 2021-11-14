import Canvas from './Canvas';

import { CELL_HEIGHT, CELL_ROWS, CELL_WIDTH, CellStatuses } from '../constants';
import Score from './Score';

export interface Cell {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  status: CellStatuses;
}

export default class Cells {
  public cells: Array<Cell> = [];
  private readonly cellsOnLine = Math.round(Canvas.width / CELL_WIDTH);
  private score: Score;

  constructor(score: Score) {
    this.initCells();
    this.score = score;
  }

  public loopCallback() {
    this.drawCells();
  }

  public inactivateCell(cellIndex: number, cell: Cell) {
    this.cells.splice(cellIndex, 1, { ...cell, status: CellStatuses.INACTIVE });
    this.score.increment();
  }

  private initCells() {
    for (let row = 0; row < CELL_ROWS; row++) {
      for (let i = 0; i < this.cellsOnLine; i++) {
        const x = CELL_WIDTH * i;
        const y = row * CELL_HEIGHT;

        this.pushCell({
          x1: x,
          x2: x + CELL_WIDTH,
          y1: y,
          y2: y + CELL_HEIGHT,
          status: CellStatuses.ACTIVE,
        });
      }
    }
  }

  private drawCells() {
    this.cells.forEach(({ x1, y1, status }) => {
      if (status === CellStatuses.ACTIVE) {
        Canvas.context.fillStyle = 'white';
        Canvas.context.rect(x1, y1, CELL_WIDTH, CELL_HEIGHT);
        Canvas.context.fill();
        Canvas.context.stroke();
      }
    });
  }

  private pushCell(cell: Cell) {
    this.cells.push(cell);
  }
}
