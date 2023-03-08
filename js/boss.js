class Boss{
    constructor(speed) {
      this.speedMovement = speed;
      this.health = 200;
      this.maxHealth = this.health;
      this.width = 73;
      this.height = 30;
      this.positionX = 100 / 2 - this.width / 2;
      this.positionY = 100;
      this.canCreateHealthBar = false;
      this.createDomElementBoss();
    }
    createDomElementBoss() {
      this.enemySpawn = document.createElement("div");
      this.enemySpawn.setAttribute("class", "boss");
      this.enemySpawn.setAttribute("style", `left:${this.positionX}vh`);
      this.boardElm = document.getElementById("board");
      this.boardElm.appendChild(this.enemySpawn);
      this.enemySpawn.style.width = this.width + "vh";
      this.enemySpawn.style.height = this.height + "vh";
      this.createHealthBar();
    }
    moveDown() {
      if (this.positionY > 70) {
        this.positionY -= this.speedMovement;
        this.enemySpawn.style.bottom = this.positionY + "vh";
      } else {
        this.enemyHealthPercent = (this.health / this.maxHealth) * 100;
        this.bossHealthBar.style.width = this.enemyHealthPercent + "%";
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
  