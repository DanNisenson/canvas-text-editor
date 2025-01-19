const app = document.querySelector<HTMLDivElement>("#app")!;
const dpr = globalThis.devicePixelRatio;
const canvas = document.createElement("canvas");

const config = {
  marginX: 16,
  marginY: 100,
  fillStyle: "white",

  fontFamily: "Courier New",
  fontSize: 16,
  lineHeight: 1.5,

  w: app.clientWidth,
  h: app.clientHeight,
};

const ctx = setUpCanvas(app, config);

let buffer = "JjQqGg Lorem ipsum dolor sit amet consectetur adipiscing elit. ";

draw();

// user input
globalThis.addEventListener("keydown", (e) => {
  if (e.key.length == 1) {
    buffer += e.key;
  } else if (e.key == "Backspace") {
    buffer = buffer.slice(0, buffer.length - 1);
  } else if (e.key == "Enter") {
    buffer += "\n";
  }
  draw();
});

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, config.w, config.h);

  let caretY = config.fontSize * config.lineHeight;

  // add line numbers
  const lines = buffer.split("\n").map((line, i) => (i + 1) + " " + line);

  lines.forEach((line, i) => {
    // set scroll
    if (ctx.measureText(line).width - config.marginX > config.w) {
      const w = ctx.measureText(line).width + config.marginX * 2;
      resizeCanvas(w);
    }

    // render text
    const lineY = config.fontSize * config.lineHeight * (i + 1);
    caretY = lineY;

    ctx.fillText(line, config.marginX, lineY + config.fontSize);
  });

  const w = ctx.measureText(lines.at(-1)!).width + config.marginX;
  // render caret
  ctx.fillRect(
    w,
    caretY,
    1,
    config.fontSize * config.lineHeight,
  );
}

function resizeCanvas(w: number) {
  canvas.width = w * dpr;
  canvas.style.width = w + "px";
  canvas.getContext("2d")!.scale(dpr, dpr);
  setContextConfig(ctx, config);
}

function setUpCanvas(
  htmlParent: HTMLElement,
  conf: typeof config,
): CanvasRenderingContext2D {
  setCanvasSize(conf.w, conf.h);
  htmlParent.appendChild(canvas);

  canvas.style.display = "block";
  canvas.style.backgroundColor = "#000000F0";

  const ctx = canvas.getContext("2d")!;
  setContextConfig(ctx, conf);

  return ctx;
}

function setCanvasSize(
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

function setContextConfig(
  ctx: CanvasRenderingContext2D,
  conf: typeof config,
) {
  ctx.font = `${conf.fontSize}px ${conf.fontFamily}`;
  ctx.fillStyle = conf.fillStyle;
}
