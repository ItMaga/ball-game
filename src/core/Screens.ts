import Canvas from './Canvas';

export default class Screens {
  public static drawGameOverScreen() {
    Canvas.context.font = '48px serif';
    Canvas.context.textAlign = 'center';
    Canvas.context.textBaseline = 'middle';
    Canvas.context.fillText('GAME OVER', Canvas.width / 2, Canvas.height / 2);
  }

  public static drawPlayerWinScreen() {
    Canvas.context.font = '48px serif';
    Canvas.context.textAlign = 'center';
    Canvas.context.textBaseline = 'middle';
    Canvas.context.fillText('WIN!', Canvas.width / 2, Canvas.height / 2);
  }
}
