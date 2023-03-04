class Game {
  constructor() {
    this.player = null;
    this.allEnemies = [];
    this.allShots = [];
    this.audio = new Audio("./sounds/game-over.wav")
    this.keysDown = {};
    this.attachEventListeners();
    this.movePlayer();
  }

  //Start Game
  start() {
    //Create the player
    this.player = new Player();

    //Player shots every XX ms
    this.spawnShot = setInterval(() => {
      const newShotLeft = new Shot(0.20,3,5)
      const newShotRight = new Shot(0.20,8,5)
      this.allShots.push(newShotLeft)
      this.allShots.push(newShotRight)
    }, 1000);

    //Spawn enemies every XX ms
    this.spawnEnemy = setInterval(() => {
      const newEnemy = new Enemy(0.20);
      this.allEnemies.push(newEnemy);
    }, 2000);

    //Spawn faster enemy
    setInterval(() => {
      const newEnemy = new Enemy(0.7);
      this.allEnemies.push(newEnemy);
    }, 6000);

    //Move the shots
    this.moveShot = setInterval(() => {
      this.allShots.forEach((element,index) => {
        element.moveUp()
        this.removeShot(element,index)
      })
    }, 8);

    //Move the enemies down every XX ms
    this.moveEnemy = setInterval(() => {
      this.allEnemies.forEach((element,index) => {
        this.detectCollision(element);
        element.moveDown();
        this.removeEnemy(element,index);
      });
    }, 8);
  }

  //Player movement with arrow keys
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      this.keysDown[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.keysDown[event.code] = false;
      this.player.playerElm.removeAttribute("class", "move-right");
      this.player.playerElm.removeAttribute("class", "move-left");
      this.player.playerElm.removeAttribute("class", "move-up");
      this.player.playerElm.removeAttribute("class", "move-down");
    });
  }
  movePlayer() {
    if (this.keysDown["ArrowRight"]) {
      this.player.moveRight();
    }
    if (this.keysDown["ArrowLeft"]) {
      this.player.moveLeft();
    }
    if (this.keysDown["ArrowUp"]) {
      this.player.moveUp();
    }
    if (this.keysDown["ArrowDown"]) {
      this.player.moveDown();
    }
    setTimeout(() => {
      this.movePlayer();
    }, 8);
  }
  detectCollision(element) {
    if (
      element.positionX < this.player.positionX + this.player.width &&
      element.positionX + element.width > this.player.positionX &&
      element.positionY < this.player.positionY + this.player.height &&
      element.height + element.positionY > this.player.positionY
    ) {
      this.displayGameOver();
    }
  }
  removeEnemy(enemy,index) {
    if (enemy.positionY < 0) {
      enemy.enemySpawn.remove();
      this.allEnemies.splice(index,0)
    }
  }
  removeShot(shot,index){
    if (shot.positionY > 100) {
      shot.shotSpawn.remove()
      this.allShots.splice(index,0)
    }
  }
  displayGameOver() {
    this.audio.play()
    clearInterval(this.moveEnemy);
    clearInterval(this.spawnEnemy);
    this.displayGaOv = document.createElement("div");
    this.displayGaOv.setAttribute("class", "display-window");
    this.displayGaOv.innerHTML = `
    <h5>Game over</h5>
    <a href="#" onclick="location.reload()">Restart</a>
    `;
    this.boardElm = document.getElementById("board");
    this.boardElm.appendChild(this.displayGaOv);
  }
}
