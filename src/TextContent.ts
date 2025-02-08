import { Canvas } from "./Canvas.ts";
import { Caret } from "./Caret.ts";
import { LineNum } from "./LineNum.ts";

export class TextContent {
  private _canvas: Canvas;
  private _lines: string[];

  constructor(
    canvas: Canvas,
    buffer: string,
  ) {
    this._canvas = canvas;
    this._lines = buffer.split("\n");
  }

  get lines() {
    return this._lines;
  }

  insertChar(char: string, caret: Caret) {
    let line = this._lines[caret.line];
    if (char == "\n") {
      this._lines[caret.line] = line.slice(0, caret.char);
      this._lines.splice(caret.line + 1, 0, line.slice(caret.char));
    } else {
      line = line.slice(0, caret.char) + char + line.slice(caret.char);
      this._lines[caret.line] = line;
    }
    caret.moveRight(this._lines);
  }

  deleteChar(caret: Caret) {
    let line = this._lines[caret.line];
    if (caret.char > 0) {
      line = line.slice(0, caret.char - 1) + line.slice(caret.char);
      this._lines[caret.line] = line;
      caret.moveLeft(this._lines);
    } else if (caret.char == 0 && caret.line > 0) {
      const prev = this._lines[caret.line - 1];
      this._lines[caret.line - 1] = prev + line;
      this._lines.splice(caret.line, 1);
      caret.char = prev.length;
      caret.line = caret.line - 1;
    }
  }

  draw() {
    const lines = this.getLinesWithNumbers();
    this.setHorizontalScroll(lines);
    this.setVerticalScroll(lines);
    this.renderText(lines);
  }

  private getLinesWithNumbers() {
    return this._lines.map((line, i) =>
      LineNum.getLineNumberString(i + 1) + line
    );
  }

  private setHorizontalScroll(lines: string[]) {
    for (const line of lines) {
      const lineW = this.getLineWidth(line);
      if (lineW > this._canvas.w) {
        this._canvas.resizeWidth(lineW);
        break;
      }
    }
  }

  private setVerticalScroll(lines: string[]) {
    const textH = lines.length * this._canvas.config.fontSize *
        this._canvas.config.lineHeight + this._canvas.config.marginY * 2;

    if (textH > this._canvas.h) {
      this._canvas.resizeHeight(textH);
    }
  }

  private renderText(lines: string[]) {
    lines.forEach((line, i) => {
      const lineY = this.getLineY(i);
      this._canvas.ctx.fillText(
        line,
        this._canvas.config.marginX,
        lineY + this._canvas.config.fontSize + this._canvas.config.marginY,
      );
    });
  }

  private getLineWidth(line: string) {
    return this._canvas.ctx.measureText(line).width +
      this._canvas.totalMarginX;
  }

  private getLineY(i: number) {
    return this._canvas.config.fontSize * this._canvas.config.lineHeight * i;
  }
}
