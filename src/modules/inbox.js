import { handleTask, removeAllDisplayedChild } from './task.js';
import storage from './storage.js';

const displayInbox = function() {
    removeAllDisplayedChild();
    const data = storage.getData();
    data.forEach(task => handleTask(task)); // loads all project categories, and also all tasks
};

const initInboxTab = function() {
    const tab = document.querySelector('#inbox');
    tab.addEventListener('click', displayInbox);
};

export default initInboxTab;