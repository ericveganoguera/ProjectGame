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
    this.bonusSpawn.style.left = this.positionX + "vh";
    this.bonusSpawn.style.bottom = this.positionY + "vh";
    switch (this.modify) {
      case 1:
        //Bonus attack speed
        this.bonusSpawn.classList.add("bonus-attack-speed");
        break;
      case 2:
        //Bonus movement speed
        this.bonusSpawn.classList.add("bonus-speed-movement");
        break;
      case 3:
        //Bonus more bullets
        this.bonusSpawn.classList.add("bonus-more-bullets");
        break;
      case 4:
        //Bonus to health the player!
        this.bonusSpawn.classList.add("bonus-health");
        break;
    }
  }
  moveDown() {
    this.positionY -= this.speedMovement;
    this.bonusSpawn.style.bottom = this.positionY + "vh";
  }
}
