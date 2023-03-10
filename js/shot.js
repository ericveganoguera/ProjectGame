class Shot {
    constructor(positionX,positionY,image){
        this.width = 4;
        this.height = 2;
        this.positionX = positionX
        this.positionY = positionY
        this.speedMovement
        this.createDomElement();
        this.selectBackground(image)
    }
    createDomElement(){
        this.shotSpawn = document.createElement("div")
        this.shotSpawn.classList.add("shot")
        this.shotSpawn.setAttribute("style",`left:${this.positionX}vh; bottom:${this.positionY}vh`)
        this.boardElm = document.getElementById("board")
        this.boardElm.appendChild(this.shotSpawn)
        this.shotSpawn.style.width = this.width + "vh"
        this.shotSpawn.style.height = this.height + "vh"
    }
    moveUp(speed){
        this.positionY += speed
        this.shotSpawn.style.bottom = this.positionY + "vh"
    }
    moveDown(speed){
        this.positionY -= speed
        this.shotSpawn.style.bottom = this.positionY + "vh"
    }
    selectBackground(image) {
      switch (image) {
        case 1:
          this.shotSpawn.classList.add("shot1")
          break;
          case 2:
          this.shotSpawn.classList.add("shot2")
          break;
          case 3:
          this.shotSpawn.classList.add("shot3")
          break;
          case 4:
          this.shotSpawn.classList.add("shot4")
          break;
          case 5:
          this.shotSpawn.classList.add("shot5")
          this.width = 30;
          this.height = 15;
          this.shotSpawn.style.width = this.width + "vh"
          this.shotSpawn.style.height = this.height + "vh"
          break;
          case 6:
          this.shotSpawn.classList.add("shot6")
          this.width = 30;
          this.height = 15;
          this.shotSpawn.style.width = this.width + "vh"
          this.shotSpawn.style.height = this.height + "vh"
          break;
      }
    }
}