class Meteor {
  constructor() {
    this.width = 6;
    this.height = 6;
    this.health = 1;
    this.positionX = Math.floor(Math.random() * 20) * 5;
    this.positionY = 110;
    this.speedMovement = 0.1;
    this.changeDirection = false;
    this.createDomElement();
  }
  createDomElement() {
    this.meteorSpawn = document.createElement("div");
    this.meteorSpawn.classList.add("meteor");
    this.meteorSpawn.style.left = `${this.positionX}vh`;
    this.meteorSpawn.style.bottom = `${this.positionY}vh`;
    this.boardElm = document.getElementById("board");
    this.meteorSpawn.style.width = this.width + "vh";
    this.meteorSpawn.style.height = this.height + "vh";
    this.boardElm.appendChild(this.meteorSpawn);
  }
  moveRight() {
    if (this.changeDirection) {
        this.positionX += this.speedMovement
    } else {
        this.positionX -= this.speedMovement;
    }
    if (this.positionX<0) this.changeDirection=true
    if (this.positionX>100) this.changeDirection=false
    this.meteorSpawn.style.left = this.positionX + "vh";
  }
  moveLeft() {
    if (this.changeDirection) {
        this.positionX -= this.speedMovement
    } else {
        this.positionX += this.speedMovement;
    }
    if (this.positionX<0) this.changeDirection=true
    if (this.positionX>100) this.changeDirection=false
    this.meteorSpawn.style.left = this.positionX + "vh";
  }
  moveDown() {
    this.positionY -= this.speedMovement-0.02;
    this.meteorSpawn.style.bottom = this.positionY + "vh";
  }
}
