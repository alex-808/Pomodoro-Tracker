import { settings, timerState, updateLocalStorage, userData } from './data';

// todo Add an archive object and a method to push user data there

const formatDate = function (date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
};

const checkDayChange = function () {
    const currentDate = formatDate(new Date());
    console.log('Current date:', currentDate);
    console.log('Stored date:', localStorage.storedDate);

    if (currentDate !== localStorage.storedDate) {
        console.log(
            'currentDate and storedDate were different, timerState and userData reset'
        );
        archiveDay();
        localStorage.storedDate = currentDate;
        resetStateAndTrackers();
        return;
    }
    console.log('currentDate and storedDate are the same. No reset');
};

const archiveDay = function () {
    // const entry = [settings, userData, timerState, localStorage.storedDate];
    // ! Currently archiving is bugged
    const entry = {
        settings: settings,
        userData: userData,
        timerState: timerState,
        storedDate: localStorage.storedDate,
    };
    if (!localStorage.archive) {
        localStorage.setItem('archive', entry);
        return;
    }
    console.log(localStorage.archive);
    const archive = JSON.parse(localStorage.archive);
    archive.push(entry);
    localStorage.setItem('archive', entry);
    console.log(archive);
};

archiveDay();

const startDayCheckTimer = function () {
    setInterval(function () {
        checkDayChange();
    }, 60000);
};

const resetStateAndTrackers = function () {
    timerState.reset();
    userData.reset();
    updateLocalStorage();
};

export { startDayCheckTimer, checkDayChange };
