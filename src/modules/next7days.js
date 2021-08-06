import { inAWeek } from './date.js';
import { handleTask } from './task.js';
import { removeAllDisplayedChild } from './task.js';
import storage from './storage.js';

const filterTasks = function() {
    const data = storage.getData();
    return data.filter(task => inAWeek(new Date(task.due)));
};

const displayNext7Days = function() {
    const filtered = filterTasks();
    removeAllDisplayedChild();

    const header = document.querySelector('h1');
    header.textContent = 'Next 7 days';
    filtered.forEach(task => handleTask(task));
};

const initNext7DaysTab = function() {
    const tab = document.querySelector('#next-7days');
    tab.addEventListener('click', displayNext7Days);
};

export default initNext7DaysTab;