class Game {
  constructor(speed) {
    this.allEnemies = [];
    this.allMeteor = [];
    this.allShots = [];
    this.allBossShots = [];
    this.allCanons = [];
    this.allBonus = [];
    this.positionCanon = [
      [2, 3],
      [6, 3],
      [4, 10],
      [0, 3],
      [8, 3],
    ];
    this.speedSpawnShot = 700;
    this.imageShot = 0;
    this.speedMovement = speed;
    this.randomBonus;
    this.amountShot = 1;
    this.intervalIds = [];
    this.timeoutIds = [];
    this.allIntervalBossShots=[]
    this.playerDamageDelay = false;
    this.keysDown = {};
    this.volumeMusic = 0.5;
    this.volumeEffects = 0.5;
    this.widthBoss = 73
    this.bossPositionX = ((100 / 2) - (this.widthBoss / 2));
    this.bossPositionY = 100;
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
    this.audioGame2 = new Audio("./sounds/background-game-2.mp3");
    this.audioEnemyDie = new Audio("./sounds/enemy-die.wav");
    this.audioMenu = new Audio("./sounds/background-menu.wav");
    this.audioBonusUp = new Audio("./sounds/bonus-up.ogg");
    this.audioBoss = new Audio("./sounds/background-boss.mp3");
    this.audioWin = new Audio("./sounds/win.wav");
  }
  stopAllAudios(){
    this.audioGameOver.pause()
    this.audioBackgroundGame.pause()
    this.audioGame2.pause()
    this.audioEnemyDie.pause()
    this.audioMenu.pause()
    this.audioBonusUp.pause()
    this.audioBoss.pause()
    this.audioWin.pause()
  }
  volumeAudios() {
    this.audioGameOver.volume = this.volumeMusic;
    this.audioBackgroundGame.volume = this.volumeMusic;
    this.audioGame2.volume = this.volumeMusic;
    this.audioEnemyDie.volume = this.volumeEffects;
    this.audioMenu.volume = this.volumeMusic;
    this.audioBonusUp.volume = this.volumeEffects;
    this.audioBoss.volume = this.volumeMusic;
    this.audioWin.volume = this.volumeMusic;
  }
  reloadVolumeAudios() {
    this.barVolumeMusic.addEventListener("input", () => {
      this.volumeMusic = this.barVolumeMusic.value / 100;
      this.volumeAudios();
    });
    this.barVolumeEffect.addEventListener("input", () => {
      this.volumeEffects = this.barVolumeEffect.value / 100;
      this.volumeAudios();
    });
  }
  intro() {
    this.audioMenu.loop = true;
    this.audioMenu.volume = this.volumeMusic;
    this.audioMenu.play();
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
    <a href="#" onclick="selectorSpaceship()"draggable="false">START</a>
    <a id="options-display" onclick="options()">Options</a>
    </div>
    </div>
    `;
    this.boardElm.prepend(this.menu);
  }
  spaceshipSelector() {
    this.menu.remove();
    (this.selectSpaceship = document.createElement("select-spaceship")),
      this.selectSpaceship.setAttribute("id", "select-spaceship");
    this.selectSpaceship.innerHTML = `
      <div id="title"></div>
      <h1>SPACESHIP SELECTOR</h1>
      <div id="selector">
          <div class="spaceship">
              <div><img src="./Images/spaceship1.png" width="100%"draggable="false"></div>
              <div class="text-spaceship">Spaceship 1</div>
          </div>
          <div class="spaceship">
              <div><img src="./Images/spaceship2.png" width="100%"draggable="false"></div>
              <div class="text-spaceship">Spaceship 2</div>
          </div>
          <div class="spaceship">
              <div><img src="./Images/spaceship3.png" width="100%"draggable="false"></div>
              <div class="text-spaceship">Spaceship 3</div>
          </div>
          <div class="spaceship">
              <div><img src="./Images/spaceship4.png" width="100%"draggable="false"></div>
              <div class="text-spaceship">Spaceship 4</div>
          </div>
          </div>
          <div id="spaceship-start-button">
          <a href="#" onclick="start()"draggable="false">START</a></div>
      `;
    this.boardElm.prepend(this.selectSpaceship);
    this.spaceshipSelected = [...document.getElementsByClassName("spaceship")];
    this.spaceshipSelected.forEach((element, index) => {
      element.addEventListener("click", () => {
        this.spaceshipSelected.forEach((element2) => {
          element2.classList.remove("clicked");
          element2.removeAttribute("id");
        });
        element.classList.add("clicked");
        element.setAttribute("id", "spaceship-final");
      });
    });
  }
  createPlayerWithSpaceShipCustom(){
    this.spaceshipFinal = document.getElementById("spaceship-final");
    this.textSpaceship = [
      ...this.spaceshipFinal.getElementsByClassName("text-spaceship"),
    ];
    if (this.textSpaceship[0].innerHTML.includes("1")) {
      this.player = new Player(1);
      this.imageShot = 1;
    } else if (this.textSpaceship[0].innerHTML.includes("2")) {
      this.player = new Player(2);
      this.imageShot = 2;
    } else if (this.textSpaceship[0].innerHTML.includes("3")) {
      this.player = new Player(3);
      this.imageShot = 3;
    } else if (this.textSpaceship[0].innerHTML.includes("4")) {
      this.player = new Player(4);
      this.imageShot = 4;
    }
  }
  start() {
    this.createPlayerWithSpaceShipCustom()
    this.selectSpaceship.remove();
    this.audioMenu.pause();
    this.scoreId.style.display = "flex";
    this.healthId.style.display = "flex";
    this.audioBackgroundGame.loop = true;
    this.audioBackgroundGame.play();
    this.Wave = 1;
    this.spawnShot(
      this.positionCanon[0][0],
      this.positionCanon[0][1],
      this.imageShot
    );
    this.spawnShot(
      this.positionCanon[1][0],
      this.positionCanon[1][1],
      this.imageShot
    );
    this.spawnMeteor();
    this.spawnBonus();
    this.spawnEnemy(0.4, 1200, 1, 15000);
    this.spawnBoss(500, 1,5);
    this.moveShot(0.8);
    this.moveBossShot(0.5)
    this.moveMeteor();
    this.moveBonus();
    this.moveEnemy();
    this.attachEventListeners();
    this.movePlayer();
  }
  secondWave() {
    this.audioGame2.loop = true;
    this.audioGame2.play();
    const incrementVolume = () => {
      if (this.audioBackgroundGame2.volume < this.volumeMusic) {
        this.audioBackgroundGame2.volume += 0.1;
        setTimeout(incrementVolume, 1000);
      }
      incrementVolume();
    };
    setTimeout(() => {
      this.spawnEnemy(0.5, 1000, 2, 0);
    }, 5000);
    this.spawnBoss(3000, 2,6);
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
  spawnEnemy(movementSpeed, spawnInterval, classEnemy, firstSpawn) {
    //Spawn enemies every spawnInterval with movementSpeed after 15 seconds
    this.firstSpawnEnemy = setTimeout(() => {
      //Stop meteor spawn
      clearInterval(this.spawnerMeteor);
      this.spawnerEnemy = setInterval(() => {
        const newEnemy = new Enemy(movementSpeed, classEnemy);
        this.allEnemies.push(newEnemy);
      }, spawnInterval);
      this.intervalIds.push(this.spawnerEnemy);
    }, firstSpawn);
    this.timeoutIds.push(this.firstSpawnEnemy);
  }
  spawnBoss(health, classboss,classShot) {
    //Spawn boss with timeout 60 seconds
    this.spawnerBoss = setTimeout(() => {
      //Stop enemy spawn
      clearInterval(this.spawnerEnemy);
      setTimeout(() => {
        //Stop background music and play boss music
        this.audioBackgroundGame.pause();
        this.audioGame2.pause();
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
        const newBoss = new Boss(health, classboss,this.bossPositionX,this.bossPositionY);
        this.allEnemies.push(newBoss);
        setTimeout(()=>{
          this.spawnBossShot(10,classShot)
          this.spawnBossShot(33.5,classShot)
          this.moveBossShot(0.8);
        },6000)
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
  spawnShot(positionX,positionY, image) {
    //Player shots every XX ms
    this.spawnerShot = setInterval(() => {
      const newShot = new Shot(
        this.player.positionX + positionX,
        this.player.positionY + positionY,
        image
      );
      this.allShots.push(newShot);
    }, this.speedSpawnShot);
    this.allCanons.push(this.spawnerShot);
  }
  spawnBossShot(positionX,image) {
    this.spawnerBossShot = setInterval(() => {
      const newBossShotLeft = new Shot(
        this.bossPositionX + positionX,
        70,
        image
      );
      this.allBossShots.push(newBossShotLeft)
    }, 5000);
    console.log(this.bossPositionX)
    this.allIntervalBossShots.push(this.spawnerBossShot)
  }
  spawnBonus() {
    this.spawnerBonus = setInterval(() => {
      this.randomBonus = Math.floor(Math.random() * 4) + 1;
      const newBonus = new Bonus(this.randomBonus);
      this.allBonus.push(newBonus);
    }, 3000);
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
  moveBossShot(speed) {
    //Move the shots
    this.movementBossShot = setInterval(() => {
      this.allBossShots.forEach((bossShot, index) => {
        bossShot.moveDown(speed);
        if (bossShot.positionY < 0) {
          console.log("OUT")
          this.removeBossShot(bossShot, index);
        }
      });
    }, 16);
    this.intervalIds.push(this.movementBossShot);
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
    this.intervalIds.push(this.movementMeteor);
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
    }, 32);
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
        this.selectBonus(enemy);
      } else {
        if (this.health.innerHTML <= 1) {
          this.playerTakesDamage();
          this.displayGameOver();
        } else if (!this.playerDamageDelay) {
          this.playerDamageDelay = true;
          this.player.playerDamaged();
          this.health.innerHTML--;
          this.playerTakesDamage();
          enemy.health--;
          if (enemy.health <= 1) {
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
        if (
          enemy instanceof Meteor ||
          enemy instanceof Enemy ||
          enemy instanceof Boss
        )
        this.removeShot(shot, index);
        enemy.health--;
        if (enemy.health <= 1) {
          this.audioEnemyDie.play();
          if (enemy instanceof Meteor) {
            this.removeMeteor(enemy, indexEnemy);
            this.score.innerHTML++;
          }
          if (enemy instanceof Enemy) {
            this.removeEnemy(enemy, indexEnemy);
            this.score.innerHTML = Number(this.score.innerHTML) + 2;
          }
          if (enemy instanceof Boss) {
            enemy.bossHealthBar.remove();
            this.allIntervalBossShots.forEach(element=>{
              clearInterval(element)
            })
            this.removeEnemy(enemy, indexEnemy);
            this.score.innerHTML = Number(this.score.innerHTML) + 100;
            this.audioBoss.pause();
            if (this.Wave === 1) {
              this.Wave++
              this.secondWave();
            } else if (this.Wave===2) {
              this.Wave++
              this.displayWin();
            }
          }
        }
      }
    });
    this.allBossShots.forEach((shot,index)=>{
      if (
        shot.positionX <this.player.positionX +this.player.width &&
        shot.positionX + shot.width >this.player.positionX &&
        shot.positionY <this.player.positionY +this.player.height &&
        shot.positionY + shot.height >this.player.positionY
      )
      {
        if (this.health.innerHTML <= 1) {
          this.displayGameOver();
          this.playerTakesDamage();
        } else if (!this.playerDamageDelay) {
          this.playerDamageDelay = true;
          this.player.playerDamaged();
          this.health.innerHTML--;
          this.playerTakesDamage();
          this.removeBossShot(shot,index)
          this.playerDelay = setTimeout(() => {
            this.playerDamageDelay = false;
          }, 4000);
          this.timeoutIds.push(this.playerDelay);
        }
      }
    })
  }
  selectBonus(bonus) {
    switch (bonus.modify) {
      case 1:
        //More atack speed!!!
        if (this.speedSpawnShot > 100) {
          this.speedSpawnShot -= 50;
          this.allCanons.forEach((canon, index) => {
            //Stop spawner shot interval
            clearInterval(canon);
            //Foreach shot interval, call again with speedspawnshot modified
            this.allCanons[index] = setInterval(() => {
              const newShot = new Shot(
                this.player.positionX + this.positionCanon[index][0],
                this.player.positionY + this.positionCanon[index][1],
                this.imageShot
              );
              this.allShots.push(newShot);
            }, this.speedSpawnShot);
          });
        }
        break;
      case 2:
        //More speed movement
        if (this.player.speedMovement < 3) {
          this.player.speedMovement += 0.2;
        }
        break;
      case 3:
        //Bonus more bullets
        if (this.amountShot === 1) {
          this.spawnShot(4, 10, this.imageShot);
          this.amountShot++;
        } else if (this.amountShot === 2) {
          this.amountShot++;
          this.spawnShot(0, 3, this.imageShot);
        } else if (this.amountShot === 3) {
          this.spawnShot(8, 3, this.imageShot);
          this.amountShot++;
        }
        break;
      case 4:
        //Bonus to health the player!
        if (this.health.innerHTML < 3) this.health.innerHTML++;
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
  removeBossShot(shot, index) {
    shot.shotSpawn.remove();
    this.allBossShots.splice(index, 1);
  }
  removeBonus(bonus, index) {
    bonus.bonusSpawn.remove();
    this.allBonus.splice(index, 1);
  }
  clearIntervals() {
    for (let i = 0; i < this.intervalIds.length; i++) {
      clearInterval(this.intervalIds[i]);
    }
    for (let i = 0; i < this.timeoutIds.length; i++) {
      clearTimeout(this.timeoutIds[i]);
    }
    for (let i = 0; i < this.allCanons.length; i++) {
      clearTimeout(this.allCanons[i]);
    }
    for (let i = 0; i < this.allIntervalBossShots.length; i++) {
      clearTimeout(this.allIntervalBossShots[i]);
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
    this.stopAllAudios()
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
  displayWin() {
    this.clearIntervals();
    this.audioGame2.pause();
    this.audioWin.play();
    this.displayEnd = document.createElement("div");
    this.displayEnd.setAttribute("class", "display-window");
    this.displayEnd.innerHTML = `
    <h1 id="game-over-h1">WIN!!</h1>
    <p>Score : ${this.score.innerHTML}</p>
    <a href="#" onclick="location.reload()">Back to menu</a>
    `;
    this.boardElm.appendChild(this.displayEnd);
  }
  displayMenuWindow() {
    this.displayMenu = document.createElement("div");
    this.displayMenu.classList.add("display-window");
    this.displayMenu.setAttribute("id", "pause-title");
    this.displayMenu.innerHTML = `
          <h1 id="pause-h1">Pause</h1>
          <div id="pause">
              <h1><a onclick="options()">Options</a> </h1>
              <h1><a >Resume</a> </h1>
              <h1><a href="">Back to menu</a> </h1>
          </div>
          `;
    this.boardElm.append(this.displayMenu);
  }
}

function start() {
  game.start();
}
function selectorSpaceship() {
  game.spaceshipSelector();
}

const optionsDisplay = document.getElementById("options");
function options() {
  optionsDisplay.style.display = "flex";
}
function saveOptions() {
  optionsDisplay.style.display = "none";
}
