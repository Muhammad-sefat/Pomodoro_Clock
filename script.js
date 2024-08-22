const timer = document.querySelector(".timer");
const tittle = document.querySelector(".tittle");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const ResetBtn = document.querySelector(".ResetBtn");

// function for start btn
const startButton = () => {
  alert("started");
};

// add eventlistener
startBtn.addEventListener("click", () => {
  startButton();
});
