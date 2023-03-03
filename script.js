const displayGameOver = document.getElementById("game-over")

class Player {
  constructor() {
    this.width = 12;
    this.height = 12;
    this.initialPositionX = 100 / 2 - this.width / 2; //Centered
    this.positionX = this.initialPositionX;
    this.positionY = 0;
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
    this.width = 6;
    this.height = 6;
    this.positionX = Math.floor(Math.random() * 20) * 5;
    this.positionY = 100 + this.width;
    this.speedMovement = 2;
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
    this.positionY -= this.speedMovement;
    this.enemySpawn.style.bottom = this.positionY + "vh";
    this.enemySpawn.style.width = this.width + "vh";
    this.enemySpawn.style.height = this.height + "vh";

    // if (this.positionY < -10) {
    //   game.allEnemies.shift();
    //   this.boardElm.removeChild(this.enemySpawn);
    // }
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

    setTimeout(() => {
      const newEnemyFast = new EnemyFast(15);
      game.allEnemies.push(newEnemyFast);
    }, 6000);

    //Move the enemies down every XX ms
    this.moveEnemy = setInterval(() => {
      game.allEnemies.forEach((element) => {
        this.detectCollision(element);
        element.moveDown();
        this.removeEnemy(element);
      });
    }, 64);
  }

  //Player movement with arrow keys
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.code) {
        case "ArrowRight":
        case "KeyD":
          this.player.moveRight();
          break;
        case "ArrowLeft":
        case "KeyA":
          this.player.moveLeft();
          break;
        case "ArrowUp":
        case "KeyW":
          this.player.moveUp();
          break;
        case "ArrowDown":
        case "KeyS":
          this.player.moveDown();
          break;
        case "KeyP":
          this.pause = true;
          break;
        case "KeyO":
        //spawnEnemy();
      }
    });
  }
  detectCollision(element) {
    if (
      element.positionX < this.player.positionX + this.player.width &&
      element.positionX + element.width > this.player.positionX &&
      element.positionY < this.player.positionY + this.player.height &&
      element.height + element.positionY > this.player.positionY
    ) {
      displayGameOver.style.display = "flex"
      clearInterval(this.moveEnemy);
      clearInterval(this.spawnEnemy);
    }
  }
  removeEnemy(enemy) {
    if (enemy.positionY < 0) {
      enemy.enemySpawn.remove();
      this.allEnemies.shift();
    }
  }
}
class EnemyFast extends Enemy {
  constructor(speedMovement) {
    super(speedMovement);
  }
}

const game = new Game();
game.start();
