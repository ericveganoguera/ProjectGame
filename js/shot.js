class Shot {
    constructor(speed,positionX,positionY){
        this.width = 1;
        this.height = 1;
        this.positionX = positionX
        this.positionY = positionY
        this.speedMovement = speed
        this.createDomElement();
    }
    createDomElement(){
        this.shotSpawn = document.createElement("div")
        this.shotSpawn.setAttribute("class","shot")
        this.shotSpawn.setAttribute("style",`left:${this.positionX}vh; bottom:${this.positionY}vh`)
        this.playerElm = document.getElementById("player")
        this.playerElm.appendChild(this.shotSpawn)
        this.shotSpawn.style.width = this.width + "vh"
        this.shotSpawn.style.height = this.height + "vh"
    }
    moveUp(){
        this.positionY += this.speedMovement
        this.shotSpawn.style.bottom = this.positionY + "vh"
    }
}