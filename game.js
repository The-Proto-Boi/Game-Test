// =========================
//  BASIC SETUP
// =========================
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const menu = document.getElementById('menu');
const levelList = document.getElementById('level-list');

const GRAVITY_NORMAL = 0.6;
const GRAVITY_FLIPPED = -0.6;
const JUMP_FORCE = -12;
const BASE_SPEED = 7;

let currentLevel = null;
let cameraX = 0;
let speedMultiplier = 1.0;
let gravity = GRAVITY_NORMAL;
let mode = "cube"; // "cube" or "ship"

let gameOver = false;
let levelComplete = false;

let player = {
  x: 100,
  y: 300,
  w: 30,
  h: 30,
  vy: 0,
  onGround: false
};

// =========================
//  LEVEL SELECT MENU
// =========================
function buildLevelMenu() {
  levelList.innerHTML = "";
  LEVELS.forEach(level => {
    const btn = document.createElement('button');
    btn.textContent = `${level.id}. ${level.name}`;
    btn.onclick = () => startLevel(level.id);
    levelList.appendChild(btn);
  });
}

function startLevel(id) {
  currentLevel = LEVELS.find(l => l.id === id);
  speedMultiplier = currentLevel.startSpeed || 1.0;
  gravity = GRAVITY_NORMAL;
  mode = "cube";
  resetPlayer();

  menu.style.display = 'none';
  canvas.style.display = 'block';
}

buildLevelMenu();

// =========================
//  PLAYER RESET
// =========================
function resetPlayer() {
  player.x = 100;
  player.y = 300;
  player.vy = 0;
  cameraX = 0;
  gameOver = false;
  levelComplete = false;
}

// =========================
//  MAIN UPDATE LOOP
// =========================
function update() {
  if (!currentLevel || gameOver || levelComplete) return;

  const SPEED = BASE_SPEED * speedMultiplier;
  cameraX += SPEED;

  if (mode === "cube") {
    player.vy += gravity;
    player.y += player.vy;
  } else if (mode === "ship") {
    player.vy += gravity * 0.4;
    player.y += player.vy;
  }

  handleGroundCeiling();
  handleObjects();
  checkLevelComplete();
}

// =========================
//  GROUND & CEILING
// =========================
function handleGroundCeiling() {
  const groundY = 370;
  const ceilingY = 0;

  if (gravity === GRAVITY_NORMAL) {
    if (player.y + player.h > groundY) {
      player.y = groundY - player.h;
      player.vy = 0;
      player.onGround = true;
    } else {
      player.onGround = false;
    }
  } else {
    if (player.y < ceilingY) {
      player.y = ceilingY;
      player.vy = 0;
      player.onGround = true;
    } else {
      player.onGround = false;
    }
  }
}

// =========================
//  OBJECT HANDLING
// =========================
function handleObjects() {
  for (let obj of currentLevel.objects) {
    const screenX = obj.x - cameraX;
    if (screenX + obj.w < 0 || screenX > canvas.width) continue;

    const hitbox = { x: screenX, y: obj.y, w: obj.w, h: obj.h };

    if (obj.type === "portal") {
      if (isColliding(player, hitbox)) applyPortal(obj);
      continue;
    }

    if (isColliding(player, hitbox)) {
      gameOver = true;
    }
  }

  if (gameOver) {
    setTimeout(() => {
      resetPlayer();
      menu.style.display = 'block';
      canvas.style.display = 'none';
      currentLevel = null;
    }, 800);
  }
}

// =========================
//  PORTAL EFFECTS
// =========================
function applyPortal(p) {
  if (p.portalType === "speed") {
    speedMultiplier = p.factor || 1.0;
  } else if (p.portalType === "gravity") {
    gravity = (gravity === GRAVITY_NORMAL) ? GRAVITY_FLIPPED : GRAVITY_NORMAL;
    player.vy = 0;
  } else if (p.portalType === "mode") {
    mode = p.mode || "cube";
    player.vy = 0;
  }
}

// =========================
//  LEVEL COMPLETE
// =========================
function checkLevelComplete() {
  if (cameraX > currentLevel.length) {
    levelComplete = true;
    setTimeout(() => {
      menu.style.display = 'block';
      canvas.style.display = 'none';
      currentLevel = null;
    }, 800);
  }
}

// =========================
//  COLLISION CHECK
// =========================
function isColliding(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// =========================
//  INPUT HANDLING
// =========================
let shipThrust = false;

function tryJump() {
  if (mode === "cube") {
    if (player.onGround && !gameOver && !levelComplete && currentLevel) {
      player.vy = (gravity === GRAVITY_NORMAL) ? JUMP_FORCE : -JUMP_FORCE;
      player.onGround = false;
    }
  }
}

window.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    if (mode === "cube") tryJump();
    else if (mode === "ship") shipThrust = true;
  }
});

window.addEventListener('keyup', e => {
  if (mode === "ship" && (e.code === 'Space' || e.code === 'ArrowUp')) {
    shipThrust = false;
  }
});

function shipUpdate() {
  if (mode === "ship" && shipThrust) {
    player.vy -= 0.8;
  }
}

// =========================
//  DRAWING
// =========================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bg = currentLevel?.backgroundColor || "#111";
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#444';
  ctx.fillRect(0, 370, canvas.width, 30);

  ctx.fillStyle = (mode === "cube") ? '#0ff' : '#0f0';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  if (!currentLevel) return;

  for (let obj of currentLevel.objects) {
    const screenX = obj.x - cameraX;
    if (screenX + obj.w < 0 || screenX > canvas.width) continue;

    if (obj.type === "spike") {
      ctx.fillStyle = '#f33';
      ctx.fillRect(screenX, obj.y, obj.w, obj.h);
    } else if (obj.type === "saw") {
      ctx.fillStyle = '#ff0';
      ctx.beginPath();
      ctx.arc(screenX + obj.w / 2, obj.y + obj.h / 2, obj.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (obj.type === "block") {
      ctx.fillStyle = '#888';
      ctx.fillRect(screenX, obj.y, obj.w, obj.h);
    } else if (obj.type === "portal") {
      ctx.fillStyle = '#0f0';
      ctx.fillRect(screenX, obj.y, obj.w, obj.h);
    }
  }
}

// =========================
//  MAIN LOOP
// =========================
function loop() {
  shipUpdate();
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
