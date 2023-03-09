class Boss{
    constructor(health,classBoss) {
      this.speedMovement = 0.2;
      this.health = health;
      this.maxHealth = this.health;
      this.width = 73;
      this.height = 30;
      this.positionX = 100 / 2 - this.width / 2;
      this.positionY = 100;
      this.canCreateHealthBar = false;
      this.createDomElementBoss(classBoss);
    }
    createDomElementBoss(classBoss) {
      this.enemySpawn = document.createElement("div");
      if (classBoss === 1) this.enemySpawn.classList.add("boss");
      if (classBoss === 2)this.enemySpawn.classList.add("boss2");
      this.enemySpawn.setAttribute("style", `left:${this.positionX}vh`);
      this.boardElm = document.getElementById("board");
      this.boardElm.appendChild(this.enemySpawn);
      this.enemySpawn.style.width = this.width + "vh";
      this.enemySpawn.style.height = this.height + "vh";
      this.createHealthBar();
    }
    moveDown() {
      this.enemyHealthPercent = (this.health / this.maxHealth) * 100;
      this.bossHealthBar.style.width = this.enemyHealthPercent + "%";
      if (this.positionY > 70) {
        this.positionY -= this.speedMovement;
        this.enemySpawn.style.bottom = this.positionY + "vh";
      } 
    }
    createHealthBar() {
      this.bossHealthBar = document.createElement("div");
      this.bossHealthBar.setAttribute("class", "health-bar");
      this.bossHealthBar.setAttribute("id", "enemy-health-bar");
      this.enemyHealthPercent = (this.health / this.maxHealth) * 100;
      this.bossHealthBar.style.width = this.enemyHealthPercent + "%";
      this.boardElm.append(this.bossHealthBar);
    }
  }
  