'use strict';

// water tracker

const waterForm = document.querySelector('.waterForm');
const bottleSizeField = document.querySelector('.bottleSize');
const waterGoalField = document.querySelector('.waterGoal');
const waterSubmit = document.querySelector('.waterSubmit');
const waterReset = document.querySelector('.waterReset');
const checkBoxDiv = document.querySelector('.waterCheckBoxes');
const waterMsg = document.querySelector('.waterMsg');
let finishedWater = 0;
let bottleSize = 0;
let waterGoal = 0;

waterSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    // let bottleSize = bottleSizeField.value;
    // let waterGoal = waterGoalField.value;

    bottleSize = 28;
    waterGoal = 128;

    generateWaterCBs(bottleSize, waterGoal);

    // waterForm.style.visibility = 'hidden';
});

const generateWaterCBs = function (size, goal) {
    const checkBoxNum = Math.ceil(goal / size);

    for (let i = 0; i < checkBoxNum; i++) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'checkbox' + i;

        checkBoxDiv.prepend(checkBox);
    }

    checkBoxDiv.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT') {
            if (e.target.checked === true) {
                finishedWater++;
            } else if (e.target.tagName === 'INPUT') {
                finishedWater--;
            }
        }
        const msg = `You have drank ${
            bottleSize * finishedWater
        } oz of ${waterGoal} oz`;
        waterMsg.textContent = msg;
    });

    console.log(checkBoxNum);
};

// accept an input time
// update UI with set time
// use setTimer to create a function to countdown timer which updates the UI value
// when timer hits 0, execute alarm

// start and stop buttons

// break timer

// pom timers
const pomTimerForm = document.querySelector('.pomTimerForm');
const pomDurationField = document.querySelector('.pomDuration');
const breakDurationField = document.querySelector('.breakDuration');
const pomSubmit = document.querySelector('.pomSubmit');
const pomReset = document.querySelector('.pomReset');
let pomDuration = 0;
let breakDuration = 0;
const currentTimeDiv = document.querySelector('.currentTime');
const timerToggleBtn = document.querySelector('.timerToggle');
const timerResetBtn = document.querySelector('.timerReset');
const selectPomBtn = document.querySelector('.selectPom');
const selectBreakBtn = document.querySelector('.selectBreak');
const pomCounterDiv = document.querySelector('.pomCounter');
const breakCounterDiv = document.querySelector('.breakCounter');
let currentTime;
let timerActive = false;
let timer;
let timerType = 'pomodoro';
let breakCounter = 0;
let pomodoroCounter = 0;

const startTimer = function () {
    timer = setInterval(function () {
        currentTime--;
        currentTimeDiv.textContent = currentTime;

        if (currentTime === 0) {
            stopTimer();
            timerActive = false;
            if (timerType === 'pomodoro') {
                pomodoroCounter++;
                pomCounterDiv.textContent = pomodoroCounter;
            } else {
                breakCounter++;
                breakCounterDiv.textContent = breakCounter;
            }
        }
    }, 100);
};

const stopTimer = function () {
    clearInterval(timer);
};

pomSubmit.addEventListener('click', function (e) {
    e.preventDefault();

    // should check for null values

    pomDuration = pomDurationField.value;
    breakDuration = breakDurationField.value;
    // pomDuration = 50;
    // breakDuration = 10;
    currentTime = pomDuration;
    currentTimeDiv.textContent = currentTime;
});

timerResetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    currentTime = pomDuration;
    currentTimeDiv.textContent = currentTime;
});

timerToggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // fix button text when time has run out
    if (timerActive) {
        timerToggleBtn.textContent = 'Start';
        stopTimer();
    } else if (currentTime !== 0) {
        timerToggleBtn.textContent = 'Stop';
        startTimer();
    }
    timerActive = timerActive ? false : true;
});

selectPomBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerType = 'pomodoro';
    currentTime = pomDuration;
    currentTimeDiv.textContent = currentTime;
});

selectBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerType = 'break';
    currentTime = breakDuration;
    currentTimeDiv.textContent = currentTime;
});

// pom/break trackers

// pom tracker
// receives goal poms

// git timer

// dark mode

// to do list

// notepad
