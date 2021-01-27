// replace all the "submit" and "reset" buttons with a single "save" button

import { settings, userData, updateLocalStorage } from './modules/data';

const waterForm = document.querySelector('#waterForm');
const bottleSizeField = document.querySelector('#bottleSize');
const waterGoalField = document.querySelector('#waterGoal');
const waterSubmit = document.querySelector('#waterSubmit');
const waterReset = document.querySelector('#waterReset');
const checkBoxDiv = document.querySelector('#waterCheckBoxes');
const waterMsg = document.querySelector('#waterMsg');

waterSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    settings.waterSettings.bottleSize = Number(bottleSizeField.value);
    settings.waterSettings.waterGoal = Number(waterGoalField.value);
    updateLocalStorage();
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
            settings.waterSettings.bottleSize * userData.finishedWater
        } oz of ${settings.waterSettings.waterGoal} oz`;
        waterMsg.textContent = msg;
    });

    console.log(checkBoxNum);
};

// POM TIMERS

const pomDurationField = document.querySelector('#pomDuration');
const breakDurationField = document.querySelector('#breakDuration');
const pomTimeSubmitBtn = document.querySelector('#pomSubmit');
const pomTimeResetBtn = document.querySelector('#pomReset');

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

    settings.pomSettings.pomDuration = Number(pomDurationField.value);
    settings.pomSettings.breakDuration = Number(breakDurationField.value);
    updateLocalStorage();
    // userData.pomDuration = 50;
    // breakDuration = 10;
    // currentTime = pomDuration;
    // currentTimeDiv.textContent = currentTime;
});

// POM TRACKER ADD/SUBTRACT/RESET

addPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.pomCounter++;
    pomCounterDiv.textContent = userData.pomCounter;
    updateLocalStorage();
});

subPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (userData.pomCounter !== 0) userData.pomCounter--;
    pomCounterDiv.textContent = userData.pomCounter;
    updateLocalStorage();
});

resetPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.pomCounter = 0;
    pomCounterDiv.textContent = userData.pomCounter;
    updateLocalStorage();
});

// BREAK TRACK ADD/SUBTRACT/RESET

addBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.breakCounter++;
    breakCounterDiv.textContent = userData.breakCounter;
    updateLocalStorage();
});

subBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (userData.breakCounter !== 0) userData.breakCounter--;
    breakCounterDiv.textContent = userData.breakCounter;
    updateLocalStorage();
});

resetBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.breakCounter = 0;
    breakCounterDiv.textContent = userData.breakCounter;
    updateLocalStorage();
});

// GIT TIMER

const commitFrequencyField = document.querySelector('#gitTimerDuration');
const commitFrequencySubmitBtn = document.querySelector('#gitDurationSubmit');
const commitFrequencyResetBtn = document.querySelector('#gitDurationReset');
const commitFrequencyTextDiv = document.querySelector('#currentGitInterval');

commitFrequencySubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    settings.commitSettings = Number(commitFrequencyField.value);
    commitFrequencyTextDiv.textContent = settings.commitSettings;
});

commitFrequencyResetBtn.addEventListener('click', function () {});

const setup = function () {
    pomCounterDiv.textContent = userData.pomCounter;
    breakCounterDiv.textContent = userData.breakCounter;

    bottleSizeField.value = settings.waterSettings.bottleSize;
    waterGoalField.value = settings.waterSettings.waterGoal;

    pomDurationField.value = settings.pomSettings.pomDuration;
    breakDurationField.value = settings.pomSettings.breakDuration;

    commitFrequencyField.value = settings.commitSettings.commitFrequency;
};

setup();

console.log(userData);
