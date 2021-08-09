import storage from './storage.js';
import { handleTask, removeAllDisplayedChild } from './task.js';

const initSearchBar = function() {
    const searchBar = document.querySelector('input#search-bar');
    searchBar.addEventListener('keyup', getFiltered);
};

const getFiltered = function() {
    const keysPressed = document.querySelector('#search-bar').value;
    changeHeader(keysPressed);
    const regex = new RegExp(keysPressed.toLowerCase());

    const data = storage.getData();
    const filteredData = data.filter(task => regex.test(task.title.toLowerCase()));
    removeAllDisplayedChild();
    filteredData.forEach(task => handleTask(task));
};

const changeHeader = function(keys) {
    const header = document.querySelector('h1');
    if (keys === '') {
        header.textContent = 'Inbox';
    } else {
        header.textContent = `Search results for: ${keys}`;
    }
}

export default initSearchBar;