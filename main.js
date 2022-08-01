const garage = new Audio("audio/title.mp3");
const wheelspin = new Audio("audio/wheelspin.mp3");
const beep = new Audio("audio/beep.wav");
const go = new Audio("audio/go.wav");
const drive = new Audio("audio/drive.mp3");
const bov = new Audio("audio/bov.wav");
let path = "audio/rx7engine.wav";

const player = document.getElementById("player");
const wheel1 = document.getElementById("wheel1");
const wheel2 = document.getElementById("wheel2");
const revcounter = document.getElementById("revcounter");
const needle = document.getElementById("needle");
let reactionTime = 0;
let finalTime = 0;
const nameBox = document.getElementById("inputName");
const scoreNameArray = [
  document.getElementById("score1"),
  document.getElementById("score2"),
  document.getElementById("score3"),
  document.getElementById("score4"),
  document.getElementById("score5"),
];

const scoreArray = [
  ["Moomin: ", 2.815],
  ["Timmy: ", 5.612],
  ["Karen: ", 5.713],
  ["Pedro: ", 16.895],
  ["Bert: ", 17.126],
];
let keyProtect = 0;
let keyProtectRev = 0;
let launchRev = getCurrentRotation();
let launchSpeed = 0;
const launchMessage = document.getElementById("launchMessage");

let revBy = 0;
let revDownBy = -45;
let activeCar = 0; //for object function to call correct player image

const carGarage = [
  {
    Make: "Mazda",
    Model: "RX-7",
    Year: "1998",
    Power: "260 BHP",
    image: function () {
      document.getElementById("carImage").style.backgroundImage = "url(images/rx7.png)";
      player.style.backgroundImage = "url(images/rx7.png)";
      document.getElementById("wheel1").style.backgroundImage = "url(images/rx7wheel.png)";
      document.getElementById("wheel2").style.backgroundImage = "url(images/rx7wheel.png)";
      document.getElementById("wheel1").style.left = "2.2em";
      document.getElementById("wheel2").style.left = "9.4em";
      activeCar = 0;
      path = "audio/rx7engine.wav";
      setPath();
    },
  },

  {
    Make: "Nissan",
    Model: "Skyline",
    Year: "1994",
    Power: "280 BHP",
    image: function () {
      document.getElementById("carImage").style.backgroundImage = "url(images/skyline.png)";
      player.style.backgroundImage = "url(images/skyline.png)";
      document.getElementById("wheel1").style.backgroundImage = "url(images/skylinewheel.png)";
      document.getElementById("wheel2").style.backgroundImage = "url(images/skylinewheel.png)";
      document.getElementById("wheel1").style.left = "1.75em";
      document.getElementById("wheel2").style.left = "9.45em";
      activeCar = 1;
      path = "audio/skylineengine.wav";
      setPath();
    },
  },

  {
    Make: "Toyota",
    Model: "Supra",
    Year: "2020",
    Power: "360 BHP",
    image: function () {
      document.getElementById("carImage").style.backgroundImage = "url(images/supra.png)";
      player.style.backgroundImage = "url(images/supra.png)";
      document.getElementById("wheel1").style.backgroundImage = "url(images/suprawheel.png)";
      document.getElementById("wheel2").style.backgroundImage = "url(images/suprawheel.png)";
      document.getElementById("wheel1").style.left = "2.1em";
      document.getElementById("wheel2").style.left = "9.2em";
      activeCar = 2;
      path = "audio/supraengine.wav";
      setPath();
    },
  },
];

function changeToGarage() {
  garage.play();
  garage.volume = 0.1;
  changeCar(0);
  document.getElementById("fadeScreen").style.display = "block";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("carSelect").style.display = "block";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("timerID").style.display = "none";
  document.getElementById("highScores").style.display = "none";
}

function changeCar(i) {
  let carSpecs = "";
  for (let key in carGarage[i]) {
    if ([key].toString() !== "image") {
      carSpecs += "<li>" + [key] + ": " + carGarage[i][key] + "</li>" + "</br>";
    }
  }
  carGarage[i].image();
  document.getElementById("carData").innerHTML = carSpecs;
}

