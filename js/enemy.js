class Enemy {
  constructor(speed,classEnemy) {
    this.width = 6;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 20) * 5;
    this.positionY = 110;
    this.health = 2;
    this.speedMovement = speed;
    this.createDomElement(classEnemy);
  }
  createDomElement(classEnemy) {
    this.enemySpawn = document.createElement("div");
    if (classEnemy === 1) this.enemySpawn.classList.add("enemy");
    if (classEnemy === 2) this.enemySpawn.classList.add("enemy2");
    this.enemySpawn.style.left = `${this.positionX}vh`
    this.enemySpawn.style.bottom = `${this.positionY}vh`
    this.enemySpawn.style.width = this.width + "vh";
    this.enemySpawn.style.height = this.height + "vh";
    this.boardElm = document.getElementById("board");
    this.boardElm.appendChild(this.enemySpawn);
  }
  moveDown() {
    this.positionY -= this.speedMovement;
    this.enemySpawn.style.bottom = this.positionY + "vh";
  }
}