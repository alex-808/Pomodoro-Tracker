'use strict';

// WATER TRACKER

const waterForm = document.querySelector('#waterForm');
const bottleSizeField = document.querySelector('#bottleSize');
const waterGoalField = document.querySelector('#waterGoal');
const waterSubmit = document.querySelector('#waterSubmit');
const waterReset = document.querySelector('#waterReset');
const checkBoxDiv = document.querySelector('#waterCheckBoxes');
const waterMsg = document.querySelector('#waterMsg');
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

// POM TIMERS

const pomTimerForm = document.querySelector('#pomTimerForm');
const pomDurationField = document.querySelector('#pomDuration');
const breakDurationField = document.querySelector('#breakDuration');
const pomTimeSubmitBtn = document.querySelector('#pomSubmit');
const pomTimeResetBtn = document.querySelector('#pomReset');

let pomDuration = 0;
let breakDuration = 0;

const currentTimeDiv = document.querySelector('#currentTime');
const timerToggleBtn = document.querySelector('#timerToggle');
const timerResetBtn = document.querySelector('#timerReset');
const selectPomBtn = document.querySelector('#selectPom');
const selectBreakBtn = document.querySelector('#selectBreak');

const pomCounterDiv = document.querySelector('#pomCounter');
const breakCounterDiv = document.querySelector('#breakCounter');
const addBreakBtn = document.querySelector('#addBreak');
const subBreakBtn = document.querySelector('#subBreak');
const addPomBtn = document.querySelector('#addPom');
const subPomBtn = document.querySelector('#subPom');
const resetPomBtn = document.querySelector('#resetPom');
const resetBreakBtn = document.querySelector('#resetBreak');

let currentTime = 0;
let timerActive = false;
let timer;
let timerType = 'pomodoro';
let breakCounter = 0;
let pomodoroCounter = 0;

const updatePomTrackers = function (timerType) {
    if (timerType === 'pomodoro') {
        pomodoroCounter++;
        pomCounterDiv.textContent = pomodoroCounter;
    } else {
        breakCounter++;
        breakCounterDiv.textContent = breakCounter;
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

pomTimeSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // should check for null values

    // pomDuration = pomDurationField.value;
    // breakDuration = breakDurationField.value;
    pomDuration = 50;
    breakDuration = 10;
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
    currentTime = pomDuration;
    currentTimeDiv.textContent = currentTime;
});

selectBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();

    timerType = 'break';
    currentTime = breakDuration;
    currentTimeDiv.textContent = currentTime;
});

// POM AND BREAK TRACKERS

addPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    pomodoroCounter++;
    pomCounterDiv.textContent = pomodoroCounter;
});

subPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (pomodoroCounter !== 0) pomodoroCounter--;
    pomCounterDiv.textContent = pomodoroCounter;
});

resetPomBtn.addEventListener('click', function (e) {
    e.preventDefault();
    pomodoroCounter = 0;
    pomCounterDiv.textContent = pomodoroCounter;
});

addBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    breakCounter++;
    breakCounterDiv.textContent = breakCounter;
});

subBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (breakCounter !== 0) breakCounter--;
    breakCounterDiv.textContent = breakCounter;
});

resetBreakBtn.addEventListener('click', function (e) {
    e.preventDefault();
    breakCounter = 0;
    breakCounterDiv.textContent = breakCounter;
});

// NOTEPAD

const notePadTextArea = document.querySelector('#notePad');
let notePadText;

notePadTextArea.addEventListener('keyup', function (e) {
    notePadText = notePadTextArea.value;
    console.log(notePadText);
});

// TODO LIST

// Add new todo

// On todo itself:
// Delete todo
// Edit todo
// Mark todo as completed

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

//

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

// COMMIT TRACKER