//start drag countdown
function startRace() {
  pitchChange = 0;
  launchRev = 0;
  revBy = 0;
  revCar();
  garage.pause();
  keyProtect = 13;
  keyProtectRev = 32;
  launchSpeed = 0;
  startNum = 7;

  skid1.style.setProperty("animation", "0");
  skid1.style.setProperty("display", "none");
  skid2.style.setProperty("animation", "0");
  skid2.style.setProperty("display", "none");
  document.getElementById("fadeScreen").style.display = "none";
  document.getElementById("carSelect").style.display = "none";
  document.getElementById("highScores").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("inputName").value = "";
  document.getElementById("timerID").style.display = "block";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("jumpStart").style.display = "none";
  document.getElementById("revcounter").style.display = "block";
  document.getElementById("needle").style.display = "block";
  document.getElementById("timeR").textContent = "0.00";
  needle.style.transform = "rotate(-45deg)";
  player.style.setProperty("animation", "0");
  wheel1.style.setProperty("animation", "0");
  wheel2.style.setProperty("animation", "0");

  let amberLights = document.querySelectorAll('[class^="amber"]');

  for (let i = 0; i < amberLights.length; i++) {
    amberLights[i].style.background = "rgb(255, 217, 0)";
    amberLights[i].style.boxShadow = "0em 0em 2em 0em yellow";
  }

  player.style.display = "block";

  countDown();
}

function getCurrentRotation() {
  //getcomputedstyle for transform turns into matrix value, code splits to array takes to vals to cal current rotation
  let values = window.getComputedStyle(needle).getPropertyValue("transform").split("(")[1].split(")")[0].split(",");
  return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
}

//rev down

document.body.addEventListener("keyup", keyUpPressesUp);
function keyUpPressesUp(press) {
  if (press.keyCode === keyProtectRev) {
    player.style.setProperty("animation", "0");
    revBy = 0;
    needle.style.transform = "rotate(" + revDownBy + "deg)";
    pitchChange = -0.1;
    bov.volume = 0.05;
    bov.currentTime = 0;
    bov.play()
  }   
}

//rev up

document.body.addEventListener("keydown", keyUpPresses);
function keyUpPresses(press) {
  if (press.keyCode === keyProtectRev) {
    player.style.setProperty("animation", "shake 2s linear infinite");
    revBy += 28;
    needle.style.transform = "rotate(" + revBy + "deg)";
    launchRev = getCurrentRotation();
    pitchChange = 0.02;
    
  }

  //launch

  if (press.keyCode === keyProtect) {
    if (startNum > 0) {
      jumpStart();
    } else {
      wheelspin.volume = 0.5;
      wheelspin.play();
      drive.volume = 0.3;
      drive.play();
      keyProtectRev = 0;
      clearInterval(counttimer);
      reactionTime = startNum / 1.5;
      launchSpeed = launchRev;
      skid1.style.setProperty("animation", "skidani 1s ease-in");
      skid1.style.setProperty("display", "block");
      skid2.style.setProperty("animation", "skidani 1s ease-in");
      skid2.style.setProperty("display", "block");
      

      //launch quality

      if (launchSpeed > 70 && launchSpeed < 115) {
        player.style.setProperty("animation", "launch 2s ease-in");
        launchMessage.style.display = "block";
        launchMessage.innerText = "Perfect launch!";
      } else if (launchSpeed > 30 && launchSpeed < 70) {
        player.style.setProperty("animation", "launch 2.1s ease-in");
        launchMessage.style.display = "block";
        launchMessage.innerText = "Good launch!";
      } else {
        player.style.setProperty("animation", "launch 2.5s ease-in");
        launchMessage.style.display = "block";
        launchMessage.innerText = "Poor launch!";
      }

      wheel1.style.setProperty("animation", "wheels 0.08s linear infinite");
      wheel2.style.setProperty("animation", "wheels 0.1s linear infinite");
      document.querySelector("#lightContainer :nth-child(7)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(8)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(7)").style.boxShadow = "none";
      document.querySelector("#lightContainer :nth-child(8)").style.boxShadow = "none";
      document.getElementById("revcounter").style.display = "none";
      document.getElementById("needle").style.display = "none";

      startTimer();
    }
  }
}

function startTimer() {
  starttimer = setInterval(function () {
    let timeLeft = document.getElementById("timeR").textContent;
    let current = parseFloat(timeLeft) + 0.01;
    document.getElementById("timeR").textContent = current.toFixed(2);
  }, 10);
}



