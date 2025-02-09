import { Canvas } from "./Canvas.ts";
import { Caret } from "./Caret.ts";
import { KeyListener } from "./KeyListener.ts";
import { TextContent } from "./TextContent.ts";

export const app = document.querySelector<HTMLDivElement>("#app")!;

const mock =
  "JjQqGg\nA\nline\na\na\ns\nd\na\ns\nd\na\ns\nd\na\ns\nd\na\ns\nd\na\ns\nd\na\nd\na\ng\nh\nd\ns\na\nj\nd\nh\ns\nk\nj\na\nd\nh\nn\ns\nk\njadhskadhksajdhskajdhskajdhskadhskjahdkjsahdkjahkj";

const canvas = new Canvas(app);
const text = new TextContent(canvas, mock);
const caret = new Caret(canvas);
const listener = new KeyListener(draw, canvas, text, caret);

listener.listen();
draw();

export function draw() {
  canvas.clear();
  text.draw();
  caret.draw();
}

// resize
globalThis.addEventListener("resize", () => {
  canvas.handleScreenResize();
  draw();
});
