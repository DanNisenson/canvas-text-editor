import { Caret } from "./Caret.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;
const dpr = globalThis.devicePixelRatio;

const config = {
  marginX: 16,
  marginY: 16,
  fillStyle: "white",

  fontFamily: "Courier New",
  fontSize: 14,
  lineHeight: 1.5,

  w: app.clientWidth,
  h: app.clientHeight,
};

const canvas = document.createElement("canvas");
setUpCanvas(app, config);
const ctx = canvas.getContext("2d")!;
const charW = setContextConfig(ctx, config);

const mock = "JjQqGg\nA\nline";

const lines = mock.split("\n");
const caret = new Caret();

draw();

// user input
globalThis.addEventListener("keydown", (e) => {
  if (e.key.length == 1) {
    insertChar(e.key);
  } else if (e.key == "Backspace") {
    deleteChar();
  } else if (e.key == "Enter") {
    insertChar("\n");
  } else if (e.key == "ArrowLeft") {
    caret.moveLeft(lines);
  } else if (e.key == "ArrowRight") {
    caret.moveRight(lines);
  } else if (e.key == "ArrowUp") {
    caret.moveUp(lines);
  } else if (e.key == "ArrowDown") {
    caret.moveDown(lines);
  }
  draw();
});

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, config.w, config.h);

  // add line numbers
  const numLines = lines.map((line, i) => (i + 1) + " " + line);

  numLines.forEach((line, i) => {
    // set scroll
    if (ctx.measureText(line).width - config.marginX > config.w) {
      const w = ctx.measureText(line).width + config.marginX * 2;
      resizeCanvas(w);
    }

    // render text
    const lineY = config.fontSize * config.lineHeight * i;
    ctx.fillText(
      line,
      config.marginX,
      lineY + config.fontSize + config.marginY,
    );
  });

  // render caret
  const caretW = caret.char * charW + config.marginX + charW * 2;
  const caretY = (caret.line) * config.fontSize * config.lineHeight +
    config.marginY;
  ctx.fillRect(
    caretW,
    caretY,
    1,
    config.fontSize * config.lineHeight,
  );
}

function insertChar(char: string) {
  let line = lines[caret.line];
  if (char == "\n") {
    lines[caret.line] = line.slice(0, caret.char);
    lines.splice(caret.line + 1, 0, line.slice(caret.char));
  } else {
    line = line.slice(0, caret.char) + char + line.slice(caret.char);
    lines[caret.line] = line;
  }
  caret.moveRight(lines);
}

function deleteChar() {
  let line = lines[caret.line];
  if (caret.char > 0) {
    line = line.slice(0, caret.char - 1) + line.slice(caret.char);
    lines[caret.line] = line;
    caret.moveLeft(lines);
  } else if (caret.char == 0 && caret.line > 0) {
    const prev = lines[caret.line - 1];
    lines[caret.line - 1] = prev + line;
    lines.splice(caret.line, 1);
    caret.char = prev.length;
    caret.line = caret.line - 1;
  }
}

/* */

function setUpCanvas(
  htmlParent: HTMLElement,
  conf: typeof config,
) {
  initCanvasSize(conf.w, conf.h);
  htmlParent.appendChild(canvas);

  canvas.style.display = "block";
  canvas.style.backgroundColor = "#000000F0";
}

function initCanvasSize(
  width: number,
  height: number,
) {
  // avoid blurriness on devicePixelRatio > 1 displays
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.getContext("2d")!.scale(dpr, dpr);

  return canvas;
}

function resizeCanvas(w: number) {
  canvas.width = w * dpr;
  canvas.style.width = w + "px";
  canvas.getContext("2d")!.scale(dpr, dpr);
  setContextConfig(ctx, config);
}

function setContextConfig(
  ctx: CanvasRenderingContext2D,
  conf: typeof config,
) {
  ctx.font = `${conf.fontSize}px ${conf.fontFamily}`;
  ctx.fillStyle = conf.fillStyle;
  return charth(ctx);
}

function charth(ctx: CanvasRenderingContext2D) {
  const char = " ";
  return ctx.measureText(char).width;
}
