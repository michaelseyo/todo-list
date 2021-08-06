import { isToday } from 'date-fns';
import { handleTask } from './task.js';
import { removeAllDisplayedChild } from './task.js';
import storage from './storage.js';

const filterTasks = function() {
    const data = storage.getData();
    return data.filter(task => isToday(new Date(task.due)));
};

const displayToday = function() {
    const filtered = filterTasks();
    removeAllDisplayedChild();

    const header = document.querySelector('h1');
    header.textContent = 'Today';
    filtered.forEach(task => handleTask(task));
};

const initTodayTab = function() {
    const tab = document.querySelector('#today');
    tab.addEventListener('click', displayToday);
};

export default initTodayTab;