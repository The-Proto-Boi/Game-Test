const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GRAVITY_NORMAL = 0.6;
const GRAVITY_FLIPPED = -0.6;
const JUMP_FORCE = -12;
const BASE_SPEED = 7;

let currentLevel = null;
let cameraX = 0;
let speedMultiplier = 1.0;
let gravity = GRAVITY_NORMAL;
let mode = "cube"; // "cube" or "ship"

let player = {
  x: 100,
  y: 300,
  w: 30,
  h: 30,
  vy: 0,
  onGround: false
};

let gameOver = false;
let levelComplete = false;
