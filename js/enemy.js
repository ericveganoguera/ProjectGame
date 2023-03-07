class Enemy {
  constructor(speed) {
    this.width = 6;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 20) * 5;
    this.positionY = 110
    this.health = 1
    this.speedMovement = speed;
    this.createDomElement();
  }
  createDomElement() {
    this.enemySpawn = document.createElement("div");
    this.enemySpawn.setAttribute("class", "enemy");
    this.enemySpawn.setAttribute("style", `left:${this.positionX}vh`);
    this.boardElm = document.getElementById("board");
    this.boardElm.appendChild(this.enemySpawn);
    this.enemySpawn.style.width = this.width + "vh";
    this.enemySpawn.style.height = this.height + "vh";
  }
  moveDown() {
    this.positionY -= this.speedMovement;
    this.enemySpawn.style.bottom = this.positionY + "vh";
  }
}

class Boss extends Enemy{
  constructor(speed){
    super(speed)
    this.health = 200
    this.width = 80
    this.height = 80
    this.positionX = 100 / 2 - this.width / 2;
    this.positionY=100
    this.enemySpawn.setAttribute("style", `left:${this.positionX}vh`);
    this.enemySpawn.style.width = this.width + "vh";
    this.enemySpawn.style.height = this.height + "vh";
  }
  moveDown(){
    if (this.positionY > 30){
      this.positionY -= this.speedMovement;
      this.enemySpawn.style.bottom = this.positionY + "vh";
    } 
  }
}