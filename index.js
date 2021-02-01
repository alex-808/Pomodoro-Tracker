'use strict';

import {
    settings,
    timerState,
    userData,
    updateLocalStorage,
} from './modules/data.js';
import { startDayCheckTimer, checkDayChange } from './modules/daily.js';

checkDayChange();
startDayCheckTimer();

let timer;

// TIMER BUTTON ELEMENTS
const timerToggleBtn = document.querySelector('#timerToggle');
const timerResetBtn = document.querySelector('#timerReset');
const selectPomBtn = document.querySelector('#selectPom');
const selectBreakBtn = document.querySelector('#selectBreak');

// TIMER DISPLAY DIVS
const currentTimeDiv = document.querySelector('#currentTime');

// TIMER CONTROL

const timerSound = document.querySelector('#timerSound');

const startTimer = function () {
    console.log('timer started');
    timerState.timerActive = true;
    timer = setInterval(function () {
        timerState.currentTime--;
        currentTimeDiv.textContent = timerState.currentTime;
        timerToggleBtn.textContent = 'Stop';

        // update totalPomElapsed time if pomodoro timer
        if (timerState.timerType === 'pomodoro') {
            timerState.totalPomElapsedTime++;
            const commitFreqHit =
                timerState.totalPomElapsedTime %
                settings.commitSettings.commitFrequency
                    ? false
                    : true;
            if (commitFreqHit && !settings.commitSettings.commitDisabled) {
                const prompt = window.prompt('Did you commit? (Y/N)');
                if (prompt === 'y') {
                    updateTrackerFromTimer('gitCounter', commitCheckBoxes);
                }
            }
        }

        if (timerState.currentTime === 0) {
            stopTimer();
            timerSound.play();

            if (timerState.timerType === 'pomodoro') {
                updateTrackerFromTimer('pomCounter', pomCheckBoxes);
            } else {
                updateTrackerFromTimer('breakCounter', breakCheckBoxes);
            }
        }
    }, 10);
};

const stopTimer = function () {
    console.log('timer stopped');
    timerToggleBtn.textContent = 'Start';
    clearInterval(timer);
    timerState.timerActive = false;
};

// GIT TRACKER CONTROL

const updateTrackerFromTimer = function (prop, checkboxes) {
    userData[prop]++;
    console.log(checkboxes);
    const unchecked = checkboxes.find((el) => el.checked === false);
    if (!unchecked) {
        const parent = checkboxes[0].parentElement;
        addCheckedBox(parent);
        return;
    }
    unchecked.checked = true;
};

const addCheckedBox = function (el) {
    const checkedBox = document.createElement('input');
    checkedBox.setAttribute('type', 'checkbox');
    checkedBox.checked = true;
    el.append(checkedBox);
};

// TIMER BUTTONS

timerResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (timerState.timerType === 'pomodoro') {
        timerState.currentTime = settings.pomSettings.pomDuration;
    } else {
        timerState.currentTime = settings.pomSettings.breakDuration;
    }
    currentTimeDiv.textContent = timerState.currentTime;
});

timerToggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(timerState.timerActive);
    // fix button text when time has run out
    if (timerState.currentTime !== 0) {
        if (timerState.timerActive) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    console.log(timerState.timerActive);
});

selectPomBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerState.timerType = 'pomodoro';
    console.log(settings.pomSettings);
    timerState.currentTime = settings.pomSettings.pomDuration;
    currentTimeDiv.textContent = timerState.currentTime;
});

selectBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerState.timerType = 'break';
    timerState.currentTime = settings.pomSettings.breakDuration;
    currentTimeDiv.textContent = timerState.currentTime;
});

// NOTEPAD

const notePadTextArea = document.querySelector('#notePad');

notePadTextArea.addEventListener('keyup', function (e) {
    userData.notePadText = notePadTextArea.value;
});

// TO DOS

const todosForm = document.querySelector('#todosForm');
const todoList = document.querySelector('#todoList');
const addTodoField = document.querySelector('#addTodoField');
const addTodoBtn = document.querySelector('#addTodo');

addTodoBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const todoText = addTodoField.value;
    addTodoField.value = '';

    const todoItem = document.createElement('li');
    const todoCB = document.createElement('input');
    todoCB.type = 'checkbox';

    todoItem.textContent = todoText;
    todoList.prepend(todoItem);
    todoItem.prepend(todoCB);

    todoCB.addEventListener('click', function (e) {
        console.dir(e.target.checked);
        if (e.target.checked) {
            todoItem.classList.add('todoStrikeThru');
        } else todoItem.classList.remove('todoStrikeThru');
    });
});

// UPDATE LOCALSTORAGE BEFORE NAVIGATION

const settingsNavBtn = document.querySelector('.settingsNavBtn');
// Update the local storage before page navigation
settingsNavBtn.addEventListener('click', function () {
    updateLocalStorage();
});

window.addEventListener('unload', function () {
    updateLocalStorage();
});

const generateCheckBoxes = function (el, goal, current) {
    const checkBoxArr = [];
    const max = goal > current ? goal : current;
    for (let i = 0; i < max; i++) {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        el.append(checkbox);
        if (i < current) {
            checkbox.checked = true;
        }
        checkBoxArr.push(checkbox);
    }
    return checkBoxArr;
};

// CHECKBOX DIVS

const pomCheckBoxDiv = document.querySelector('#pomCBs');
const breakCheckBoxDiv = document.querySelector('#breakCBs');
const bottleCheckBoxDiv = document.querySelector('#bottleCBs');
const commitCheckBoxDiv = document.querySelector('#commitCBs');

const updateUserDataFromCB = function (prop, event) {
    if (event.target.checked) {
        userData[prop] += 1;
    } else {
        userData[prop] -= 1;
    }
};

pomCheckBoxDiv.addEventListener('click', function (e) {
    updateUserDataFromCB('pomCounter', e);
});

breakCheckBoxDiv.addEventListener('click', function (e) {
    updateUserDataFromCB('breakCounter', e);
});

bottleCheckBoxDiv.addEventListener('click', function (e) {
    updateUserDataFromCB('finishedWater', e);
});

commitCheckBoxDiv.addEventListener('click', function (e) {
    updateUserDataFromCB('gitCounter', e);
});

let pomCheckBoxes;
let breakCheckBoxes;
let bottleCheckBoxes;
let commitCheckBoxes;

const setup = function () {
    notePadTextArea.value = userData.notePadText;
    currentTimeDiv.textContent = timerState.currentTime;

    if (timerState.timerActive === true) {
        startTimer();
    }

    pomCheckBoxes = generateCheckBoxes(
        pomCheckBoxDiv,
        settings.pomSettings.pomGoal,
        userData.pomCounter
    );
    breakCheckBoxes = generateCheckBoxes(
        breakCheckBoxDiv,
        settings.pomSettings.breakGoal,
        userData.breakCounter
    );

    bottleCheckBoxes = generateCheckBoxes(
        bottleCheckBoxDiv,
        settings.waterSettings.bottleGoal,
        userData.finishedWater
    );

    commitCheckBoxes = generateCheckBoxes(
        commitCheckBoxDiv,
        settings.commitSettings.commitGoal,
        userData.gitCounter
    );
};

setup();
