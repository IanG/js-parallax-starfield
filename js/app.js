import {BitmapFont} from "./fonts/bitmapfont.js";

let frameCount = 0;
let framesPerSecond = 0;
let startTime = performance.now();
let lastCanvasSize = {};

let starDensity = 2500;
let starField = [];
const MIN_STAR_DENSITY = 20;
const MAX_STAR_DENSITY = 10000;

const canvas = getCanvas();
const ctx = canvas.getContext('2d');
const bitmapFont= new BitmapFont();

document.getElementById("starrange").oninput = function () {
  starDensity = MAX_STAR_DENSITY - this.value + MIN_STAR_DENSITY;
  generateStars();
}

function getCanvas()
{
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return canvas;
}

function calculateFPS()
{
  const ONE_SECOND = 1000;
  const currentTime = performance.now();
  const elapsedTime = currentTime - startTime;

  if (elapsedTime > ONE_SECOND)
  {
    framesPerSecond = frameCount * ONE_SECOND / elapsedTime;
    frameCount = 0;
    startTime = currentTime;
  }
  frameCount++;
}

function drawFPS()
{
  ctx.save();

  ctx.fillStyle = "gold";
  ctx.font = "18px Arial";

  const border = 20;
  const fpsMessage = `${framesPerSecond.toFixed(2)} FPS`;

  const messageTextMetrics = ctx.measureText(fpsMessage);
  const xPos = ctx.canvas.width - messageTextMetrics.width - border;
  const yPos = ctx.canvas.height - (messageTextMetrics.actualBoundingBoxAscent + messageTextMetrics.actualBoundingBoxDescent) - border;

  ctx.fillText(fpsMessage, xPos, yPos);
  ctx.restore();
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw()
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const { width, height } = canvas;

  ctx.save();

  ctx.clearRect(0, 0, width, height);

  drawStars();
  drawText();
  drawFPS();

  ctx.restore();
}

function drawText()
{
  drawPhrase("Javascript Canvas", 175, 100, 50);
  drawPhrase("Parallax Starfield", 150, 200, 50);
  drawPhrase("        *         ", 150, 300, 50);
  drawPhrase("  Bitmapped Font  ", 150, 400, 50);
  drawPhrase("    Experiment    ", 150, 500, 50);
}

function drawPhrase(phrase, x, y, scale)
{
  let curX = x;

  for(let i = 0; i < phrase.length; i++)
  {
    drawLetter(phrase.charAt(i), curX, y, scale, scale);
    curX += (scale + 1);
  }
}

function drawLetter(letter, x, y, w, h)
{
  bitmapFont.drawLetter(ctx, letter, x, y, w, h);
}

function drawStars()
{
  ctx.save();

  starField.forEach(star => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${star.twinkles === true ? star.opacity : 1})`;;
    ctx.arc(star.x, star.y, star.z,0,2 * Math.PI);
    ctx.fill();
  });

  ctx.restore()
}

function animationFrame()
{
  const boundingClientRect = canvas.getBoundingClientRect();
  const willResize = lastCanvasSize.width !== boundingClientRect.width || lastCanvasSize.height !== boundingClientRect.height;

  if (willResize)
  {
    lastCanvasSize = boundingClientRect;
    generateStars();
  }
  else
  {
    calculateFPS();
    moveStars();
    draw();
  }

  requestAnimationFrame(animationFrame);
}

function generateStars()
{
  const maxWidth = ctx.canvas.width;
  const maxHeight = ctx.canvas.height;

  const starCount = Math.floor((maxWidth * maxHeight) / starDensity);

  starField = [];

  for(let i = 0; i < starCount; i++)
  {
    const star = {
      x: getRandomInt(0, maxWidth),
      y: getRandomInt(0, maxHeight),
      z: getRandomInt(1, 3),
      twinkles: getRandomInt(0, 1) !== 0,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02};

    starField.push(star);
  }
}

function moveStars()
{
  starField.forEach(star => {
    // Move
    star.x -= star.z;

    // Wrap
    if (star.x < 0) star.x = ctx.canvas.width;

    // Twinkle
    if (star.twinkles)
    {
      star.opacity += star.twinkleSpeed;
      if (star.opacity > 1 || star.opacity < 0) {
        star.twinkleSpeed =- star.twinkleSpeed;
      }
    }
  })
}

const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    const canvas = entry.target;
    canvas.width = entry.devicePixelContentBoxSize[0].inlineSize;
    canvas.height = entry.devicePixelContentBoxSize[0].blockSize;
    draw();
  }
})

observer.observe(canvas, { box: 'device-pixel-content-box' });
requestAnimationFrame(animationFrame);