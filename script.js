/* eslint-disable max-classes-per-file */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
/* const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 70;
const brickRowCount = 5;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const bricks = [];
let score = 0;
let lives = 5;
let ballColor = '#0095DD';
let paddleX = (canvas.width - paddleWidth) / 2; */
let rightPressed = false;
let leftPressed = false;

class Sprite {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  render() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Ball extends Sprite {
  constructor(x, y, radius, color) {
    // Must pass params to super when extending a class!
    super(x, y, radius * 2, radius * 2, color);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Brick extends Sprite {
  constructor(x, y, color = 'red', width = 0, height = 0) {
    // Must pass params to super when extending a class!
    super(x, y, color, width, height);
    this.status = 1;
  }
}

class Paddle extends Sprite {
  constructor(x, y) {
    // Must pass params to super when extending a class!
    super(x, y);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}
class GameLabel extends Sprite {
  constructor(x, y, text, font = '16px Helvetica', color = 'red', align = 'left') {
    super(x, y, color);
    this.align = align;
    this.text = text;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.textAlign = this.align;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${score}`, 8, 20);
  }
}

class Bricks {
  constructor(rows = 3, cols = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.setup();
  }

  setup() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = o; r < this.rows; r += 1) {
        const brick = new Brick();
        brick.x = (c * (brick.width + 10)) + 30;
        brick.y = (r * (brick.height + 10)) + 30;
        this.bricks[c][r] = brick;
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

/* function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
 */
/* function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
} */

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/* function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          ballColor = getRandomColor();
          score += 5;
          if (score >= (125)) {
            // eslint-disable-next-line no-alert
            alert(`YOU WIN, CONGRATULATIONS! ${score}`);
            document.location.reload();
          }
        }
      }
    }
  }
} */

const ball = new Ball(100, 300, 10, 'orange');
function wallBounce() {
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
    ball.color = getRandomColor();
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    ball.color = getRandomColor();
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
} 


function draw() {
// drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.moveTo(ball.x, ball.y);
  ball.render();
  /* collisionDetection();
  drawBricks();
  if (rightPressed) {
    paddleX += 4;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 4;
    if (paddleX < 0) {
      paddleX = 0;
    }
  } */
  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

draw();
