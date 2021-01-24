'use strict';

import { settings, userData, updateLocalStorage } from './modules/data.js';

let currentTime = 0;
let timerActive = false;
let timer;
let timerType = 'pomodoro';
const pomTimerForm = document.querySelector('#pomTimerForm');

const currentTimeDiv = document.querySelector('#currentTime');
const timerToggleBtn = document.querySelector('#timerToggle');
const timerResetBtn = document.querySelector('#timerReset');
const selectPomBtn = document.querySelector('#selectPom');
const selectBreakBtn = document.querySelector('#selectBreak');

const updatePomTrackers = function (timerType) {
    if (timerType === 'pomodoro') {
        userData.pomCounter++;
        pomCounterDiv.textContent = userData.pomCounter;
    } else {
        userData.breakCounter++;
        breakCounterDiv.textContent = userData.breakCounter;
    }
};

const startTimer = function () {
    console.log('timer started');
    timerActive = true;
    timer = setInterval(function () {
        currentTime--;
        currentTimeDiv.textContent = currentTime;
        timerToggleBtn.textContent = 'Stop';

        console.log(timerActive);
        if (currentTime === 0) {
            stopTimer();
            updatePomTrackers(timerType);
        }
    }, 10);
};

const stopTimer = function () {
    console.log('timer stopped');
    timerToggleBtn.textContent = 'Start';
    clearInterval(timer);
    timerActive = false;
};

timerResetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    currentTime = userData.pomDuration;
    currentTimeDiv.textContent = currentTime;
});

timerToggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(timerActive);
    // fix button text when time has run out
    if (currentTime !== 0) {
        if (timerActive) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    console.log(timerActive);
});

selectPomBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerType = 'pomodoro';
    currentTime = userData.pomDuration;
    currentTimeDiv.textContent = currentTime;
});

selectBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerType = 'break';
    currentTime = breakDuration;
    currentTimeDiv.textContent = currentTime;
});

// NOTEPAD

const notePadTextArea = document.querySelector('#notePad');
let notePadText;

notePadTextArea.addEventListener('keyup', function (e) {
    notePadText = notePadTextArea.value;
    console.log(notePadText);
});

// To Dos

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
