import { settings, userData } from './modules/data';

const waterForm = document.querySelector('#waterForm');
const bottleSizeField = document.querySelector('#bottleSize');
const waterGoalField = document.querySelector('#waterGoal');
const waterSubmit = document.querySelector('#waterSubmit');
const waterReset = document.querySelector('#waterReset');
const checkBoxDiv = document.querySelector('#waterCheckBoxes');
const waterMsg = document.querySelector('#waterMsg');
let bottleSize = 0;
let waterGoal = 0;

waterSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    settings.waterSettings.bottleSize = Number(bottleSizeField.value);
    settings.waterSettings.waterGoal = Number(waterGoalField.value);

    // generateWaterCBs(bottleSize, waterGoal);
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
                userData.finishedWater++;
            } else if (e.target.tagName === 'INPUT') {
                userData.finishedWater--;
            }
        }
        const msg = `You have drank ${
            bottleSize * userData.finishedWater
        } oz of ${waterGoal} oz`;
        waterMsg.textContent = msg;
    });

    console.log(checkBoxNum);
};

// POM TIMERS

const pomDurationField = document.querySelector('#pomDuration');
const breakDurationField = document.querySelector('#breakDuration');
const pomTimeSubmitBtn = document.querySelector('#pomSubmit');
const pomTimeResetBtn = document.querySelector('#pomReset');

let breakDuration = 0;

const pomCounterDiv = document.querySelector('#pomCounter');
const breakCounterDiv = document.querySelector('#breakCounter');
const addBreakBtn = document.querySelector('#addBreak');
const subBreakBtn = document.querySelector('#subBreak');
const addPomBtn = document.querySelector('#addPom');
const subPomBtn = document.querySelector('#subPom');
const resetPomBtn = document.querySelector('#resetPom');
const resetBreakBtn = document.querySelector('#resetBreak');

pomTimeSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // should check for null values

    // userData.pomDuration = pomDurationField.value;
    // breakDuration = breakDurationField.value;
    userData.pomDuration = 50;
    breakDuration = 10;
    currentTime = pomDuration;
    currentTimeDiv.textContent = currentTime;
});

// POM AND BREAK TRACKERS

addPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.pomCounter++;
    pomCounterDiv.textContent = userData.pomCounter;
});

subPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (userData.pomCounter !== 0) userData.pomCounter--;
    pomCounterDiv.textContent = userData.pomCounter;
});

resetPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.pomCounter = 0;
    pomCounterDiv.textContent = userData.pomCounter;
});

addBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.breakCounter++;
    breakCounterDiv.textContent = userData.breakCounter;
});

subBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (userData.breakCounter !== 0) userData.breakCounter--;
    breakCounterDiv.textContent = breakCounter;
});

resetBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.breakCounter = 0;
    breakCounterDiv.textContent = breakCounter;
});

// GIT TIMER

const gitTimerDurationField = document.querySelector('#gitTimerDuration');
const gitDurationSubmitBtn = document.querySelector('#gitDurationSubmit');
const gitDurationResetBtn = document.querySelector('#gitDurationReset');
const currentGitIntervalDiv = document.querySelector('#currentGitInterval');
let gitDuration;

gitDurationSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    gitDuration = gitTimerDurationField.value;
    currentGitIntervalDiv.textContent = gitDuration;
});
