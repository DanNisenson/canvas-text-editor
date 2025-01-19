const app = document.querySelector<HTMLDivElement>("#app")!;
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
app.appendChild(canvas);

canvas.style.backgroundColor = "ivory";
canvas.style.display = "block";
canvas.width = globalThis.innerWidth;
canvas.height = globalThis.innerHeight;
