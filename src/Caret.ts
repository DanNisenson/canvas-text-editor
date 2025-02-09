import { Canvas } from "./Canvas.ts";
import { LineIndex } from "./LineIndex.ts";

export class Caret {
  private _canvas: Canvas;
  private _line = 0;
  private _char = 0;

  constructor(canvas: Canvas) {
    this._canvas = canvas;
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

  get x() {
    return this.char * this._canvas.charW +
      this._canvas.config.marginX +
      LineIndex.getWidth(this._canvas.ctx);
  }

  get y() {
    return this.line * this._canvas.config.fontSize *
        this._canvas.config.lineHeight + this._canvas.config.marginY;
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

  jumpToPageStart() {
    this._char = 0;
    this._line = 0;
  }

  jumpToPageEnd(lines: string[]) {
    this._char = lines[lines.length - 1].length;
    this._line = lines.length - 1;
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
    this._canvas.ctx.fillRect(
      this.x,
      this.y,
      1,
      this._canvas.config.fontSize * this._canvas.config.lineHeight,
    );
  }
}
