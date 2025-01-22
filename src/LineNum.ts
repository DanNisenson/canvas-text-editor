export class LineNum {
  static getLineNumberString(n: number) {
    const padding = " ".repeat(this.getInverseOrderOfMagnitude(n));
    return padding + n + " ";
  }

  private static getInverseOrderOfMagnitude(num: number) {
    if (num >= 100) return 0;
    if (num >= 10) return 1;
    return 2;
  }

  static getLineNumberWidth(ctx: CanvasRenderingContext2D) {
    return ctx.measureText(this.getLineNumberString(1)).width;
  }
}
