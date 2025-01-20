import { AppConfig } from "./main.ts";

export class Canvas {
  readonly canvas = document.createElement("canvas");
  readonly ctx = this.canvas.getContext("2d")!;
  charW!: number;

  private _config: AppConfig;

  constructor(htmlParent: HTMLElement, conf: AppConfig) {
    this._config = conf;
    this.setUpCanvas(htmlParent, conf);
    this.setContextConfig(this.ctx, this._config);
  }

  resizeCanvas(w: number) {
    this.canvas.width = w * this._config.dpr;
    this.canvas.style.width = w + "px";
    this.canvas.getContext("2d")!.scale(this._config.dpr, this._config.dpr);
    this.setContextConfig(this.ctx, this._config);
  }

  setUpCanvas(
    htmlParent: HTMLElement,
    conf: AppConfig,
  ) {
    this.initCanvasSize(conf.w, conf.h);
    htmlParent.appendChild(this.canvas);

    this.canvas.style.display = "block";
    this.canvas.style.backgroundColor = "#000000F0";
  }

  initCanvasSize(
    width: number,
    height: number,
  ) {
    // avoid blurriness on devicePixelRatio > 1 displays
    this.canvas.width = width * this._config.dpr;
    this.canvas.height = height * this._config.dpr;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.getContext("2d")!.scale(this._config.dpr, this._config.dpr);

    return this.canvas;
  }

  setContextConfig(
    ctx: CanvasRenderingContext2D,
    conf: AppConfig,
  ) {
    ctx.font = `${conf.fontSize}px ${conf.fontFamily}`;
    ctx.fillStyle = conf.fillStyle;
    return this.setCharWidth(ctx);
  }

  setCharWidth(ctx: CanvasRenderingContext2D) {
    const char = " ";
    this.charW = ctx.measureText(char).width;
  }
}
