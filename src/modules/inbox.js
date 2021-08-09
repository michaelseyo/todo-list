import { handleTask, removeAllDisplayedChild } from './task.js';
import storage from './storage.js';

const displayInbox = function() {
    removeAllDisplayedChild();
    const header = document.querySelector('h1');
    header.textContent = 'Inbox';

    const data = storage.getData();
    // loads all project categories, and also all tasks
    data.forEach(task => handleTask(task)); 
};

const initInboxTab = function() {
    const tab = document.querySelector('#inbox');
    tab.addEventListener('click', displayInbox);
};

export default initInboxTab;