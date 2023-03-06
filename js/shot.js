class Shot {
    constructor(positionX,positionY){
        this.width = 4;
        this.height = 2;
        this.positionX = positionX
        this.positionY = positionY
        this.speedMovement
        this.createDomElement();
    }
    createDomElement(){
        this.shotSpawn = document.createElement("div")
        this.shotSpawn.setAttribute("class","shot")
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
}