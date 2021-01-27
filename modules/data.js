const settings = {
    waterSettings: {
        bottleSize: 0,
        waterGoal: 0,
    },
    pomSettings: {
        pomDuration: 0,
        breakDuration: 0,
        pomGoal: 0,
    },
    commitSettings: {
        commitFrequency: 0,
        commitGoal: 0,
    },
    updatefromLocalStorage() {
        const data = JSON.parse(localStorage.settings);
        for (let [key, value] of Object.entries(data)) {
            this[`${key}`] = value;
        }
    },
};

const timerState = {
    currentTime: 0,
    timerActive: false,
    timerType: 'pomodoro',
    updatefromLocalStorage() {
        const data = JSON.parse(localStorage.timerState);
        for (let [key, value] of Object.entries(data)) {
            this[`${key}`] = value;
        }
    },
};

const userData = {
    finishedWater: 0,
    pomCounter: 0,
    breakCounter: 0,
    gitCounter: 0,
    notePadText: '',
    toDoList: [],
    updatefromLocalStorage() {
        const data = JSON.parse(localStorage.userData);
        for (let [key, value] of Object.entries(data)) {
            this[`${key}`] = value;
        }
    },
};

const updateLocalStorage = function () {
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('timerState', JSON.stringify(timerState));
};

const setupData = function () {
    if (
        !localStorage.settings ||
        !localStorage.userData ||
        !localStorage.timerState
    ) {
        updateLocalStorage();
    } else {
        settings.updatefromLocalStorage();
        userData.updatefromLocalStorage();
        timerState.updatefromLocalStorage();
    }
};

setupData();

export { settings, userData, timerState, updateLocalStorage };
