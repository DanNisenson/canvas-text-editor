export type AppConfig = typeof config;
const config = {
  dpr: globalThis.devicePixelRatio,

  marginX: 16,
  marginY: 16,
  fillStyle: "white",

  fontFamily: "Courier New",
  fontSize: 14,
  lineHeight: 1.5,
};

export class Canvas {
  charW!: number;

  readonly config = config;
  private readonly _wrapper = document.createElement("div");
  private readonly _canvas = document.createElement("canvas");
  private readonly _ctx = this._canvas.getContext("2d")!;

  constructor(htmlParent: HTMLElement) {
    this.init(htmlParent);
    this.setContextConfig(this._ctx, this.config);
  }

  get ctx() {
    return this._ctx;
  }

  get w() {
    return this._canvas.width / this.config.dpr;
  }

  get h() {
    return this._canvas.height / this.config.dpr;
  }

  get totalMarginX() {
    return this.config.marginX * 2;
  }

  resizeWidth(w: number) {
    this.resize(w + this.totalMarginX, this.h);
  }

  resizeHeight(h: number) {
    this.resize(this.w, h);
  }

  handleScreenResize() {
    this.resize(this._wrapper.clientWidth, this._wrapper.clientHeight);
  }

  clear() {
    this._ctx.clearRect(0, 0, this.w, this.h);
  }

  scrollToTop() {
    this._wrapper.scroll({
      top: 0,
      left: 0,
    });
  }

  scrollToBottom(x: number) {
    this._wrapper.scroll({
      top: this._wrapper.scrollHeight,
      left: x,
    });
  }

  private resize(w: number, h: number) {
    w = w > this._wrapper.clientWidth ? w : this._wrapper.clientWidth;
    h = h > this._wrapper.clientHeight ? h : this._wrapper.clientHeight;
    this._canvas.width = w * this.config.dpr;
    this._canvas.height = h * this.config.dpr;
    this._canvas.style.width = w + "px";
    this._canvas.style.height = h + "px";
    this._canvas.getContext("2d")!.scale(this.config.dpr, this.config.dpr);
    this.setContextConfig(this._ctx, this.config);
  }

  private init(htmlParent: HTMLElement) {
    htmlParent.appendChild(this._wrapper);
    this._wrapper.appendChild(this._canvas);

    this.initSize();

    this._wrapper.style.overflow = "auto";
    this._wrapper.style.maxHeight = "100%";
    this._wrapper.style.display = "flex";
  }

  private initSize() {
    // avoid blurriness on devicePixelRatio > 1 displays
    this._canvas.width = this._wrapper.clientWidth * this.config.dpr;
    this._canvas.height = this._wrapper.clientHeight * this.config.dpr;
    this._canvas.style.width = this._wrapper.clientWidth + "px";
    this._canvas.style.height = this._wrapper.clientHeight + "px";
    this._canvas.getContext("2d")!.scale(this.config.dpr, this.config.dpr);

    return this._canvas;
  }

  private setContextConfig(ctx: CanvasRenderingContext2D, conf: AppConfig) {
    ctx.font = `${conf.fontSize}px ${conf.fontFamily}`;
    ctx.fillStyle = conf.fillStyle;
    return this.setCharWidth(ctx);
  }

  private setCharWidth(ctx: CanvasRenderingContext2D) {
    const char = " ";
    this.charW = ctx.measureText(char).width;
  }
}
