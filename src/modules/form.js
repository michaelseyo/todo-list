import { createTask, displayTask, handleTask } from "./task.js";
import storage from "./storage.js";

const taskForm = document.querySelector(".task-form");
const content = document.querySelector(".content");
const sideNav = document.querySelector(".side-nav");
const topNav = document.querySelector(".top-nav");

const initForm = function() {
    initFormPopUp();
    initCloseBtn();
    initSubmitBtn();
};

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
};

const closeForm = function() {
    taskForm.style.display = "None";
    content.classList.remove("blur");
    sideNav.classList.remove("blur");
    topNav.classList.remove("blur");
};

const initSubmitBtn = function() {
    const submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", function() {
        const title = document.querySelector("input#title").value;
        const category = document.querySelector("input#category").value;
        const note = document.querySelector("input#note").value;
        const due = document.querySelector("input#due").value;
        
        // need a way to check that we came from the edit button, then don't create new task just edit
        const task = createTask(title, category, note, due, false); // we want them to have the same id e.g 3
        console.log(task);
        handleTask(task);
        storage.add(task);
        closeForm();
    });
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
    })
};

const loadFormFromEdit = function(task) {
    const addBtn = document.querySelector('#add-task');

    document.querySelector("input#title").value = task.title;
    document.querySelector("input#category").value = task.category;
    document.querySelector("input#note").value = task.note;
    document.querySelector("input#due").value = task.due;
    addBtn.click();
}

export { initForm, loadFormFromEdit }

// work on the edit logic, where we do not create a new task, but edit the pre-exising task