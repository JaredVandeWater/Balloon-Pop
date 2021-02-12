//BUTTONS

let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")



//#region Game Logic



//DATA

let clickCount = 0;
let height = 120;
let width = 100;
let inflationRate = 20;
let maxSize = 300
let currentPopCount = 0
let highestPopCount = 0
let gameLength = 5000
let clockID = 0
let timeleft = 0
let currentPlayer = {}



function startGame() {
  startButton.setAttribute("disabled", "true");
  inflateButton.removeAttribute("disabled");
  startClock();
  setTimeout(stopGame, gameLength);
}


function startClock() {
  timeleft = gameLength
  drawClock();
  clockID = setInterval(drawClock, 1000)
}
function stopClock() {
  clearInterval(clockID);


}

function drawClock() {
  let countddownelem = document.getElementById("countdown");
  countddownelem.innerText = (timeleft / 1000).toString();
  timeleft -= 1000;
}


function inflate() {
  clickCount++
  height += inflationRate
  width += inflationRate
  if (height >= maxSize) {
    currentPopCount++
    height = 0
    width = 0
  }
  draw();
}


function draw() {
  let balloon = document.getElementById("balloon");
  let buttonclickcount = document.getElementById("click-count");
  let popCountelem = document.getElementById("pop-count");
  let highscoreelem = document.getElementById("highscore");

  balloon.style.height = height + "px";
  balloon.style.width = width + "px";
  buttonclickcount.innerText = clickCount.toString();
  popCountelem.innerText = currentPopCount.toString();
  highscoreelem.innerText = currentPlayer.topScore.toString();
}


function stopGame() {

  inflateButton.setAttribute("disabled", "true")
  startButton.removeAttribute("disabled")
  clickCount = 0;
  height = 120;
  width = 100;


  if (currentPopCount > currentPlayer.topScore) {
    currentPlayer.topScore = currentPopCount;
    savePlayers()
  }
  currentPopCount = 0;


  stopClock()
  draw();
}

//#endregion


let players = []
loadPlayers()

function setPlayer(event) {
  event.preventDefault()
  let form = event.target

  let playerName = form.playerName.value

  currentPlayer = players.find(player => player.name == playerName)



  if (!currentPlayer) {

    currentPlayer = { name: playerName, topScore: 0 };
    players.push(currentPlayer);
    savePlayers();

  }

  form.reset();
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
}


function savePlayers() {
  window.localStorage.setItem("players", JSON.stringify(players));

}


function loadPlayers() {
  let playersData = JSON.parse(window.localStorage.getItem("players"));
  if (playersData) {
    players = playersData;
  }
}