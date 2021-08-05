import { addToProjects, removeProject } from './project.js';
import { formatDate } from './date.js';
import { loadFormFromEdit } from './form.js';
import storage from './storage.js'

let id = 0;

const taskList = document.querySelector('.task-list');

function createTask(title, category, note, due, done) { // have a unique id to identify/delete
    id++;
    return {
        title,
        category,
        note,
        due,
        done,
        id,
    }
}

const displayTask = function(task) {
    const taskContainer = document.createElement("li");
    const innerTaskContainer = document.createElement("div");
    innerTaskContainer.classList.add('inner-task-container');
    
    const infoContainer = document.createElement("div");
    infoContainer.classList.add('info-container')

    taskContainer.id = task.category;
    createTaskIcon(task, innerTaskContainer);
    createTaskTitle(task, innerTaskContainer);
    createExpandBtn(innerTaskContainer);
    createTaskNote(task, innerTaskContainer);

    createDueDate(task, infoContainer);
    createEditBtn(task, infoContainer);
  
    taskContainer.appendChild(innerTaskContainer);
    taskContainer.appendChild(infoContainer);
    taskList.appendChild(taskContainer);
};

const createTaskIcon = function(task, innerTaskContainer, taskContainer) {
    const taskIcon = new Image();
    taskIcon.classList.add('task-icon');
    taskIcon.src = './images/notDone.png';
    taskIcon.id = 'notDone';
    taskIcon.addEventListener("click", createDoneBtn.bind(null, task, taskIcon, taskContainer));
    innerTaskContainer.appendChild(taskIcon);
};

const createDoneBtn = function(task, taskIcon, taskContainer) {
    taskIcon.src = './images/done.png';
    storage.remove(task);
    fadeAndRemove(task, taskContainer);
};

const createTaskTitle = function(task, innerTaskContainer) {
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
    innerTaskContainer.appendChild(container);
};

const createExpandBtn = function(innerTaskContainer) {
    const expandBtn = document.createElement('input');
    expandBtn.type = 'image';
    expandBtn.src = './images/expand-icon.png';
    expandBtn.classList.add('expand-btn');
    expandBtn.id = 'expand';
    expandBtn.addEventListener('click', function() {
        expandBtn.classList.toggle('expand-btn--active');    
    });
    innerTaskContainer.appendChild(expandBtn);
};

const createTaskNote = function(task, innerTaskContainer) {
    const note = document.createElement('div');
    note.classList.add('expand-note');
    note.textContent = `${task.note}`;
    innerTaskContainer.appendChild(note);
};

const createDueDate = function(task, infoContainer) {
    const date = document.createElement('p');
    date.textContent = formatDate(task.due);
    infoContainer.appendChild(date);
};

const createEditBtn = function(task, infoContainer) {
    const editBtn = document.createElement('input');
    editBtn.type = 'image';
    editBtn.src = './images/edit-icon.png';
    editBtn.classList.add('edit-btn');
    editBtn.id = 'edit';
    editBtn.addEventListener('click', loadFormFromEdit.bind(null, task));
    infoContainer.appendChild(editBtn);
}

const fadeAndRemove = function(task, taskContainer) {
    taskContainer.classList.add('fade-out');
    taskContainer.addEventListener('transitionend', function() {
        taskList.removeChild(taskContainer);
        removeProject(task.category);
    });
};

const handleTask = function(task) {
    displayTask(task);
    addToProjects(task.category);
};

const removeAllDisplayedChild = function() {
    const currentTaskList = document.querySelector('.task-list');

    while (currentTaskList.lastElementChild) {
        currentTaskList.removeChild(currentTaskList.lastElementChild);
    }
};

export { createTask, displayTask, handleTask, removeAllDisplayedChild };


// want to create a feature where we can edit the tasks after created
// and then also make sure that is updated on the storage side 
// have an edit-icon at the details part
// opens up the task-form once again, so make task-form such that 
// if a task already exists, then we edit the details of it?
// we can make-use of the unique id to know if it exists already

// clean up the displaytask code