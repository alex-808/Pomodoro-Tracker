const settings = {
    waterSettings: {
        bottleSize: 25,
        waterGoal: 124,
    },
    pomSettings: {
        pomDuration: 50,
        breakDuration: 10,
        pomGoal: 7,
    },
    commitSettings: {
        commitFrequency: 30,
        commitGoal: 5,
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
