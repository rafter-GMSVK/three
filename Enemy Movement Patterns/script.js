const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 15;
const enemyArray = [];

let grameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy4.png";
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.newX = Math.random() * (CANVAS_WIDTH - this.width);
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update() {
    if (grameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 20;
    this.y -= dy / 20;
    if (grameFrame % this.flapSpeed === 0)
      this.frame > 4 ? (this.frame = 0) : this.frame++;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemyArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemyArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  grameFrame++;
  requestAnimationFrame(animate);
}
animate();
