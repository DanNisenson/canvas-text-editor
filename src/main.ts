const app = document.querySelector<HTMLDivElement>("#app")!;
const dpr = globalThis.devicePixelRatio;
const canvas = document.createElement("canvas");

const appConfig = {
  fillStyle: "white",
  fontFamily: "Courier",
  fontSize: 16,
  h: app.clientHeight,
  margin: 16,
  w: app.clientWidth,
};

const ctx = setUpCanvas(app, appConfig);

const buffer =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. \nThis is a new line\nOne more\n";

buffer.split("\n").forEach((line, i) => {
  // set scroll
  if (ctx.measureText(line).width - appConfig.margin > appConfig.w) {
    appConfig.w = ctx.measureText(line).width + appConfig.margin * 2;
    resizeCanvas(appConfig.w);
  }
  // render line
  ctx.fillText(line, appConfig.margin, appConfig.margin * (i + 1));
});

function resizeCanvas(w: number) {
  canvas.width = w * dpr;
  canvas.style.width = w + "px";
  canvas.getContext("2d")!.scale(dpr, dpr);
  setContextConfig(ctx, appConfig);
}

function setUpCanvas(
  htmlParent: HTMLElement,
  config: typeof appConfig,
): CanvasRenderingContext2D {
  setCanvasSize(config.w, config.h);
  htmlParent.appendChild(canvas);

  canvas.style.display = "block";
  canvas.style.backgroundColor = "#000000F0";

  const ctx = canvas.getContext("2d")!;
  setContextConfig(ctx, config);

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
  config: typeof appConfig,
) {
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.fillStyle = config.fillStyle;
}
