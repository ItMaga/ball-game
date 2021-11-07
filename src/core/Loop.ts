type GameLoopCallback = () => void;

export default class Loop {
  private RAFId = 0;
  private lastTime = 0;
  private readonly delay;
  private readonly callback;

  constructor(delay: number, callback: GameLoopCallback) {
    this.delay = delay;
    this.callback = callback;
  }

  private RAFHandler(timestamp: number) {
    this.RAFId = window.requestAnimationFrame(this.RAFHandler.bind(this));
    if (timestamp - this.lastTime < this.delay) return;
    this.lastTime = timestamp;
    this.callback();
  }

  start() {
    this.RAFId = window.requestAnimationFrame(this.RAFHandler.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.RAFId);
  }
}
