import { Canvas } from "./Canvas.ts";
import { Caret } from "./Caret.ts";
import { KeyListener } from "./KeyListener.ts";
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

const mock =
  "JjQqGg\nA\nline\na\na\ns\nd\na\ns\nd\na\ns\nd\na\ns\nd\na\ns\nd\na\ns\nd\na\nd\na\ng\nh\nd\ns\na\nj\nd\nh\ns\nk\nj\na\nd\nh\nn\ns\nk\njadhskadhksajdhskajdhskajdhskadhskjahdkjsahdkjahkj";

const canvas = new Canvas(app, config);
const text = new TextContent(canvas, config, mock);
const caret = new Caret(canvas, config);
const listener = new KeyListener(draw, text, caret);

listener.listen();
draw();

function draw() {
  console.log("draw");
  canvas.ctx.clearRect(0, 0, config.w, config.h);
  text.draw();
  caret.draw();
}

// resize
globalThis.addEventListener("resize", () => {
  config.w = app.clientWidth;
  config.h = app.clientHeight;
  canvas.resize(config.w, config.h);
  draw();
});
