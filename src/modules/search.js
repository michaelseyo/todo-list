import storage from './storage.js';
import { handleTask, removeAllDisplayedChild } from './task.js';

const initSearchBar = function() {
    const searchBar = document.querySelector('input#search-bar');
    searchBar.addEventListener('keyup', getFiltered);
};

const getFiltered = function() {
    const keysPressed = document.querySelector('#search-bar').value;
    const regex = new RegExp(keysPressed.toLowerCase());

    const data = storage.getData();
    const filteredData = data.filter(task => regex.test(task.title.toLowerCase()));
    removeAllDisplayedChild();
    filteredData.forEach(task => handleTask(task));
};

export default initSearchBar;