class Player {
  constructor() {
    this.positionX = 50;
    this.positionY = 0;
    this.width = 10;
    this.height = 10;
    this.playerElm = document.getElementById("player");
    this.playerElm.style.left = this.positionX + "vh";
    this.playerElm.style.bottom = this.positionY + "vh";
    this.playerElm.style.width = this.width + "vh";
    this.playerElm.style.height = this.height + "vh";
  }
  moveRight() {
    this.positionX += 3;
    this.playerElm.style.left = this.positionX + "vh";
  }
  moveLeft() {
    this.positionX -= 3;
    this.playerElm.style.left = this.positionX + "vh";
  }
  moveUp() {
    this.positionY += 3;
    this.playerElm.style.bottom = this.positionY + "vh";
  }
  moveDown() {
    this.positionY -= 3;
    this.playerElm.style.bottom = this.positionY + "vh";
  }
}

class Enemy {
  constructor() {
    this.positionX = Math.round(Math.random() * 100);
    this.positionY = 101;
    this.width = 5;
    this.height = 5;
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
    this.positionY--;
    this.enemySpawn.style.bottom = this.positionY + "vh";
    this.enemySpawn.style.width = this.width + "vh";
    this.enemySpawn.style.height = this.height + "vh";

    if (this.positionY < -10) {
      game.allEnemies.pop();
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
        this.detectCollision(element)
        element.moveDown();
      });
    }, 16);
    
  }
  attachEventListeners() {
    //Player movement with arrow keys
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
          clearInterval(this.moveEnemy)
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
        this.player.positionX < element.positionX + element.width &&
        this.player.positionX + this.player.width > element.positionX &&
        this.player.positionY < element.positionY + element.height &&
        this.player.height + this.player.positionY > element.positionY
      ) {
        clearInterval(this.moveEnemy)
      }
  }
}

const game = new Game();
game.start();
