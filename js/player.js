class Player {
  constructor() {
    this.width = 12;
    this.height = 12;
    this.initialPositionX = 100 / 2 - this.width / 2; //Centered
    this.positionX = this.initialPositionX;
    this.positionY = 5;
    this.speedMovement = 2;
    this.playerElm = document.getElementById("player");
    this.playerElm.style.left = this.initialPositionX + "vh";
    this.playerElm.style.bottom = this.positionY + "vh";
    this.playerElm.style.width = this.width + "vh";
    this.playerElm.style.height = this.height + "vh";
  }
  moveRight() {
    if (this.positionX < this.initialPositionX * 2) {
      this.positionX += this.speedMovement;
      this.playerElm.style.left = this.positionX + "vh";
    }
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX -= this.speedMovement;
      this.playerElm.style.left = this.positionX + "vh";
    }
  }
  moveUp() {
    if (this.positionY < 100 - this.height) {
      this.positionY += this.speedMovement;
      this.playerElm.style.bottom = this.positionY + "vh";
    }
  }
  moveDown() {
    if (this.positionY > 1) {
      this.positionY -= this.speedMovement;
      this.playerElm.style.bottom = this.positionY + "vh";
    }
  }
}
