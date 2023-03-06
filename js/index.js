window.addEventListener("load", () => {
  this.game = new Game();
  game.intro();
});

function start() {
  this.game.start();
}

const audioButton = document.getElementById("mute-sound");
audioButton.addEventListener("click", () => {
  game.stopMusic()
});
