import { settings, userData, updateLocalStorage } from './modules/data';

// todo: Add functionality to the reset buttons

// WATER TRACKER ELEMENTS

const bottleSizeField = document.querySelector('#bottleSize');
const waterGoalField = document.querySelector('#waterGoal');
const waterReset = document.querySelector('#waterReset');

// POM TIMER ELEMENTS

const pomDurationField = document.querySelector('#pomDuration');
const breakDurationField = document.querySelector('#breakDuration');
const pomGoalField = document.querySelector('#pomGoal');
const breakGoalField = document.querySelector('#breakGoal');
const pomTimeResetBtn = document.querySelector('#pomReset');

// POM TRACKER ELEMENTS

const pomCounterDiv = document.querySelector('#pomCounter');
const addPomBtn = document.querySelector('#addPom');
const subPomBtn = document.querySelector('#subPom');
const resetPomBtn = document.querySelector('#resetPom');

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

// BREAK TRACKER ELEMENTS

const breakCounterDiv = document.querySelector('#breakCounter');
const addBreakBtn = document.querySelector('#addBreak');
const subBreakBtn = document.querySelector('#subBreak');
const resetBreakBtn = document.querySelector('#resetBreak');

// BREAK TRACKER ADD/SUBTRACT/RESET

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

const gitCounterDiv = document.querySelector('#gitCounter');
const addCommitBtn = document.querySelector('#addCommit');
const subCommitBtn = document.querySelector('#subCommit');
const resetCommitBtn = document.querySelector('#resetCommit');

// COMMIT TRACKER ADD/SUB/RESET

addCommitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.gitCounter++;
    gitCounterDiv.textContent = userData.gitCounter;
    updateLocalStorage();
});

subCommitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (userData.gitCounter !== 0) userData.gitCounter--;
    gitCounterDiv.textContent = userData.gitCounter;
    updateLocalStorage();
});

resetCommitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userData.gitCounter = 0;
    gitCounterDiv.textContent = userData.gitCounter;
    updateLocalStorage();
});
// GIT TIMER ELEMENTS

const commitFrequencyField = document.querySelector('#gitTimerDuration');
const commitGoalField = document.querySelector('#gitTimerGoal');
const commitDisabledCheckbox = document.querySelector('#gitTimerDisabled');
const commitFrequencyResetBtn = document.querySelector('#gitDurationReset');

// SAVE BUTTON

const saveBtn = document.querySelector('.save-btn');

saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // update water settings
    settings.waterSettings.bottleSize = Number(bottleSizeField.value);
    settings.waterSettings.waterGoal = Number(waterGoalField.value);
    settings.waterSettings.bottleGoal = Math.round(
        settings.waterSettings.waterGoal / settings.waterSettings.bottleSize
    );
    //update pom timer settings
    settings.pomSettings.pomDuration = Number(pomDurationField.value);
    settings.pomSettings.breakDuration = Number(breakDurationField.value);
    settings.pomSettings.pomGoal = Number(pomGoalField.value);
    settings.pomSettings.breakGoal = Number(breakGoalField.value);
    // update git timer settings
    settings.commitSettings.commitFrequency = Number(
        commitFrequencyField.value
    );
    settings.commitSettings.commitGoal = Number(commitGoalField.value);
    settings.commitSettings.commitDisabled = commitDisabledCheckbox.checked;

    updateLocalStorage();

    console.log(settings);
    console.log(localStorage.settings);
});

// SETUP

const setup = function () {
    pomCounterDiv.textContent = userData.pomCounter;
    breakCounterDiv.textContent = userData.breakCounter;
    gitCounterDiv.textContent = userData.gitCounter;

    bottleSizeField.value = settings.waterSettings.bottleSize;
    waterGoalField.value = settings.waterSettings.waterGoal;

    pomDurationField.value = settings.pomSettings.pomDuration;
    breakDurationField.value = settings.pomSettings.breakDuration;

    pomGoalField.value = settings.pomSettings.pomGoal;
    breakGoalField.value = settings.pomSettings.breakGoal;

    commitFrequencyField.value = settings.commitSettings.commitFrequency;
    commitGoalField.value = settings.commitSettings.commitGoal;
    commitDisabledCheckbox.checked = settings.commitSettings.commitDisabled;
};

setup();
