class Game {
  constructor() {
    this.player = null;
    this.allEnemies = [];
    this.allShots = [];
    this.audioGameOver = new Audio("./sounds/game-over.wav");
    this.audioBackgroundGame = new Audio("./sounds/background-game.mp3");
    this.audioEnemyDie = new Audio("./sounds/enemy-die.wav");
    this.audioMenu = new Audio("./sounds/background-menu.wav");
    this.keysDown = {};
    this.speedShot = 700;
    this.score = document.getElementById("score");
    this.boardElm = document.getElementById("board");
  }
  intro() {
    this.menu = document.createElement("div");
    this.menu.setAttribute("id", "intro");
    this.menu.innerHTML = `
    <div id="title"></div>
    <h1>SPACESHIP SHOOTER</h1>
    <div id="instructions">
    <div id="movement">
    <img src="./assets/arrows.png" alt="img-movement" draggable="false">
    <p>Use your arrow yes to move!</p>
    </div>
    <div>
    <a href="#" onclick="start()"draggable="false">START</a>
    </div>
    </div>
    `;
    this.boardElm.prepend(this.menu);
    this.audioMenu.loop = true;
    this.audioMenu.play();
  }
  spaceshipSelector() {}
  stopMusic(){
    this.audioBackgroundGame.pause()
    this.audioEnemyDie.pause()
    this.audioGameOver.pause()
    this.audioMenu.pause()
  }
  //Start Game
  start() {
    this.menu.remove();
    this.audioBackgroundGame.play();
    this.player = new Player();
    this.spawnShot();
    this.spawnEnemy(0.4, 800);
    this.moveEnemy();
    this.moveShot(0.8);
    this.attachEventListeners();
    this.movePlayer();
  }
  moveShot(speed) {
    //Move the shots
    setInterval(() => {
      this.allShots.forEach((shot, index) => {
        shot.moveUp(speed);
        if (shot.positionY > 100) {
          this.removeShot(shot, index);
        }
      });
    }, 16);
  }
  moveEnemy() {
    //Move the enemies down every XX ms
    this.movementEnemy = setInterval(() => {
      this.allEnemies.forEach((enemy, indexEnemy) => {
        if (enemy.positionY < 0) {
          this.removeEnemy(enemy, indexEnemy);
        }
        this.detectCollision(enemy, indexEnemy);
        enemy.moveDown();
      });
    }, 16);
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
  spawnEnemy(movementSpeed, spawnInterval) {
    //Spawn enemies every spawnInterval with movementSpeed
    this.spawnerEnemy = setInterval(() => {
      const newEnemy = new Enemy(movementSpeed);
      this.allEnemies.push(newEnemy);
    }, spawnInterval);
  }
  spawnShot() {
    //Player shots every XX ms
    this.spawnerShot = setInterval(() => {
      const newShotLeft = new Shot(
        this.player.positionX + 2,
        this.player.positionY + 3
      );
      const newShotRight = new Shot(
        this.player.positionX + 6,
        this.player.positionY + 3
      );
      this.allShots.push(newShotLeft);
      this.allShots.push(newShotRight);
    }, this.speedShot);
  }
  attachEventListeners() {
    //Player movement with arrow keys
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
  detectCollision(enemy, indexEnemy) {
    if (
      enemy.positionX < this.player.positionX + this.player.width &&
      enemy.positionX + enemy.width > this.player.positionX &&
      enemy.positionY < this.player.positionY + this.player.height &&
      enemy.height + enemy.positionY > this.player.positionY
    ) {
      this.displayGameOver();
    }
    this.allShots.forEach((shot, index) => {
      if (
        enemy.positionX < shot.positionX + shot.width &&
        enemy.positionX + enemy.width > shot.positionX &&
        enemy.positionY < shot.positionY + shot.height &&
        enemy.positionY + enemy.height > shot.positionY
      ) {
        this.removeShot(shot, index);
        this.removeEnemy(enemy, indexEnemy);
        this.audioEnemyDie.play();
        this.score.innerHTML++;
      }
    });
  }
  removeEnemy(enemy, index) {
    enemy.enemySpawn.remove();
    this.allEnemies.splice(index, 1);
  }
  removeShot(shot, index) {
    shot.shotSpawn.remove();
    this.allShots.splice(index, 1);
  }
  clearIntervals() {
    clearInterval(this.spawnerShot);
    clearInterval(this.spawnerEnemy);
    clearInterval(this.movementEnemy);
  }
  displayGameOver() {
    this.audioGameOver.play();
    this.clearIntervals();
    this.displayEnd = document.createElement("div");
    this.displayEnd.setAttribute("class", "display-window");
    this.displayEnd.innerHTML = `
    <h5>Game over</h5>
    <a href="#" onclick="location.reload()">Back to menu</a>
    `;
    this.boardElm.appendChild(this.displayEnd);
  }
}
