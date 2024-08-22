const timer = document.querySelector(".timer");
const tittle = document.querySelector(".tittle");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const ResetBtn = document.querySelector(".ResetBtn");
const countPomoDisplay = document.querySelector(".countPomoDisplay");

// variables
const WORK_TIME = 1 * 60;
const BREAK_TIME = 0.5 * 60;
let timerID = null;
let oneRoundComplete = false;
let countTimer = 0;

// function for save localstroage
const saveLocalCounts = () => {
  let counts = JSON.parse(localStorage.getItem("pomoCounts"));
  counts !== null ? counts++ : (counts = 1);
  localStorage.setItem("pomoCounts", JSON.stringify(counts));
};

// function for updateTitle
const updateTitle = (msg) => {
  tittle.textContent = msg;
};

// function for countDown
const countDown = (time) => {
  return () => {
    timer.textContent = time;
    time--;
    if (time <= 0) {
      stopTimer();
      if (!oneRoundComplete) {
        timerID = startTimer(BREAK_TIME);
        oneRoundComplete = true;
        updateTitle("It's Break Time!");
      } else {
        updateTitle("Completed One Round of Pomodoro Technique!");
        setTimeout(() => updateTitle("Start Timer Again", 2000));
        countTimer++;
        saveLocalCounts();
        showPomoCounts();
      }
    }
  };
};

// function for startTimer
const startTimer = (startTime) => {
  if (timerID !== null) {
    stopTimer();
  }
  return setInterval(countDown(startTime), 1000);
};

// function for stopTimer
const stopTimer = () => {
  clearInterval(timerID);
  timerID = null;
};

// add eventlistener
startBtn.addEventListener("click", () => {
  timerID = startTimer(WORK_TIME);
  updateTitle("It's Work Time!");
});

// function for show pomoCounts
const showPomoCounts = () => {
  const counts = JSON.parse(localStorage.getItem("pomoCounts"));
  if (counts > 0) {
    countPomoDisplay.style.display = "flex";
  }
  countPomoDisplay.firstElementChild.textContent = counts;
};
showPomoCounts();
