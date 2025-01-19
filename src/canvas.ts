import { AppConfig } from "./main.ts";

const dpr = globalThis.devicePixelRatio;

export function setUpCanvas(
  htmlParent: HTMLElement,
  config: AppConfig,
): CanvasRenderingContext2D {
  const canvas = document.createElement("canvas");

  const w = htmlParent.clientWidth;
  const h = htmlParent.clientHeight;
  setHiPPICanvasSize(canvas, w, h);
  htmlParent.appendChild(canvas);

  canvas.style.display = "block";
  canvas.style.backgroundColor = "#000000F0";

  const ctx = canvas.getContext("2d")!;
  ctx.font = `${config.fontSize}px Courier`;
  ctx.fillStyle = "white";

  return ctx;
}

// avoid blurriness on high dpi displays
function setHiPPICanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.getContext("2d")!.scale(dpr, dpr);

  return canvas;
}
