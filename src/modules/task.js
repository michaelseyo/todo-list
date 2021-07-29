import { addToProjects, removeProject } from './project.js';
import storage from './storage.js'

let id = 0;

const taskList = document.querySelector('.task-list');

function createTask(title, category, description, due, done) { // have a unique id to identify/delete
    id++;
    return {
        title,
        category,
        description,
        due,
        done,
        id,
    }
};

const displayTask = function(task) {
    const taskContainer = document.createElement("li");
    taskContainer.id = task.category;

    const taskIcon = new Image();
    taskIcon.classList.add('task-icon');
    taskIcon.src = './images/notDone.png';
    taskIcon.id = 'notDone';
    taskIcon.addEventListener("click", createDoneBtn.bind(null, task, taskIcon, taskContainer));

    const expandIcon = new Image();
    expandIcon.classList.add('expand-icon');
    expandIcon.src = './images/expand-icon.png';
    expandIcon.id = 'expand-icon';
    expandIcon.addEventListener('click', function() {
        // displays details of the task
    })
    
    const para = document.createElement('p');
    para.textContent = task.title;
    para.id = 'task-title';
    /*
    para.addEventListener('mouseover', function() {
        expandIcon.style.display = 'block';
    });
    */

    taskContainer.appendChild(taskIcon);
    taskContainer.appendChild(para);
    taskContainer.appendChild(expandIcon);
    taskList.appendChild(taskContainer);
}

const createDoneBtn = function(task, taskIcon, taskContainer) {
    taskIcon.src = './images/done.png';
    storage.remove(task);
    fadeAndRemove(task, taskContainer);
}

const fadeAndRemove = function(task, taskContainer) {
    taskContainer.classList.add('fade-out');
    taskContainer.addEventListener('transitionend', function() {
        taskList.removeChild(taskContainer);
        removeProject(task.category);
    });
}

const handleTask = function(task) {
    displayTask(task);
    addToProjects(task.category);
}

const removeAllDisplayedChild = function() {
    const currentTaskList = document.querySelector('.task-list');

    while (currentTaskList.lastElementChild) {
        currentTaskList.removeChild(currentTaskList.lastElementChild);
    }
}

export { createTask, displayTask, handleTask, removeAllDisplayedChild };

// let's make when we click the task, we can see more details