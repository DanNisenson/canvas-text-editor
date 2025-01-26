import { Canvas } from "./Canvas.ts";
import { Caret } from "./Caret.ts";
import { TextContent } from "./TextContent.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

export type AppConfig = typeof config;
const config = {
  w: app.clientWidth,
  h: app.clientHeight,
  dpr: globalThis.devicePixelRatio,

  marginX: 16,
  marginY: 16,
  fillStyle: "white",

  fontFamily: "Courier New",
  fontSize: 14,
  lineHeight: 1.5,
};

const mock = "JjQqGg\nA\nline";

const canvas = new Canvas(app, config);
const text = new TextContent(canvas, config, mock);
const caret = new Caret(canvas, config);

draw();

// user input
globalThis.addEventListener("keydown", (e) => {
  if (e.key.length == 1) {
    text.insertChar(e.key, caret);
  } else if (e.key == "Backspace") {
    text.deleteChar(caret);
  } else if (e.key == "Enter") {
    text.insertChar("\n", caret);
  }
  onArrowKeyDown(e);
  draw();
});

function draw() {
  canvas.ctx.clearRect(0, 0, config.w, config.h);
  text.draw();
  caret.draw();
}

function onArrowKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  if (e.key == "ArrowLeft") {
    caret.moveLeft(text.lines);
  } else if (e.key == "ArrowRight") {
    caret.moveRight(text.lines);
  } else if (e.key == "ArrowUp") {
    caret.moveUp(text.lines);
  } else if (e.key == "ArrowDown") {
    caret.moveDown(text.lines);
  }
}
