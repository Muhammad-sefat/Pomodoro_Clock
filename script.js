const timer = document.querySelector(".timer");
const tittle = document.querySelector(".tittle");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const ResetBtn = document.querySelector(".ResetBtn");
const countPomoDisplay = document.querySelector(".countPomoDisplay");

// variables
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let timerID = null;
let oneRoundComplete = false;
let countTimer = 0;
let paused = false;

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
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sece = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    timer.textContent = `${mins}:${sece}`;
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

// get time in seconds
const getTimeInSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(":");
  return parseInt(minutes * 60) + parseInt(seconds);
};

// add eventlistener
startBtn.addEventListener("click", () => {
  timerID = startTimer(WORK_TIME);
  updateTitle("It's Work Time!");
});

ResetBtn.addEventListener("click", () => {
  stopTimer();
  timer.textContent = "25:00";
});

pauseBtn.addEventListener("click", () => {
  stopTimer();
  paused = true;
  updateTitle("Timer Pasued!");
});

resumeBtn.addEventListener("click", () => {
  if (paused) {
    const currentTime = getTimeInSeconds(timer.textContent);
    timerID = startTimer(currentTime);
    paused = false;
    !oneRoundComplete
      ? updateTitle("It's Work Time")
      : updateTitle("It's Break Time");
  }
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
