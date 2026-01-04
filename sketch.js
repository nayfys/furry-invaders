let game;
let invaderImg = null;

function preload() {

  loadImage('img/invader.png', img => { invaderImg = img; }, err => {
    loadImage('img/invader.svg', img2 => { invaderImg = img2; }, err2 => { invaderImg = null; console.warn('No invader sprite found; using drawn fallback.'); });
  });
}

function setup() {
  createCanvas(600, 400);
  game = new Game();
}

function draw() {
  background(20);
  game.update();
  game.draw();
}

function keyPressed() {
  if (key === ' ' || keyCode === 32) {
    game.playerShoot();
  }
  if (key === 'r' || key === 'R') {
    game.restart();
  }
}
