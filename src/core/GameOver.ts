import Canvas from './Canvas';

export default class GameOver {
  public static drawScreen() {
    Canvas.context.font = '48px serif';
    Canvas.context.textAlign = 'center';
    Canvas.context.textBaseline = 'middle';
    Canvas.context.fillText('GAME OVER', Canvas.width / 2, Canvas.height / 2);
  }
}
