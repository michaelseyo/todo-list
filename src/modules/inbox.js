import { handleTask } from './task.js';
import storage from './storage.js';

const displayInbox = function() {
    const data = storage.getData();
    data.forEach(task => handleTask(task)); // loads all project categories, and also all tasks
}

const initInboxTab = function() {
    const inboxTab = document.querySelector('#inbox');
    inboxTab.addEventListener('click', displayInbox);
}

export default initInboxTab;

// don't add tasks if they are already there; 1) check if the task alrdy exist, 2) check if we are in the inbox