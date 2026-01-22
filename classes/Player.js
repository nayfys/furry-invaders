class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.w = 40;
    this.h = 14;
    this.speed = 5;
    this.cooldown = 0; 
  }

  update() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.pos.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.pos.x += this.speed;
    this.pos.x = constrain(this.pos.x, this.w / 2, width - this.w / 2);
    if (this.cooldown > 0) this.cooldown--;
  }

  draw() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(100, 220, 120);
    
    triangle(this.pos.x - this.w/2, this.pos.y + this.h/2,
             this.pos.x + this.w/2, this.pos.y + this.h/2,
             this.pos.x, this.pos.y - this.h);
    pop();
  }

  shoot(game) {
    if (this.cooldown === 0) {
      game.bullets.push(new Bullet(this.pos.x, this.pos.y - this.h - 2, -6, 'player'));
      this.cooldown = 18; 
    }
  }
}