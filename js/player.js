class Player {
  constructor() {
    this.width = 12;
    this.height = 12;
    this.initialPositionX = 100 / 2 - this.width / 2; //Centered
    this.positionX = this.initialPositionX;
    this.positionY = 5;
    this.speedMovement = 0.5;
    this.playerElm = document.getElementById("player");
    this.playerElm.style.left = this.initialPositionX + "vh";
    this.playerElm.style.bottom = this.positionY + "vh";
    this.playerElm.style.width = this.width + "vh";
    this.playerElm.style.height = this.height + "vh";
  }
  moveRight() {
    if (this.positionX < this.initialPositionX * 2) {
      this.playerElm.classList.add("move-right");
      this.positionX += this.speedMovement;
      this.playerElm.style.left = this.positionX + "vh";
    }
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.playerElm.classList.add("move-left");
      this.positionX -= this.speedMovement;
      this.playerElm.style.left = this.positionX + "vh";
    }
  }
  moveUp() {
    if (this.positionY < 100 - this.height) {
      this.playerElm.classList.add("move-up");
      this.positionY += this.speedMovement;
      this.playerElm.style.bottom = this.positionY + "vh";
    }
  }
  moveDown() {
    if (this.positionY > 1) {
      this.playerElm.classList.add("move-down");
      this.positionY -= this.speedMovement;
      this.playerElm.style.bottom = this.positionY + "vh";
    }
  }
  playerDamaged() {
    this.playerElm.classList.add("player-takes-damage")
    setTimeout(() => {
      this.playerElm.classList.remove("player-takes-damage")
    }, 4000);
  }
}
