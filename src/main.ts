import { setUpCanvas } from "./canvas.ts";

export type AppConfig = {
  fontSize: number;
  margin: number;
};

const app = document.querySelector<HTMLDivElement>("#app")!;

const config = {
  fontSize: 16,
  margin: 16,
};

const ctx = setUpCanvas(app, config);
const string = "Hello world\nThis is my editor\n";
string.split("\n").forEach((line, i) => {
  ctx.fillText(line, config.margin, config.margin + i * config.fontSize);
});
