class Invader {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 14;
    this.alive = true;
  }

  move(dx, dy) {
    this.pos.x += dx;
    this.pos.y += dy;
  }

  draw() {
    if (!this.alive) return;
    push();
    translate(this.pos.x, this.pos.y);

    if (typeof invaderImg !== 'undefined' && invaderImg) {
      imageMode(CENTER);
  
      let targetH = this.r * 2.2;
      let aspect = (invaderImg.width && invaderImg.height) ? (invaderImg.width / invaderImg.height) : 1.0;
      let targetW = targetH * aspect;
      image(invaderImg, 0, 0, targetW, targetH);
    } else {
     
      noStroke();
     
      fill(245, 245, 255);
      ellipse(0, 0, this.r * 2.4, this.r * 2.0);

      
      fill(235, 235, 255);
      ellipse(-this.r * 0.9, -this.r * 0.9, this.r * 0.9, this.r * 1.0);
      ellipse(this.r * 0.9, -this.r * 0.9, this.r * 0.9, this.r * 1.0);

      
      fill(30, 40, 120);
      ellipse(-this.r * 0.5, -this.r * 0.15, this.r * 0.8, this.r * 0.6);
      ellipse(this.r * 0.5, -this.r * 0.15, this.r * 0.8, this.r * 0.6);
      fill(115, 220, 255);
      ellipse(-this.r * 0.42, -this.r * 0.2, this.r * 0.28, this.r * 0.18);
      ellipse(this.r * 0.58, -this.r * 0.2, this.r * 0.28, this.r * 0.18);

    
      fill(40, 40, 50);
      ellipse(0, this.r * 0.25, this.r * 0.6, this.r * 0.4);
    }
    pop();
  }

  hit() {
    this.alive = false;
  }
}