function countDown() {
  counttimer = setInterval(function () {
    let current = startNum - 0.01;
    startNum = current;

    if (startNum > 3.9 && startNum < 4.3) {
      beep.play();
    }

    if (startNum < 4) {
      document.querySelector("#lightContainer :nth-child(1)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(1)").style.boxShadow = "none";
      document.querySelector("#lightContainer :nth-child(2)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(2)").style.boxShadow = "none";
    }

    if (startNum < 3) {
      document.querySelector("#lightContainer :nth-child(3)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(3)").style.boxShadow = "none";
      document.querySelector("#lightContainer :nth-child(4)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(4)").style.boxShadow = "none";
    }

    if (startNum < 2) {
      document.querySelector("#lightContainer :nth-child(5)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(5)").style.boxShadow = "none";
      document.querySelector("#lightContainer :nth-child(6)").style.background = "none";
      document.querySelector("#lightContainer :nth-child(6)").style.boxShadow = "none";
    }

    if (startNum > 0.01 && startNum < 0.02) {
      go.play();
    }
    if (startNum < 0) {
      document.querySelector("#lightContainer :nth-child(7)").style.background = "green";
      document.querySelector("#lightContainer :nth-child(7)").style.boxShadow = "0em 0em 2em 0em rgb(234, 255, 2)";
      document.querySelector("#lightContainer :nth-child(8)").style.background = "green";
      document.querySelector("#lightContainer :nth-child(8)").style.boxShadow = "0em 0em 2em 0em rgb(234, 255, 2)";
    }

    if (startNum < -5) {
    }
  }, 10);
}

setInterval(function () {
  //rev limiter
  if (launchRev > 150 || launchRev < -46) {
    needle.style.transform = "rotate(" + revDownBy + "deg)";
  }

  //check if crossed line

  let carLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  if (carLeft >= 920) {
    //get dragtime
    finalTime = parseFloat(document.getElementById("timeR").textContent) + Math.abs(reactionTime);
  }
  if (carLeft >= 970) {
    gameOver();
  }
}, 1);

function gameOver() {
  clearInterval(starttimer);
  document.getElementById("timeR").textContent = "0.00";
  document.getElementById("gameOver").style.display = "block";
  document.getElementById("timerID").style.display = "none";
  launchMessage.style.display = "none";
  player.style.display = "none";
  yourReact.textContent = `Reaction: ${Math.abs(reactionTime.toFixed(3))}`;
  yourReact2.textContent = `Reaction: ${Math.abs(reactionTime.toFixed(3))}`;
  yourScore.textContent = `Your time: ${finalTime.toFixed(4)}`;

  if (finalTime < scoreArray[0][1]) {
    document.getElementById("newHighScore").style.display = "block";
    document.getElementById("newHigh").textContent = `Your time: ${finalTime.toFixed(3)}`;
    document.getElementById("gameOver").style.display = "none";
  }
}

function jumpStart() {
  clearInterval(counttimer);
  document.getElementById("timeR").textContent = "0.00";
  document.getElementById("jumpStart").style.display = "block";
  document.getElementById("timerID").style.display = "none";
  player.style.display = "none";
}

function highScores() {
  document.getElementById("newHighScore").style.display = "none";
  document.getElementById("highScores").style.display = "block";
  document.getElementById("gameOver").style.display = "none;";

  if (finalTime < scoreArray[0][1]) {
    scoreArray.pop();
    scoreArray.unshift([nameBox.value, finalTime.toFixed(3)]);
  }
  for (let i = 0; i < 5; i++) {
    scoreNameArray[i].textContent = scoreArray[i][0] + ": " + scoreArray[i][1]; //assigns array values to scoreboard
  }
}

//rev sound effect

let audio;
let pitchChange = 0;
let revChangeTimer;
const audioCtx = new AudioContext();
//using html web audio api
function setPath() {
  // makes new audio context obj
  fetch(path) //set path of sound file
    .then((data) => data.arrayBuffer()) //puts sound data into buffer -
    .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer)) //decodes sound data
    .then((decodedAudio) => {
      audio = decodedAudio; //assign decoded sound to audio var - can now play with it
    });
}
let playSound = audioCtx.createBufferSource(); //make buffer source

