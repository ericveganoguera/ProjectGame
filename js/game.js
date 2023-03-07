class Game {
  constructor(speed) {
    this.player = null;
    this.allEnemies = []; 
    this.allShots = [];
    this.allBonus = []
    this.speedSpawnShot = 700;
    this.speedMovement = speed
    this.audioGameOver = new Audio("./sounds/game-over.wav");
    this.audioBackgroundGame = new Audio("./sounds/background-game.mp3");
    this.audioEnemyDie = new Audio("./sounds/enemy-die.wav");
    this.audioMenu = new Audio("./sounds/background-menu.wav");
    this.audioBonusUp = new Audio("./sounds/bonus-up.ogg")
    this.keysDown = {};
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
    <p>Use your arrow to move!</p>
    </div>
    <div id="start-button">
    <a href="#" onclick="start()"draggable="false">START</a>
    </div>
    </div>
    `;
    this.boardElm.prepend(this.menu);
    this.audioMenu.loop = true;
    this.audioMenu.play();
  }
  spaceshipSelector() {

  }
  stopMusic(){
    this.audioBackgroundGame.pause()
    this.audioEnemyDie.pause()
    this.audioGameOver.pause()
    this.audioMenu.pause()
  }
  start() {
    this.menu.remove();
    this.audioBackgroundGame.loop = true
    this.audioBackgroundGame.play();
    this.player = new Player();
    this.spawnShot();
    this.spawnEnemy(0.4,800);
    this.spawnBonus();
    this.spawnBoss();
    this.moveEnemy();
    this.moveShot(0.8);
    this.moveBonus();
    this.attachEventListeners();
    this.movePlayer();
  }
  spawnEnemy(movementSpeed, spawnInterval) {
    //Spawn enemies every spawnInterval with movementSpeed
    this.spawnerEnemy = setInterval(() => {
      const newEnemy = new Enemy(movementSpeed);
      this.allEnemies.push(newEnemy);
    }, spawnInterval);
  }
  spawnBoss(){
    this.spawnerBoss = setTimeout(()=>{
      clearInterval(this.spawnerEnemy)
      setTimeout(()=>{
        const newBoss = new Boss(0.2)
        this.allEnemies.push(newBoss)
      },10000)
    },2000)
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
    }, this.speedSpawnShot);
  }
  spawnBonus(){
    this.spawnerBonus = setInterval(() => {
      this.randomBonus = Math.floor(Math.random() * 4) + 1;
      const newBonus = new Bonus(this.randomBonus)
      this.allBonus.push(newBonus)
    }, 2000);
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
    }, 32);
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
  moveBonus(){
    this.movementBonus = setInterval(() => {
      this.allBonus.forEach((bonus,indexBonus) => {
        bonus.moveDown();
        if (bonus.positionY<0){
          this.removeBonus(bonus,indexBonus)
        }
        this.detectCollisionBonus(bonus,indexBonus)
      })
    }, 32);
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
        enemy.health--
        if(enemy.health <= 0) {
          this.removeEnemy(enemy, indexEnemy);
          this.audioEnemyDie.play();
          this.score.innerHTML++;
        }
      }
    });
  }
  detectCollisionBonus(bonus,index){
    if (
      bonus.positionX < this.player.positionX + this.player.width &&
      bonus.positionX + bonus.width > this.player.positionX &&
      bonus.positionY < this.player.positionY + this.player.height &&
      bonus.height + bonus.positionY > this.player.positionY
    ) {
      this.removeBonus(bonus,index)
      this.audioBonusUp.play()
      this.selectBonus(this.randomBonus)
    }
  }
  selectBonus(modify) {
    switch (modify) {
      case 1:
        //More atack speed!!!
        if (this.speedSpawnShot>100) {
          clearInterval(this.spawnerShot)
          this.speedSpawnShot -= 50;
          this.spawnShot()
        }
        break;
        case 2:
          //More speed movement
        if (this.player.speedMovement < 1.5) {
          this.player.speedMovement+=0.1
        }
        break;
      case 3:
        break;
      case 4:
        break;
    }
  }
  removeEnemy(enemy, index) {
    enemy.enemySpawn.remove();
    this.allEnemies.splice(index, 1);
  }
  removeShot(shot, index) {
    shot.shotSpawn.remove();
    this.allShots.splice(index, 1);
  }
  removeBonus(bonus, index) {
    bonus.bonusSpawn.remove();
    this.allBonus.splice(index, 1);
  }
  clearIntervals() {
    clearInterval(this.spawnerShot);
    clearInterval(this.spawnerEnemy);
    clearInterval(this.movementEnemy);
    clearInterval(this.movementBonus);
    clearInterval(this.spawnerBonus);
  }
  displayGameOver() {
    this.audioGameOver.play();
    this.clearIntervals();
    this.displayEnd = document.createElement("div");
    this.displayEnd.setAttribute("class", "display-window");
    this.displayEnd.innerHTML = `
    <h1>Game over</h1>
    <p>Score : ${this.score.innerHTML}</p>
    <a href="#" onclick="location.reload()">Back to menu</a>
    `;
    this.boardElm.appendChild(this.displayEnd);
  }
}
