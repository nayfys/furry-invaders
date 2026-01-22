class Game {
 
  constructor() {
    this.player = new Player(width / 2, height - 36);
    this.bullets = [];
    this.invaders = [];
    this.covers = [];
    this.invaderDir = 1;
    this.invaderSpeed = 10; 
    this.invaderMoveInterval = 30; 
    this.invaderShootInterval = 60; 
    this.moveCounter = 0;
    this.score = 0;
    this.over = false;
    this.won = false;
    this.spawnInvaders();
    this.spawnCovers();
  }

  spawnInvaders(rows = 4, cols = 8) {
    const spacingX = 50;
    const spacingY = 40;
    const startX = (width - (cols - 1) * spacingX) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let x = startX + c * spacingX;
        let y = 50 + r * spacingY;
        this.invaders.push(new Invader(x, y));
      }
    }
  }

 
  update() {
    if (this.over || this.won) return;
    this.player.update();

  
    this.moveCounter++;
    if (this.moveCounter >= this.invaderMoveInterval) {
      this.moveCounter = 0;
     
      let rightmost = -Infinity, leftmost = Infinity;
      for (let inv of this.invaders) if (inv.alive) { rightmost = max(rightmost, inv.pos.x); leftmost = min(leftmost, inv.pos.x); }
      let dx = this.invaderDir * this.invaderSpeed;
      if (rightmost + dx > width - 20 || leftmost + dx < 20) {
        this.invaderDir *= -1;
        for (let inv of this.invaders) if (inv.alive) inv.move(0, 10);
      } else {
        for (let inv of this.invaders) if (inv.alive) inv.move(dx, 0);
      }
    }

   
    for (let b of this.bullets) b.update();

  
    if (frameCount % this.invaderShootInterval === 0) {
      let alive = this.invaders.filter(i => i.alive);
      if (alive.length > 0) {
        let shooter = random(alive);
       
        this.bullets.push(new Bullet(shooter.pos.x, shooter.pos.y + shooter.r + 6, 4, 'invader'));
      }
    }

  
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let b = this.bullets[i];

   
      for (let c of this.covers) {
        if (!c.isDestroyed() && b.hitsRect({x: c.pos.x, y: c.pos.y, w: c.w, h: c.h})) {
          c.hit();
          this.bullets.splice(i, 1);
          b = null;
          break;
        }
      }
      if (!b) continue;

      if (b.owner === 'player') {
        for (let inv of this.invaders) {
          if (inv.alive && b.hits(inv)) {
              inv.hit();
              this.bullets.splice(i, 1);
              this.score += 10;
           
              this.invaderSpeed *= 1.012;
            
              this.invaderShootInterval = max(8, floor(this.invaderShootInterval * 0.985));
             
              let shooters = this.invaders.filter(x => x.alive);
              if (shooters.length > 0) {
                let shooter = random(shooters);
                this.bullets.push(new Bullet(shooter.pos.x, shooter.pos.y + shooter.r + 6, 4, 'invader'));
              }
              break;
            }
        }
      } else if (b.owner === 'invader') {

        if (b.hitsRect({x: this.player.pos.x, y: this.player.pos.y, w: this.player.w, h: this.player.h})) {
          this.over = true;
          this.bullets.splice(i, 1);
          continue;
        }
      }
    }

    this.bullets = this.bullets.filter(b => !b.offscreen());

    this.covers = this.covers.filter(c => !c.isDestroyed());


    for (let inv of this.invaders) if (inv.alive && inv.pos.y > this.player.pos.y - 20) this.over = true;

    if (!this.invaders.some(inv => inv.alive)) this.won = true;
  }

  draw() {
    this.player.draw();
    for (let inv of this.invaders) inv.draw();
    for (let c of this.covers) c.draw();
    for (let b of this.bullets) b.draw();
    this.drawHUD();
    if (this.won) {
      push();
      textAlign(CENTER, CENTER);
      textSize(48);
      fill(0, 255, 0);
      text('YOU WIN!', width / 2, height / 2 - 20);
      textSize(18);
      fill(255);
      text('Final Score: ' + this.score, width / 2, height / 2 + 10);
      textSize(16);
      text('Press R to restart', width / 2, height / 2 + 40);
      pop();
    } else if (this.over) {
      push();
      textAlign(CENTER, CENTER);
      textSize(36);
      fill(255);
      text('Game Over', width / 2, height / 2 - 10);
      textSize(18);
      text('Press R to restart', width / 2, height / 2 + 22);
      pop();
    }
  }
  drawHUD() {
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text('Score: ' + this.score, 10, 10);
  }

  playerShoot() { this.player.shoot(this); }

  restart() {
    this.bullets = [];
    this.invaders = [];
    this.covers = [];
    this.score = 0;
    this.over = false;
    this.spawnInvaders();
    this.spawnCovers();
  }

  spawnCovers() {

    let y = height - 100;
    let gap = 140;
    let startX = width / 2 - gap;
    this.covers.push(new Cover(startX, y));
    this.covers.push(new Cover(startX + gap, y));
    this.covers.push(new Cover(startX + gap * 2, y));
  }
}

