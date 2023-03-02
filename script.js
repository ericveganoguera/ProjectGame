const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

let x = 500
let y = 100
let size = 50


ctx.fillStyle = "blue"
ctx.fillRect(x,y,size,size)

document.addEventListener("keydown", event => {
    switch (event.code) {
        case "ArrowRight": x+=10
        break;
        case "ArrowLeft": x-=10
        break;
        case "ArrowDown": y-=10
        break;
        case "ArrowUp": y+=10
        break;
    }

    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(x,y,size,size)

    console.log("Square position: "+x+", "+y)
})