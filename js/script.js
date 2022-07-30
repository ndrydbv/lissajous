let ctx, canvas;

const PARAM_C = 1;
const PARAM_D = 1;
const SIZE = 2;
const T_INTERVAL = 0.0001;

let colorize = false;

function init() {
  window.addEventListener("resize", onWindowResize);
  setupCanvas();
  beginCurve();
}

function onWindowResize() {
  setupCanvas();
  reset();
}

function setupCanvas() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth - 125;
  canvas.height = window.innerHeight;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#00ff7f";
  ctx.fillStyle = "#00ff7f";
}

function beginCurve() {
  let t = Math.PI * 13.334;

  let r = Math.floor(Math.random() * 155);
  let g = Math.floor(Math.random() * 155);
  let b = Math.floor(Math.random() * 155);

  setInterval(() => {
    if (colorize) {
      r += Math.random() > 0.5 ? 3 : -3;
      g += Math.random() > 0.5 ? 3 : -3;
      b += Math.random() > 0.5 ? 3 : -3;
      const newColor = `rgba(${100 + (r % 155)},${100 + (g % 155)},${100 + (b % 155)})`;
      ctx.fillStyle = newColor;
    }
    t = plotLissajous(t);
  }, 2);
}

function plotLissajous(t) {
  const a = document.getElementById("a").value;
  const b = document.getElementById("b").value;
  const speed = document.getElementById("speed").value;

  const xAmplitude = canvas.width * 0.465;
  const yAmplitude = canvas.height * 0.45;
  const allPoints = Math.floor(speed * 200);

  for (let n = 0; n < allPoints; n++) {
    const x = xAmplitude * Math.sin(t * a + PARAM_C);
    const y = yAmplitude * Math.sin(t * b + PARAM_D);
    drawPoint(x, y);
    t += T_INTERVAL;
  }
  return t;
}

function drawPoint(x, y) {
  const xCenter = canvas.width * 0.5;
  const yCenter = canvas.height * 0.5;

  ctx.beginPath();
  ctx.arc(xCenter + x, yCenter + y, SIZE / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function toggleColorize() {
  colorize = !colorize;
  const colorizeButton = document.getElementById("colorizeButton");
  if (!colorize) {
    colorizeButton.style.backgroundColor = "#d3d3d3";
    colorizeButton.style.border = "none";
    ctx.strokeStyle = "#00FF7F";
    ctx.fillStyle = "#00FF7F";
  } else {
    colorizeButton.style.backgroundColor = "white";
    colorizeButton.style.border = "1px solid #d3d3d3";
  }
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init();
