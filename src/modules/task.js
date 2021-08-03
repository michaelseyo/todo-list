import { addToProjects, removeProject } from './project.js';
import { formatDate } from './date.js';
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
    createTaskIcon(task, taskContainer);
    createTaskTitle(task, taskContainer);
    createDueDate(task, taskContainer);
    createExpandBtn(taskContainer);
    createTaskContent(task, taskContainer);
  
    taskList.appendChild(taskContainer);
}

const createTaskIcon = function(task, taskContainer) {
    const taskIcon = new Image();
    taskIcon.classList.add('task-icon');
    taskIcon.src = './images/notDone.png';
    taskIcon.id = 'notDone';
    taskIcon.addEventListener("click", createDoneBtn.bind(null, task, taskIcon, taskContainer));
    taskContainer.appendChild(taskIcon);
}

const createDoneBtn = function(task, taskIcon, taskContainer) {
    taskIcon.src = './images/done.png';
    storage.remove(task);
    fadeAndRemove(task, taskContainer);
}

const createTaskContent = function(task, taskContainer) {
    const content = document.createElement('div');
    content.classList.add('expand-content');
    content.textContent = `Details: ${task.description}`;
    taskContainer.appendChild(content);
}

const createExpandBtn = function(taskContainer) {
    const expandBtn = document.createElement('input');
    expandBtn.type = 'image';
    expandBtn.src = './images/expand-icon.png';
    expandBtn.classList.add('expand-btn');
    expandBtn.id = 'expand';
    expandBtn.addEventListener('click', function() {
        expandBtn.classList.toggle('expand-btn--active');    
    });
    taskContainer.appendChild(expandBtn);
}

const createTaskTitle = function(task, taskContainer) {
    const para = document.createElement('p');
    para.textContent = task.title;
    para.id = 'task-title';
    taskContainer.appendChild(para);
}

const createDueDate = function(task, taskContainer) {
    const date = document.createElement('p');
    date.textContent = formatDate(task.due);
    taskContainer.appendChild(date);
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