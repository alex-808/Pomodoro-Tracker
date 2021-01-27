'use strict';

import {
    settings,
    timerState,
    userData,
    updateLocalStorage,
} from './modules/data.js';

let timer;

// TIMER BUTTON ELEMENTS
const timerToggleBtn = document.querySelector('#timerToggle');
const timerResetBtn = document.querySelector('#timerReset');
const selectPomBtn = document.querySelector('#selectPom');
const selectBreakBtn = document.querySelector('#selectBreak');

// TIMER DISPLAY DIVS
const breakCounterDiv = document.querySelector('#breakCounter');
const pomCounterDiv = document.querySelector('#pomCounter');
const currentTimeDiv = document.querySelector('#currentTime');

// TIMER CONTROL

const startTimer = function () {
    console.log('timer started');
    timerState.timerActive = true;
    timer = setInterval(function () {
        timerState.currentTime--;
        currentTimeDiv.textContent = timerState.currentTime;
        timerToggleBtn.textContent = 'Stop';

        console.log(timerState.timerActive);
        if (timerState.currentTime === 0) {
            stopTimer();
            updatePomTrackers(timerState.timerType);
        }
    }, 10);
};

const stopTimer = function () {
    console.log('timer stopped');
    timerToggleBtn.textContent = 'Start';
    clearInterval(timer);
    timerState.timerActive = false;
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

// POM TRACKER CONTROL

const updatePomTrackers = function (timerType) {
    if (timerState.timerType === 'pomodoro') {
        userData.pomCounter++;
        pomCounterDiv.textContent = userData.pomCounter;
    } else {
        userData.breakCounter++;
        breakCounterDiv.textContent = userData.breakCounter;
    }
};

// NOTEPAD

const notePadTextArea = document.querySelector('#notePad');

notePadTextArea.addEventListener('keyup', function (e) {
    userData.notePadText = notePadTextArea.value;
    updateLocalStorage();
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

const setup = function () {
    notePadTextArea.value = userData.notePadText;
    currentTimeDiv.textContent = timerState.currentTime;
    if (timerState.timerActive === true) {
        startTimer();
    }
    pomCounterDiv.textContent = userData.pomCounter;
    breakCounterDiv.textContent = userData.breakCounter;
};

setup();