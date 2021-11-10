export default class Canvas {
  private static instance = <HTMLCanvasElement>document.getElementById('canvas');
  public static context = this.instance.getContext('2d');
  public static width = this.instance.width;
  public static height = this.instance.height;
}
