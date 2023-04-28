// Initialize canvas and context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Initialize ball properties
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = -5;

// Initialize paddle properties
let paddleHeight = 75;
let paddleWidth = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let paddleSpeed = 10;

// Initialize scores
let leftScore = 0;
let rightScore = 0;

// Move right paddle based on keyboard input
document.addEventListener("keydown", function(event) {
  if (event.key == "ArrowUp") {
      rightPaddleY -= paddleSpeed;
  }
  if (event.key == "ArrowDown") {
      rightPaddleY += paddleSpeed;
  }
});

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// Draw left paddle on canvas
function drawLeftPaddle() {
  ctx.beginPath();
  ctx.rect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// Draw right paddle on canvas
function drawRightPaddle() {
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// Draw scores on canvas
function drawScores() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + leftScore, 20, 30);
  ctx.fillText("Score: " + rightScore, canvas.width - 100, 30);
}

// Update ball position and check for collisions with walls and paddles
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collision with left paddle
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for collision with right paddle
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for collision with top and bottom walls
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for left player score
  if (ballX - ballRadius < 0) {
    rightScore++;
    resetBall();
  }

  // Check for right player score
  if (ballX + ballRadius > canvas.width) {
    leftScore++;
    resetBall();
  }
}

// Reset ball to center of canvas
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = -ballSpeedY;
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawLeftPaddle();
  drawRightPaddle();
  drawScores();
  update();
  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
