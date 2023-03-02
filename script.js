class Player {
    constructor (){
        this.positionX = 0;
        this.positionY = 0;
        this.playerElm = document.getElementById("player")
    }
    moveRight(){
        this.positionX++
        this.playerElm.style.left = this.positionX+"vh"
    }
    moveLeft(){
        this.positionX--
        this.playerElm.style.left = this.positionX+"vh"
    }
    moveUp(){
        this.positionY++
        this.playerElm.style.bottom = this.positionY+"vh"
    }
    moveDown(){
        this.positionY--
        this.playerElm.style.bottom = this.positionY+"vh"
    }
}

document.addEventListener("keydown",event => {
    switch (event.code) {
        case "ArrowRight":
            myPlayer.moveRight()
            break;
        case "ArrowLeft":
            myPlayer.moveLeft()
            break;
        case "ArrowUp":
            myPlayer.moveUp()
            break;
        case "ArrowDown":
            myPlayer.moveDown()
            break;
        default:
            break;
    }
})


const myPlayer = new Player