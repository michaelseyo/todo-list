import { createTask, displayTask, handleTask } from "./task.js";
import { addToProjects } from './project.js';
import storage from "./storage.js";

const taskForm = document.querySelector(".task-form");
const content = document.querySelector(".content");
const sideNav = document.querySelector(".side-nav");
const topNav = document.querySelector(".top-nav");

const initForm = function() {
    initFormPopUp();
    initCloseBtn();
    initSubmitBtn();
}

const initFormPopUp = function() {
    const addBtn = document.querySelector("#add-task");
    addBtn.addEventListener("click", function() {
        taskForm.style.display = "block";
        content.classList.add("blur");
        sideNav.classList.add("blur");
        topNav.classList.add("blur");
    });
};

const initCloseBtn = function() {
    const closeBtn = document.querySelector("#close-form");
    closeBtn.addEventListener("click", closeForm);
}

const closeForm = function() {
    taskForm.style.display = "None";
    content.classList.remove("blur");
    sideNav.classList.remove("blur");
    topNav.classList.remove("blur");
}

const initSubmitBtn = function() {
    const submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", function() {
        const title = document.querySelector("#title").value;
        const category = document.querySelector("#category").value;
        const description = document.querySelector("#description").value;
        const due = document.querySelector("#due").value;
        
        // create the new task object, add it into localStorage
        const task = createTask(title, category, description, due, false);
        console.log(task);
        handleTask(task);
        storage.add(task);
        closeForm();
    });
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
    })
}

export default initForm

// try and figure out how the date thing works (to implement within our task form);
// delay effect for our check-off? where the li element slowly fades
// display a due-date for our tasks 
// find a way to organize your modules 
// indicate a number to show the num of tasks 
