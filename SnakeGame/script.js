// 🏆 Score Variables
let score = 0; 
let scoreDisplay = document.getElementById("scoreDisplay");

// 🎮 Canvas Setup
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// 🐍 Snake Setup
let snake = [{ x: 200, y: 200 }];
let snakeSize = 20;
let direction = "RIGHT";

// 🍎 Food Setup
let food = spawnFood();

// 🎮 Move Snake
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= snakeSize;
    if (direction === "DOWN") head.y += snakeSize;
    if (direction === "LEFT") head.x -= snakeSize;
    if (direction === "RIGHT") head.x += snakeSize;

    // 🌍 Wrap-Around Effect (Wall se touch hone pe dusri side aaye)
    if (head.x < 0) head.x = canvas.width - snakeSize;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - snakeSize;
    if (head.y >= canvas.height) head.y = 0;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.innerText = "Score: " + score;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

// 🍎 Food Spawn Logic
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize
    };
}

// 🎮 Draw Snake
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach((part, index) => {
        ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(part.x, part.y, snakeSize, snakeSize);
    });
}

// 🍎 Draw Food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// 🚨 Check Game Over (Sirf apni body se takrane par)
function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            alert("Game Over! 😢");
            location.reload();
        }
    }
}

// 🎮 Update Game Loop
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    checkCollision();
    drawSnake();
}

// ⌨️ Controls
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 🔄 Start Game Loop
setInterval(updateGame, 100);
