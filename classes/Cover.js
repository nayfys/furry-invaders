class Cover {
  constructor(x, y, w = 80, h = 40) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.hp = 6; 
    this.holes = [];
    for (let i = 0; i < 6; i++) {
      let hx = this.pos.x - this.w / 2 + 12 + (i % 3) * (this.w - 24) / 2 + (i % 2 === 0 ? -6 : 6);
      let hy = this.pos.y - this.h / 2 + 12 + floor(i / 3) * (this.h - 24) / 2;
      this.holes.push({ x: hx, y: hy });
    }
  }

  hit() {
    this.hp = max(0, this.hp - 1);
  }

  isDestroyed() {
    return this.hp <= 0;
  }

  draw() {
    push();
    rectMode(CENTER);
    noStroke();
  
    let t = constrain(this.hp / 6, 0, 1);
    fill(120, 200, 240, 200 * t + 55);
    rect(this.pos.x, this.pos.y, this.w, this.h, 6);


    fill(30, 30, 30, 200);
    let holes = 6 - this.hp;
    for (let i = 0; i < holes; i++) {
      let p = this.holes[i];
      ellipse(p.x, p.y, 10 + i * 1.5);
    }

    
    fill(255);
    textAlign(CENTER, BOTTOM);
    textSize(18);
    text(this.hp > 0 ? this.hp : 0, this.pos.x, this.pos.y - this.h / 2 - 8);
    pop();
  }
}
