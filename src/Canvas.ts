import { AppConfig } from "./main.ts";

export class Canvas {
  readonly canvas = document.createElement("canvas");
  readonly ctx = this.canvas.getContext("2d")!;
  charW!: number;

  private _config: AppConfig;

  constructor(htmlParent: HTMLElement, conf: AppConfig) {
    this._config = conf;
    this.setUp(htmlParent, conf);
    this.setContextConfig(this.ctx, this._config);
  }

  get width() {
    return this.canvas.width / this._config.dpr;
  }

  get marginX() {
    return this._config.marginX * 2;
  }

  resizeWidth(w: number) {
    this.resize(w + this.marginX, this._config.h);
  }

  resizeHeight(h: number) {
    this.resize(this._config.w, h);
  }

  resize(w: number, h: number) {
    this.canvas.width = w * this._config.dpr;
    this.canvas.height = h * this._config.dpr;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.canvas.getContext("2d")!.scale(this._config.dpr, this._config.dpr);
    this.setContextConfig(this.ctx, this._config);
  }

  setUp(
    htmlParent: HTMLElement,
    conf: AppConfig,
  ) {
    this.initSize(conf.w, conf.h);
    htmlParent.appendChild(this.canvas);

    this.canvas.parentElement!.style.display = "flex";
    this.canvas.style.display = "block";
    this.canvas.style.backgroundColor = "#000000F0";
  }

  initSize(
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