function revCar() {
  playSound = audioCtx.createBufferSource();
  playSound.buffer = audio; //assign decoded sound to buffer source
  playSound.connect(audioCtx.destination); //connect sound to audio ctx
  playSound.loop = true; //loop the sound
  playSound.start(audioCtx.currentTime); //play sound

  //volume control for engine sound

  const gainNode = audioCtx.createGain();
  playSound.connect(gainNode).connect(audioCtx.destination);
  gainNode.gain.value = -1.5;

  revChangeTimer = setInterval(function () {
    let currPitch = playSound.playbackRate.value; //current pitch

    if ((pitchChange < 0 && currPitch > 1.0) || (pitchChange > 0 && currPitch < 2.2)) {
      playSound.playbackRate.value += pitchChange; //change playback rate depending on keyup/down value at time.
    }
  }, 35);
}

window.addEventListener("keydown", stopSound);
function stopSound(press) {
  if (press.keyCode == keyProtect) {
    if (playSound !== null) {
      playSound.stop();
      playSound = null; //needed to reinstate audio when restart
      clearInterval(revChangeTimer);
      keyProtect = 0;
    }
  }
}

//buttons on rotate

function getOrn() {


  return screen.orientation.type;
}

window.addEventListener("orientationchange", addButtons);

function addButtons () {
  if (getOrn() == "landscape-primary") {
    document.getElementById("main").style.display = "none";
    document.getElementById("gameContain").style.marginTop = "17em";
    document.getElementById("rev").style.display = "block";
    document.getElementById("launch").style.display = "block";

  }

  if (getOrn() == "portrait-primary") {
    document.getElementById("main").style.display = "block";
    document.getElementById("gameContain").style.marginTop = "28em";
    document.getElementById("rev").style.display = "none";
    document.getElementById("launch").style.display = "none";

  }
}

rev.addEventListener("touchstart", clickRevUp);
rev.addEventListener("touchend", clickRevDown);
launch.addEventListener("click", launchFun);
// rev.dispatchEvent(new KeyboardEvent('keydown', {'keyCode':32,'which':32}));

function clickRevUp(){
  console.log("up")
  player.style.setProperty("animation", "shake 2s linear infinite");
  revBy += 28;
  needle.style.transform = "rotate(" + revBy + "deg)";
  launchRev = getCurrentRotation();
  pitchChange = 0.02;
}

function clickRevDown(){
  console.log("down")
  player.style.setProperty("animation", "0");
  revBy = 0;
  needle.style.transform = "rotate(" + revDownBy + "deg)";
  pitchChange = -0.1;
  bov.volume = 0.05;
  bov.currentTime = 0;
  bov.play()
}



function clickLauch() {

  if (startNum > 0) {
    jumpStart();
  } else {
    wheelspin.volume = 0.5;
    wheelspin.play();
    drive.volume = 0.3;
    drive.play();
    keyProtectRev = 0;
    clearInterval(counttimer);
    reactionTime = startNum / 1.5;
    launchSpeed = launchRev;
    skid1.style.setProperty("animation", "skidani 1s ease-in");
    skid1.style.setProperty("display", "block");
    skid2.style.setProperty("animation", "skidani 1s ease-in");
    skid2.style.setProperty("display", "block");
    

    //launch quality

    if (launchSpeed > 70 && launchSpeed < 115) {
      player.style.setProperty("animation", "launch 2s ease-in");
      launchMessage.style.display = "block";
      launchMessage.innerText = "Perfect launch!";
    } else if (launchSpeed > 30 && launchSpeed < 70) {
      player.style.setProperty("animation", "launch 2.1s ease-in");
      launchMessage.style.display = "block";
      launchMessage.innerText = "Good launch!";
    } else {
      player.style.setProperty("animation", "launch 2.5s ease-in");
      launchMessage.style.display = "block";
      launchMessage.innerText = "Poor launch!";
    }

    wheel1.style.setProperty("animation", "wheels 0.08s linear infinite");
    wheel2.style.setProperty("animation", "wheels 0.1s linear infinite");
    document.querySelector("#lightContainer :nth-child(7)").style.background = "none";
    document.querySelector("#lightContainer :nth-child(8)").style.background = "none";
    document.querySelector("#lightContainer :nth-child(7)").style.boxShadow = "none";
    document.querySelector("#lightContainer :nth-child(8)").style.boxShadow = "none";
    document.getElementById("revcounter").style.display = "none";
    document.getElementById("needle").style.display = "none";

    startTimer();
  }
}

function stopSoundClick () {
  if (playSound !== null) {
    playSound.stop();
    playSound = null; //needed to reinstate audio when restart
    clearInterval(revChangeTimer);
    keyProtect = 0;
  }

}

function launchFun () {
  clickLauch()
  stopSoundClick()
}