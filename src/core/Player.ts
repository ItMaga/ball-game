import Canvas from './Canvas';

import { KeyCode, PLAYER_HEIGHT, PLAYER_WIDTH } from '../constants';

const PLAYER_STEP = 10;

export default class Player {
  private transform = Canvas.width / 2 - PLAYER_WIDTH / 2;
  private directions = new Set<string>();
  private readonly availableDirections: Array<string> = [KeyCode.ArrowRight, KeyCode.ArrowLeft];
  private readonly y = Canvas.height - PLAYER_HEIGHT;

  constructor() {
    document.addEventListener('keydown', this.keyDownListener.bind(this), false);
    document.addEventListener('keyup', this.keyUpListener.bind(this), false);
  }

  public get playerCoordinates() {
    return {
      x1: this.transform,
      x2: this.transform + PLAYER_WIDTH,
      y1: this.y,
      y2: this.y + PLAYER_HEIGHT,
    };
  }

  private keyDownListener(e: KeyboardEvent) {
    if (this.availableDirections.includes(e.code)) {
      e.preventDefault();
      this.directions.add(e.code);
    }
  }

  private keyUpListener(e: KeyboardEvent) {
    if (this.directions.has(e.code)) {
      this.directions.delete(e.code);
    }
  }

  public loopCallback() {
    this.drawPlayer();
  }

  private drawPlayer() {
    if (this.directions.has(KeyCode.ArrowRight) && this.transform < Canvas.width - PLAYER_WIDTH) {
      this.transform += PLAYER_STEP;
    } else if (this.directions.has(KeyCode.ArrowLeft) && this.transform > 0) {
      this.transform -= PLAYER_STEP;
    }
    Canvas.context.fillStyle = 'white';
    Canvas.context.fillRect(this.transform, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
}
