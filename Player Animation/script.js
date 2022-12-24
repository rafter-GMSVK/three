let playerState = "getHit";
const dropDown = document.getElementById("animation");
dropDown.addEventListener("change", (e) => {
  playerState = e.target.value;
});
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const spriteWidth = 575;
const spriteHeight = 523;
const playerImage = new Image();
playerImage.src = "./shadow_dog.png";
let gameFrame = 0;
let staggerFrames = 5;

const spriteAnimation = [];
const animationStates = [
  { name: "idle", frames: 7 },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let postionX = j * spriteWidth;
    let postionY = index * spriteHeight;
    frames.loc.push({ x: postionX, y: postionY });
  }
  spriteAnimation[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimation[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimation[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  gameFrame++;
  if (gameFrame % staggerFrames === 0) {
    frameX = (frameX + 1) % 11;
  }
  requestAnimationFrame(animate);
}

animate();
