import Canvas from './Canvas';

import { KeyCode, PLAYER_HEIGHT, PLAYER_WIDTH } from '../constants';

const PLAYER_STEP = 10;

export default class Player {
  private transform = Canvas.width / 2 - PLAYER_WIDTH / 2;
  private directions = new Set<string>();
  private readonly availableDirections: Array<string> = [KeyCode.ArrowRight, KeyCode.ArrowLeft];

  constructor() {
    this.drawPlayer();
    document.addEventListener('keydown', this.keyDownListener.bind(this), false);
    document.addEventListener('keyup', this.keyUpListener.bind(this), false);
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
    if (this.directions.has(KeyCode.ArrowRight) && this.transform <= Canvas.width - PLAYER_WIDTH) {
      this.transform += PLAYER_STEP;
    } else if (this.directions.has(KeyCode.ArrowLeft) && this.transform >= 0) {
      this.transform -= PLAYER_STEP;
    }

    const y = Canvas.height - PLAYER_HEIGHT;
    Canvas.context.fillStyle = 'white';
    Canvas.context.fillRect(this.transform, y, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
}
