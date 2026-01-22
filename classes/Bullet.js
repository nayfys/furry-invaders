        class Bullet {
  constructor(x, y, vy, owner) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, vy);
    this.r = 4;
    this.owner = owner; 
  }

  update() {
    this.pos.add(this.vel);
  }

  offscreen() {
    return this.pos.y < -20 || this.pos.y > height + 20;
  }

  
  hitsRect(rect) {
    let rx = rect.x - rect.w / 2;
    let ry = rect.y - rect.h / 2;
    return (this.pos.x > rx && this.pos.x < rx + rect.w && this.pos.y > ry && this.pos.y < ry + rect.h);
  }

  hits(invader) {
    return dist(this.pos.x, this.pos.y, invader.pos.x, invader.pos.y) < (this.r + invader.r);
  }

  draw() {
    noStroke();
    fill(255, 220, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
