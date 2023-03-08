class Game {
  constructor(speed) {
    this.player = null;
    this.allEnemies = [];
    this.allMeteor = [];
    this.allShots = [];
    this.allBonus = [];
    this.speedSpawnShot = 700;
    this.speedMovement = speed;
    this.intervalTimes = [];
    this.timeoutTimes = [];
    this.intervalIds = [];
    this.timeoutIds = [];
    this.playerDamageDelay = false;
    this.keysDown = {};
    this.volumeMusic = 0.5;
    this.volumeEffects = 0.5;
    this.getElementsDOM();
    this.audios();
    this.reloadVolumeAudios();
  }
  getElementsDOM() {
    this.score = document.getElementById("score");
    this.health = document.getElementById("health");
    this.boardElm = document.getElementById("board");
    this.scoreId = document.getElementById("id-score");
    this.healthId = document.getElementById("id-health");
    this.barVolumeMusic = document.getElementById("volume-music");
    this.barVolumeEffect = document.getElementById("volume-effects");
  }
  audios() {
    this.audioGameOver = new Audio("./sounds/game-over.wav");
    this.audioBackgroundGame = new Audio("./sounds/background-game.mp3");
    this.audioEnemyDie = new Audio("./sounds/enemy-die.wav");
    this.audioMenu = new Audio("./sounds/background-menu.wav");
    this.audioBonusUp = new Audio("./sounds/bonus-up.ogg");
    this.audioBoss = new Audio("./sounds/background-boss.mp3");
  }
  volumeAudios() {
    this.audioGameOver.volume = this.volumeMusic;
    this.audioBackgroundGame.volume = this.volumeMusic;
    this.audioEnemyDie.volume = this.volumeEffects;
    this.audioMenu.volume = this.volumeMusic;
    this.audioBonusUp.volume = this.volumeEffects;
    this.audioBoss.volume = this.volumeMusic;
  }
  reloadVolumeAudios() {
    this.barVolumeMusic.addEventListener("input", () => {
      this.volumeMusic = this.barVolumeMusic.value / 100;
      console.log(this.volumeMusic);
      this.volumeAudios();
    });
    this.barVolumeEffect.addEventListener("input", () => {
      console.log(this.volumeEffects);
      this.volumeEffects = this.barVolumeEffect.value / 100;
      this.volumeAudios();
    });
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
    <a id="options-display" onclick="options()">Options</a>
    </div>
    </div>
    `;
    this.boardElm.prepend(this.menu);
    this.audioMenu.loop = true;
    this.audioMenu.volume = this.volumeMusic;
    this.audioMenu.play();
  }
  start() {
    this.menu.remove();
    this.scoreId.style.display = "flex";
    this.healthId.style.display = "flex";
    this.audioMenu.pause();
    this.audioBackgroundGame.loop = true;
    this.audioBackgroundGame.play();
    this.player = new Player();
    this.spawnShot();
    this.spawnEnemy(0.4, 800);
    this.spawnMeteor();
    this.spawnBonus();
    this.spawnBoss();
    this.moveEnemy();
    this.moveMeteor();
    this.moveShot(0.8);
    this.moveBonus();
    this.attachEventListeners();
    this.movePlayer();
  }
  attachEventListeners() {
    //Player movement with arrow keys
    document.addEventListener("keydown", (event) => {
      this.keysDown[event.code] = true;
      if (event.code === "KeyP") {
        this.clearIntervals();
        this.displayMenuWindow();
      }
    });
    document.addEventListener("keyup", (event) => {
      this.keysDown[event.code] = false;
      this.player.playerElm.classList.remove("move-right");
      this.player.playerElm.classList.remove("move-left");
      this.player.playerElm.classList.remove("move-up");
      this.player.playerElm.classList.remove("move-down");
    });
  }
  spawnEnemy(movementSpeed, spawnInterval) {
    //Spawn enemies every spawnInterval with movementSpeed after 15 seconds
    this.firstSpawnEnemy = setTimeout(() => {
      //Stop meteor spawn
      clearInterval(this.spawnerMeteor);
      this.spawnerEnemy = setInterval(() => {
        const newEnemy = new Enemy(movementSpeed);
        this.allEnemies.push(newEnemy);
      }, spawnInterval);
      this.intervalIds.push(this.spawnerEnemy);
    }, 15000);
    this.timeoutIds.push(this.firstSpawnEnemy);
  }
  spawnBoss() {
    //Spawn boss with timeout 60 seconds
    this.spawnerBoss = setTimeout(() => {
      //Stop enemy spawn
      clearInterval(this.spawnerEnemy);
      setTimeout(() => {
        //Stop background music and play boss music
        this.audioBackgroundGame.pause();
        this.audioBoss.play();
        this.audioBoss.loop = true;
        this.audioBoss.volume = 0;
        //Increment volume every 1s to be more epic!
        const incrementVolume = () => {
          if (this.audioBoss.volume < this.volumeMusic) {
            this.audioBoss.volume += 0.1;
            setTimeout(incrementVolume, 1000);
          }
        };
        incrementVolume();
      }, 4000);
      //Spawn boss with a delay of 10s!
      this.timeoutBoss = setTimeout(() => {
        const newBoss = new Boss(0.2);
        this.allEnemies.push(newBoss);
      }, 10000);
      this.intervalIds.push(this.timeoutBoss);
    }, 60000);
    this.intervalIds.push(this.spawnerBoss);
  }
  spawnMeteor() {
    this.spawnerMeteor = setInterval(() => {
      const newMeteor = new Meteor();
      this.allMeteor.push(newMeteor);
    }, 1000);
    this.intervalIds.push(this.spawnerMeteor);
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
    this.intervalIds.push(this.spawnerShot);
  }
  spawnBonus() {
    this.spawnerBonus = setInterval(() => {
      this.randomBonus = Math.floor(Math.random() * 2) + 1;
      const newBonus = new Bonus(this.randomBonus);
      this.allBonus.push(newBonus);
    }, 7000);
    this.intervalIds.push(this.spawnerBonus);
  }
  moveShot(speed) {
    //Move the shots
    this.movementShot = setInterval(() => {
      this.allShots.forEach((shot, index) => {
        shot.moveUp(speed);
        if (shot.positionY > 100) {
          this.removeShot(shot, index);
        }
      });
    }, 16);
    this.intervalIds.push(this.movementShot);
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
    this.intervalIds.push(this.movementEnemy);
  }
  moveMeteor() {
    this.movementMeteor = setInterval(() => {
      this.allMeteor.forEach((meteor, indexMeteor) => {
        this.changeDirection = 1;
        if (meteor.positionY < 0) {
          this.removeMeteor(meteor, indexMeteor);
        }
        this.detectCollision(meteor, indexMeteor);
        meteor.moveDown();
        if (this.changeDirection === 1) {
          meteor.moveRight();
          this.changeDirection++;
        } else if (this.changeDirection === 2) {
          meteor.moveLeft();
          this.changeDirection--;
        }
      }, 32);
    });
  }
  moveBonus() {
    this.movementBonus = setInterval(() => {
      this.allBonus.forEach((bonus, indexBonus) => {
        bonus.moveDown();
        if (bonus.positionY < 0) {
          this.removeBonus(bonus, indexBonus);
        }
        this.detectCollision(bonus, indexBonus);
      });
    }, 32);
    this.intervalIds.push(this.movementBonus);
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
    this.movementPlayer = setTimeout(() => {
      this.movePlayer();
    }, 8);
    this.intervalIds.push(this.movementPlayer);
  }
  detectCollision(enemy, indexEnemy) {
    if (
      enemy.positionX < this.player.positionX + this.player.width &&
      enemy.positionX + enemy.width > this.player.positionX &&
      enemy.positionY < this.player.positionY + this.player.height &&
      enemy.height + enemy.positionY > this.player.positionY
    ) {
      if (enemy instanceof Bonus) {
        this.removeBonus(enemy, indexEnemy);
        this.audioBonusUp.play();
        this.selectBonus(this.randomBonus);
      } else {
        if (this.health.innerHTML <= 1) {
          this.displayGameOver();
          this.playerTakesDamage();
        } else if (!this.playerDamageDelay) {
          this.playerDamageDelay = true;
          this.player.playerDamaged();
          this.health.innerHTML--;
          this.playerTakesDamage();
          enemy.health--;
          if (enemy.health < 1) {
            if (enemy instanceof Enemy) this.removeEnemy(enemy, indexEnemy);
            if (enemy instanceof Meteor) this.removeMeteor(enemy, indexEnemy);
          }
          this.playerDelay = setTimeout(() => {
            this.playerDamageDelay = false;
          }, 4000);
          this.timeoutIds.push(this.playerDelay);
        }
      }
    }
    this.allShots.forEach((shot, index) => {
      if (
        enemy.positionX < shot.positionX + shot.width &&
        enemy.positionX + enemy.width > shot.positionX &&
        enemy.positionY < shot.positionY + shot.height &&
        enemy.positionY + enemy.height > shot.positionY
      ) {
        this.removeShot(shot, index);
        enemy.health--;
        if (enemy.health <= 1) {
          if (enemy instanceof Meteor) {
            this.removeMeteor(enemy, indexEnemy);
            this.score.innerHTML++;
          }
          if (enemy instanceof Enemy) {
            this.removeEnemy(enemy, indexEnemy);
            this.score.innerHTML=Number(this.score.innerHTML)+2;
          }
          this.audioEnemyDie.play();
          if (enemy instanceof Boss) {
            enemy.bossHealthBar.remove();
            this.score.innerHTML=Number(this.score.innerHTML)+100;
          }
        }
      }
    });
  }
  selectBonus(modify) {
    switch (modify) {
      case 1:
        //More atack speed!!!
        if (this.speedSpawnShot > 100) {
          clearInterval(this.spawnerShot);
          this.speedSpawnShot -= 50;
          this.spawnShot();
        }
        break;
      case 2:
        //More speed movement
        if (this.player.speedMovement < 1.5) {
          this.player.speedMovement += 0.1;
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
  removeMeteor(meteor, index) {
    meteor.meteorSpawn.remove();
    this.allMeteor.splice(index, 1);
  }
  removeShot(shot, index) {
    shot.shotSpawn.remove();
    this.allShots.splice(index, 1);
  }
  removeBonus(bonus, index) {
    bonus.bonusSpawn.remove();
    this.allBonus.splice(index, 1);
  }
  saveIntervalTime(id) {
    const startTime = Date.now();
    return function () {
      const endTime = Date.now();
      this.intervalTimes[id] -= endTime - startTime;
    };
  }
  saveTimeoutTime(id) {
    const startTime = Date.now();
    return function () {
      const endTime = Date.now();
      this.timeoutTimes[id] -= endTime - startTime;
    };
  }
  resumeIntervalsAndTimeouts() {
    for (let i = 0; i < this.intervalIds.length; i++) {
      setInterval(this.intervalIds[i]);
    }
    for (let i = 0; i < this.timeoutIds.length; i++) {
      setInterval(this.timeoutIds[i]);
    }
    // for (let i = 0; i < this.intervalIds.length; i++) {
    //   const id = this.intervalIds[i];
    //   const timeRemaining = this.intervalTimes[i];

    //   const intervalFunc = this.saveIntervalTime(i);
    //   this.intervalIds[i] = setInterval(function () {
    //     // ...
    //     intervalFunc(i);
    //   }, timeRemaining);
    // }

    // for (let i = 0; i < this.timeoutIds.length; i++) {
    //   const id = this.timeoutIds[i];
    //   const timeRemaining = this.timeoutTimes[i];

    //   const timeoutFunc = this.saveTimeoutTime(i);
    //   this.timeoutIds[i] = setTimeout(function () {
    //     // ...
    //     timeoutFunc(i);
    //   }, timeRemaining);
    // }
  }
  clearIntervals() {
    for (let i = 0; i < this.intervalIds.length; i++) {
      clearInterval(this.intervalIds[i]);
    }
    for (let i = 0; i < this.timeoutIds.length; i++) {
      clearTimeout(this.timeoutIds[i]);
    }
  }
  playerTakesDamage() {
    this.flash = document.createElement("div");
    this.flash.classList.add("flash");
    this.boardElm.appendChild(this.flash);
    setTimeout(() => {
      this.boardElm.removeChild(this.flash);
    }, 100);
  }
  displayGameOver() {
    this.audioGameOver.play();
    this.clearIntervals();
    this.displayEnd = document.createElement("div");
    this.displayEnd.setAttribute("class", "display-window");
    this.displayEnd.innerHTML = `
    <h1 id="game-over-h1">Game over</h1>
    <p>Score : ${this.score.innerHTML}</p>
    <a href="#" onclick="location.reload()">Back to menu</a>
    `;
    this.boardElm.appendChild(this.displayEnd);
  }
  displayMenuWindow() {
    this.displayMenu = document.createElement("div");
    this.displayMenu.setAttribute("class", "display-window");
    this.displayMenu.setAttribute("id", "pause-title");
    this.displayMenu.innerHTML = `
          <h1 id="pause-h1">Pause</h1>
          <div id="pause">
              <h1><a onclick="options()">Options</a> </h1>
              <h1><a >Resume</a> </h1>
              <h1><a href="">Back to menu</a> </h1>
          </div>
          `;
    this.boardElm.prepend(this.displayMenu);
  }
}

function start() {
  game.start();
}

const optionsDisplay = document.getElementById("options");
function options() {
  optionsDisplay.style.display = "flex";
}
function saveOptions() {
  optionsDisplay.style.display = "none";
}
