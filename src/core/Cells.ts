import Canvas from './Canvas';
import Score from './Score';

import randomBoolean from '../utils/randomBoolean';
import randomNumber from '../utils/randomNumber';

import { CELL_HEIGHT, CELL_WIDTH, CellStatuses } from '../constants';

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
  private readonly rows = randomNumber(5);
  private score: Score;
  private readonly playerWin: () => void;

  constructor(score: Score, playerWin: () => void) {
    this.initCells();
    this.score = score;
    this.playerWin = playerWin;
  }

  public loopCallback() {
    this.drawCells();
  }

  public inactivateCell(cellIndex: number, cell: Cell) {
    this.cells.splice(cellIndex, 1, { ...cell, status: CellStatuses.INACTIVE });
    this.score.increment();
    if (!this.hasActiveCells) {
      this.playerWin();
    }
  }

  private get hasActiveCells(): boolean {
    const activeCells = this.cells.filter((cell) => cell.status === CellStatuses.ACTIVE);
    return Boolean(activeCells.length);
  }

  private initCells() {
    for (let row = 0; row < this.rows; row++) {
      for (let i = 0; i < this.cellsOnLine; i++) {
        const x = CELL_WIDTH * i;
        const y = row * CELL_HEIGHT;

        this.pushCell({
          x1: x,
          x2: x + CELL_WIDTH,
          y1: y,
          y2: y + CELL_HEIGHT,
          status: randomBoolean() ? CellStatuses.ACTIVE : CellStatuses.INACTIVE,
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
