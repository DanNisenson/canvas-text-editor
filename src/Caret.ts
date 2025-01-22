import { Canvas } from "./Canvas.ts";
import { LineNum } from "./LineNum.ts";
import { AppConfig } from "./main.ts";

export class Caret {
  private _canvas: Canvas;
  private _config: AppConfig;
  private _line = 0;
  private _char = 0;

  constructor(canvas: Canvas, config: AppConfig) {
    this._canvas = canvas;
    this._config = config;
  }

  get line() {
    return this._line;
  }

  set line(line: number) {
    this._line = line;
  }

  get char() {
    return this._char;
  }

  set char(char: number) {
    this._char = char;
  }

  moveRight(lines: string[]) {
    if (this._char <= (lines[this._line].length - 1)) {
      this._char++;
    } else if (this._line < (lines.length - 1)) {
      this._char = 0;
      this._line++;
    }
  }

  moveLeft(lines: string[]) {
    if (this._char > 0) {
      this._char--;
    } else if (this._line > 0) {
      this._line--;
      this._char = lines[this._line].length;
    }
  }

  moveDown(lines: string[]) {
    if (this._line < (lines.length - 1)) {
      this._line++;
      if (this._char > lines[this._line].length) {
        this.moveToLineEnd(lines);
      }
    }
  }

  moveUp(lines: string[]) {
    if (this._line > 0) {
      this._line--;
      if (this._char > lines[this._line].length) {
        this.moveToLineEnd(lines);
      }
    }
  }

  moveToLineEnd(lines: string[]) {
    this._char = lines[this._line].length;
  }

  moveToLineStart() {
    this._char = 0;
  }

  draw() {
    const caretW = this.char * this._canvas.charW + this._config.marginX +
      LineNum.getLineNumberWidth(this._canvas.ctx);
    const caretY = this.line * this._config.fontSize * this._config.lineHeight +
      this._config.marginY;
    this._canvas.ctx.fillRect(
      caretW,
      caretY,
      1,
      this._config.fontSize * this._config.lineHeight,
    );
  }
}
