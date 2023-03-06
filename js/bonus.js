class Bonus {
  constructor() {
    this.width = 6;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 20) * 5;
    this.positionY = 110 + this.width;
    this.speedMovement = 0.2
    this.createDomElement()
  }
  createDomElement() {
    this.bonusSpawn = document.createElement("div");
    this.bonusSpawn.setAttribute("class", "bonus");
    this.bonusSpawn.setAttribute("style", `left:${this.positionX}vh`);
    this.boardElm = document.getElementById("board");
    this.boardElm.appendChild(this.bonusSpawn);
    this.bonusSpawn.style.width = this.width + "vh";
    this.bonusSpawn.style.height = this.height + "vh";
  }
  moveDown() {
    this.positionY -= this.speedMovement;
    this.enemySpawn.style.bottom = this.positionY + "vh";
  }
}
