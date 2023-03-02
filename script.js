class Player {
  constructor() {
    this.positionX = 50;
    this.positionY = 0;
    this.width = 12;
    this.height = 12;
    this.speedMovement = 2
    this.playerElm = document.getElementById("player");
    this.playerElm.style.left = this.positionX + "vh";
    this.playerElm.style.bottom = this.positionY + "vh";
    this.playerElm.style.width = this.width + "vh";
    this.playerElm.style.height = this.height + "vh";
  }
  moveRight() {
    this.positionX += this.speedMovement;
    this.playerElm.style.left = this.positionX + "vh";
  }
  moveLeft() {
    this.positionX -= this.speedMovement;
    this.playerElm.style.left = this.positionX + "vh";
  }
  moveUp() {
    this.positionY += this.speedMovement;
    this.playerElm.style.bottom = this.positionY + "vh";
  }
  moveDown() {
    this.positionY -= this.speedMovement;
    this.playerElm.style.bottom = this.positionY + "vh";
  }

}

class Enemy {
  constructor() {
    this.positionX = Math.floor(Math.random() * 21);
    this.positionX = this.positionX*5
    this.positionY = 100;
    this.width = 6;
    this.height = 6;
    this.speedMovement = 2
    this.createDomElement();
  }
  createDomElement() {
    this.enemySpawn = document.createElement("div");
    this.enemySpawn.setAttribute("class", "enemy");
    this.enemySpawn.setAttribute("style", `left:${this.positionX}vh`);
    this.boardElm = document.getElementById("board");
    this.boardElm.appendChild(this.enemySpawn);
  }
  moveDown() {
    this.positionY-=this.speedMovement;
    this.enemySpawn.style.bottom = this.positionY + "vh";
    this.enemySpawn.style.width = this.width + "vh";
    this.enemySpawn.style.height = this.height + "vh";

    if (this.positionY < -10) {
      game.allEnemies.shift();
      this.boardElm.removeChild(this.enemySpawn);
    }
  }
}

class Game {
  constructor() {
    this.player = null;
    this.allEnemies = [];
    this.pause = false;
    this.attachEventListeners();
  }

  //Start Game
  start() {
    //Create the player
    this.player = new Player();

    //Spawn enemies every XX ms
    this.spawnEnemy = setInterval(() => {
      const newEnemy = new Enemy();
      game.allEnemies.push(newEnemy);
    }, 2000);

    //Move the enemies down every XX ms
    this.moveEnemy = setInterval(() => {
      game.allEnemies.forEach((element) => {
        if (!this.pause){
          this.detectCollision(element)
        }
        element.moveDown();
      });
    }, 64);
    
  }

  //Player movement with arrow keys
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowRight":
          this.player.moveRight();
          break;
        case "ArrowLeft":
          this.player.moveLeft();
          break;
        case "ArrowUp":
          this.player.moveUp();
          break;
        case "ArrowDown":
          this.player.moveDown();
          break;
        case "KeyP":
          this.pause = true;
          break;
        case "KeyO":
        //spawnEnemy();
        default:
          break;
      }
    });
  }
  detectCollision(element){
    if (
        element.positionX < this.player.positionX + this.player.width &&
        element.positionX + element.width > this.player.positionX &&
        element.positionY < this.player.positionY + this.player.height &&
        element.height + element.positionY > this.player.positionY
      ) {
        clearInterval(this.moveEnemy)
        console.log("HELLO")
      }
  }
}

const game = new Game();
game.start();
