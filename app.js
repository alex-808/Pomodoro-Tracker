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
const pomForm = document.querySelector('.pomForm');
const pomDurationField = document.querySelector('.pomDuration');
const breakDurationField = document.querySelector('.breakDuration');
const pomSubmit = document.querySelector('.pomSubmit');
const pomReset = document.querySelector('.pomReset');
let pomDuration = 0;
let breakDuration = 0;
const currentTimeDiv = document.querySelector('.currentTime');
const timerToggleBtn = document.querySelector('.timerToggle');
const timerResetBtn = document.querySelector('.timerReset');
let currentTime;
let timerActive = false;
let timer;

pomSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    // pomDuration = pomDurationField.value;
    // breakDuration = breakDurationField.value;
    pomDuration = 50;
    breakDuration = 10;
    currentTime = pomDuration;
    currentTimeDiv.textContent = currentTime;
});

const startTimer = function () {
    timer = setInterval(function () {
        currentTime--;
        currentTimeDiv.textContent = currentTime;
    }, 1000);
};

const stopTimer = function () {
    clearInterval(timer);
};

timerToggleBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (timerActive) stopTimer();
    else startTimer();
    timerActive = timerActive ? false : true;
});

// break tracker

// dark mode

// pom tracker
// receives goal poms

// git timer

// to do list

// notepad
