class Bonus {
  constructor(modify) {
    this.width = 6;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 20) * 5;
    this.positionY = 110 + this.width;
    this.speedMovement = 0.2;
    this.modify = modify;
    this.createDomElement();
  }
  createDomElement() {
    this.bonusSpawn = document.createElement("div");
    this.bonusSpawn.setAttribute("class", "bonus");
    this.bonusSpawn.setAttribute("style", `left:${this.positionX}vh`);
    this.boardElm = document.getElementById("board");
    this.boardElm.appendChild(this.bonusSpawn);
    this.bonusSpawn.style.width = this.width + "vh";
    this.bonusSpawn.style.height = this.height + "vh";
    switch (this.modify) {
      case 1:
        this.bonusSpawn.style.backgroundImage =
          "url('../assets/attack-speed-bonus.png')";
        break;
      case 2:
        this.bonusSpawn.style.backgroundImage =
        "url('../assets/movement-speed-bonus.png')";
        break;
      case 3:
        break;
      case 4:
        break;
    }
  }
  moveDown() {
    this.positionY -= this.speedMovement;
    this.bonusSpawn.style.bottom = this.positionY + "vh";
  }
}
