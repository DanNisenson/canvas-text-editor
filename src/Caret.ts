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
        this.jumpToLineEnd(lines);
      }
    }
  }

  moveUp(lines: string[]) {
    if (this._line > 0) {
      this._line--;
      if (this._char > lines[this._line].length) {
        this.jumpToLineEnd(lines);
      }
    }
  }

  jumpToLineStart() {
    this._char = 0;
  }

  jumpToLineEnd(lines: string[]) {
    this._char = lines[this._line].length;
  }

  jumpToWordStart(lines: string[]) {
    if (this._char === 0) return;

    const line = lines[this._line];
    let i = 0;
    let charsAfterSpace = 0;

    for (i = 0; i < line.length; i++) {
      const char = line[i];
      const prevChar = line[i - 1];

      // count until we reach cursor
      if (i === this._char) break;
      // count chars in word and include trailing whitespace until we reach the next word
      if (prevChar === " " && char !== " ") {
        charsAfterSpace = 1;
      } else {
        charsAfterSpace++;
      }
    }

    this._char -= charsAfterSpace || 1;
  }

  jumpToWordEnd(lines: string[]) {
    const line = lines[this._line];
    if (this._char >= line.length) return;

    let i = 0;
    let charsAfterSpace = 0;

    for (i = line.length; i >= 0; i--) {
      const char = line[i];
      const nextChar = line[i + 1];

      // count until we reach cursor
      if (i === this._char) break;
      // count chars in word and include trailing whitespace until we reach the next word
      if (nextChar === " " && char !== " ") {
        charsAfterSpace = 2;
      } else {
        charsAfterSpace++;
      }
    }

    this._char += charsAfterSpace || 1;
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
