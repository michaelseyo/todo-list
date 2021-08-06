import { formatDate } from './date.js';
import storage from './storage.js';

const edit = (function() {
    let isEditing = false;
    let editingTask = null;
    let liContainer = null;

    const getState = function() {
        return isEditing;
    }

    const getTask = function() {
        return editingTask;
    }

    const getContainer = function() {
        return liContainer;
    }

    const storeEditingTask = function(task, container) {
        editingTask = task;
        liContainer = container;
    }
    
    const toggleOn = function() {
        isEditing = true;
    }

    const toggleOff = function() {
        isEditing = false;
    }

    const updateTask = function(title, category, note, due) {
        // update stored content
        const task = edit.getTask();
        task.title = title;
        task.category = category;
        
        if (note === null) {
            task.note = '';
        } else {
            task.note = note;
        }

        task.due = due;

        // update the storage 
        storage.update();
        console.log(task);
        console.log(storage.getData());

        // update display
        const container = edit.getContainer();
        const titleDisplay = container.querySelector('#task-title');
        const categoryDisplay = container.querySelector('#task-category');
        const noteDisplay = container.querySelector('.expand-note');
        const dueDisplay = container.querySelector('#task-due');

        titleDisplay.textContent = title;
        categoryDisplay.textContent = category;
        
        if (noteDisplay !== null) {
            noteDisplay.textContent = note;
        }

        dueDisplay.textContent = formatDate(due);

        edit.resetStorage();
        // toggle off 
        edit.toggleOff();
    }

    const resetStorage = function() {
        editingTask = null;
        liContainer = null;
    }

    return { 
        getState, 
        getTask,
        getContainer,
        storeEditingTask,
        toggleOn,
        toggleOff,
        updateTask,
        resetStorage,
    }
})();

export default edit;

// when we refresh the page and create a new task, the id will start with 1, even tho 1 exists already