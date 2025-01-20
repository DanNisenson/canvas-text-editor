import { Canvas } from "./Canvas.ts";
import { Caret } from "./Caret.ts";
import { AppConfig } from "./main.ts";

export class TextContent {
  private _canvas: Canvas;
  private _config: AppConfig;
  private _lines: string[];

  constructor(
    canvas: Canvas,
    config: AppConfig,
    buffer: string,
  ) {
    this._canvas = canvas;
    this._config = config;
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
    // add line numbers
    const numLines = this._lines.map((line, i) => (i + 1) + " " + line);

    numLines.forEach((line, i) => {
      // set scroll
      if (
        this._canvas.ctx.measureText(line).width - this._config.marginX >
          this._config.w
      ) {
        const w = this._canvas.ctx.measureText(line).width +
          this._config.marginX * 2;
        this._canvas.resizeCanvas(w);
      }

      // render text
      const lineY = this._config.fontSize * this._config.lineHeight * i;
      this._canvas.ctx.fillText(
        line,
        this._config.marginX,
        lineY + this._config.fontSize + this._config.marginY,
      );
    });
  }
}
