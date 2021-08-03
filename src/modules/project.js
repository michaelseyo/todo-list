import storage from './storage.js';
import { displayTask, removeAllDisplayedChild } from './task.js';

const projectsList = document.querySelector('.projects-list');

const addToProjects = function(category) {
    const foundCategory = projectsList.querySelector(`#${category}`);
    // check if there exist a ul of this category 
    if (foundCategory === null) {
        const newCategory = document.createElement('li');
        newCategory.classList.add('li-container');
        newCategory.id = category;
        newCategory.textContent = category;

        newCategory.addEventListener('click', displayCategory.bind(null, category));
        projectsList.appendChild(newCategory);
    } 
};

const removeProject = function(category) {
    // if there are no tasks of this category
    const currentData = storage.getData();
    const foundTask = currentData.find(task => task.category === category);
    console.log(foundTask);
    if (foundTask === undefined) {
        const foundCategory = projectsList.querySelector(`#${category}`);
        projectsList.removeChild(foundCategory);
    }
};

// onclick function, display the tasks that belong to that category
const displayCategory = function(category) {
    removeAllDisplayedChild();
    const data = storage.getData();
    const filteredTasks = data.filter(task => task.category === category);
    filteredTasks.forEach(task => displayTask(task));
};

export { addToProjects, displayCategory, removeProject }