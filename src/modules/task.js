import { addToProjects, removeProject } from './project.js';
import { formatDate } from './date.js';
import { loadFormFromEdit } from './form.js';
import storage from './storage.js'

let id = 0;

const taskList = document.querySelector('.task-list');

// have a unique id to identify/delete
function Task(title, category, note, due, done) { 
    this.title = title;
    this.category = category;
    this.note = note;
    this.due = due;
    this.done = done;
    this.id = id++;
}

const displayTask = function(task) {
    const liContainer = document.createElement("li");
    liContainer.id = task.category;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add('task-container');
    
    const rightContainer = document.createElement("div");
    rightContainer.classList.add('right-container')

    createTaskContainer(task, taskContainer, liContainer);
    createRightContainer(task, rightContainer, liContainer);

    liContainer.appendChild(taskContainer);
    liContainer.appendChild(rightContainer);
    taskList.appendChild(liContainer);
};

// Task container
const createTaskContainer = function(task, taskContainer, liContainer) {
    taskIcon(task, taskContainer, liContainer);
    taskTitle(task, taskContainer);
    
    if (task.note !== '') {
        createExpandBtn(taskContainer);
        taskNote(task, taskContainer);
    }
}

const taskIcon = function(task, taskContainer, liContainer) {
    const taskIcon = new Image();
    taskIcon.classList.add('task-icon');
    taskIcon.src = './images/notDone.png';
    taskIcon.id = 'notDone';
    taskIcon.addEventListener("click", createDoneBtn.bind(null, task, taskIcon, liContainer));
    taskContainer.appendChild(taskIcon);
};

const createDoneBtn = function(task, taskIcon, liContainer) {
    taskIcon.src = './images/done.png';
    storage.remove(task);
    fadeAndRemove(task, liContainer);
};

const taskTitle = function(task, taskContainer) {
    const container = document.createElement('div');
    container.classList.add('task');
    const title = document.createElement('p');
    const category = document.createElement('p');

    title.textContent = task.title;
    title.id = 'task-title';
    category.textContent = task.category;
    category.id = 'task-category';

    container.appendChild(title);
    container.appendChild(category);
    taskContainer.appendChild(container);
};

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
};

const taskNote = function(task, taskContainer) {
    const note = document.createElement('div');
    note.classList.add('expand-note');
    note.textContent = `${task.note}`;
    taskContainer.appendChild(note);
};

// Right container
const createRightContainer = function(task, rightContainer, liContainer) {
    createDueDate(task, rightContainer);
    createEditBtn(task, rightContainer, liContainer);
}

const createDueDate = function(task, rightContainer) {
    const date = document.createElement('p');
    date.id = 'task-due';
    date.textContent = formatDate(task.due);
    rightContainer.appendChild(date);
};

const createEditBtn = function(task, rightContainer, liContainer) {
    const editBtn = document.createElement('input');
    editBtn.type = 'image';
    editBtn.src = './images/edit-icon.png';
    editBtn.classList.add('edit-btn');
    editBtn.id = 'edit';
    editBtn.addEventListener('click', loadFormFromEdit.bind(null, task, liContainer));
    rightContainer.appendChild(editBtn);
}

// effects 
const fadeAndRemove = function(task, liContainer) {
    liContainer.classList.add('fade-out');
    liContainer.addEventListener('transitionend', function() {
        taskList.removeChild(liContainer);
        removeProject(task.category);
    });
};

// task handler 
const handleTask = function(task) {
    displayTask(task);
    addToProjects(task.category);
};

// DOM 
const removeAllDisplayedChild = function() {
    const currentTaskList = document.querySelector('.task-list');

    while (currentTaskList.lastElementChild) {
        currentTaskList.removeChild(currentTaskList.lastElementChild);
    }
};

export { Task, displayTask, handleTask, removeAllDisplayedChild };