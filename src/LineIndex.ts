/**
 * The little line index at the beginning of each line
 */
export class LineIndex {
  /**
   * Pad number with spaces to the left
   */
  static getPaddedString(idx: number) {
    const padding = " ".repeat(this.getInverseOrderOfMagnitude(idx));
    return padding + idx + " ";
  }

  private static getInverseOrderOfMagnitude(idx: number) {
    if (idx >= 100) return 0;
    if (idx >= 10) return 1;
    return 2;
  }

  static getWidth(ctx: CanvasRenderingContext2D) {
    return ctx.measureText(this.getPaddedString(1)).width;
  }
}
