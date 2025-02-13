import { Canvas } from "./Canvas.ts";
import { Caret } from "./Caret.ts";
import { TextContent } from "./TextContent.ts";

export class KeyListener {
  constructor(
    private _draw: () => void,
    private _canvas: Canvas,
    private _text: TextContent,
    private _caret: Caret,
  ) {}

  listen() {
    globalThis.addEventListener("keydown", (e) => {
      // char keys will always be length 1
      // avoid inserting char when shortcut is intended
      if (e.key.length == 1 && !e.metaKey && !e.ctrlKey) {
        this.insertChar(e.key);
      } else if (e.metaKey) {
        this.performMetaActions(e.key);
      } else if (e.ctrlKey) {
        //
      } else if (e.altKey) {
        this.performAltActions(e.key);
      } else {
        this.performKeyAction(e.key);
      }

      e.preventDefault();
      this._draw();
    });
  }

  private insertChar(key: string) {
    this._text.insertChar(key, this._caret);
  }

  private performKeyAction(key: string) {
    switch (key) {
      // text input
      case "Backspace":
        this._text.deleteChar(this._caret);
        break;
      case "Enter":
        this._text.insertChar("\n", this._caret);
        break;

      // arrows
      case ("ArrowLeft"):
        this._caret.moveLeft(this._text.lines);
        break;
      case ("ArrowRight"):
        this._caret.moveRight(this._text.lines);
        break;
      case ("ArrowUp"):
        this._caret.moveUp(this._text.lines);
        break;
      case ("ArrowDown"):
        this._caret.moveDown(this._text.lines);
        break;
    }
  }

  private performMetaActions(key: string) {
    switch (key) {
      case "ArrowLeft":
        this._caret.jumpToLineStart();
        break;
      case "ArrowRight":
        this._caret.jumpToLineEnd(this._text.lines);
        break;
      case ("ArrowUp"):
        this._caret.jumpToPageStart();
        this._canvas.scrollToTop();
        break;
      case ("ArrowDown"):
        this._caret.jumpToPageEnd(this._text.lines);
        this._canvas.scrollToBottom(this._caret.x);
        break;
    }
  }

  private performAltActions(key: string) {
    switch (key) {
      case "ArrowLeft":
        this._caret.jumpToWordStart(this._text.lines);
        break;
      case "ArrowRight":
        this._caret.jumpToWordEnd(this._text.lines);
        break;
    }
  }
}
