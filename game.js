const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const SPEED = 7;

let currentLevelIndex = 0;
let level = LEVELS[currentLevelIndex];

let player = {
  x: 100,
  y: 300,
  width: 30,
  height: 30,
  vy: 0,
  onGround: false
};

let cameraX = 0;
let gameOver = false;
let levelComplete = false;

function loadLevel(index) {
  currentLevelIndex = index;
  level = LEVELS[currentLevelIndex];
  reset();
}

function reset() {
  player.x = 100;
  player.y = 300;
  player.vy = 0;
  cameraX = 0;
  gameOver = false;
  levelComplete = false;
}

function update() {
  if (gameOver || levelComplete) return;

  // Auto-run
  cameraX += SPEED;

  // Gravity
  player.vy += GRAVITY;
  player.y += player.vy;

  // Ground
  const groundY = 370;
  if (player.y + player.height > groundY) {
    player.y = groundY - player.height;
    player.vy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }

  // Level complete check
  if (cameraX > level.length) {
    levelComplete = true;
    setTimeout(() => {
      if (currentLevelIndex < LEVELS.length - 1) {
        loadLevel(currentLevelIndex + 1);
      } else {
        // all levels done
        reset();
      }
    }, 1000);
  }

  // Collision with obstacles
  for (let obs of level.obstacles) {
    const obsScreenX = obs.x - cameraX;

    if (
      player.x < obsScreenX + obs.width &&
      player.x + player.width > obsScreenX &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      gameOver = true;
      setTimeout(reset, 1000);
      break;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ground
  ctx.fillStyle = '#444';
  ctx.fillRect(0, 370, canvas.width, 30);

  // Player
  ctx.fillStyle = '#0ff';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Obstacles
  for (let obs of level.obstacles) {
    const obsScreenX = obs.x - cameraX;
    if (obsScreenX + obs.width < 0 || obsScreenX > canvas.width) continue;

    if (obs.type === 'spike') {
      ctx.fillStyle = '#f33';
    } else if (obs.type === 'block') {
      ctx.fillStyle = '#ff0';
    } else {
      ctx.fillStyle = '#fff';
    }

    ctx.fillRect(obsScreenX, obs.y, obs.width, obs.height);
  }

  // Text
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText(level.name, 10, 20);

  if (gameOver) {
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
  }

  if (levelComplete) {
    ctx.font = '30px Arial';
    ctx.fillText('Level Complete!', canvas.width / 2 - 120, canvas.height / 2);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Jump input
function tryJump() {
  if (player.onGround && !gameOver && !levelComplete) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    tryJump();
  }
});

window.addEventListener('mousedown', () => {
  tryJump();
});

loop();
