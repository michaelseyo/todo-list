import { Task, handleTask } from "./task.js";
import storage from "./storage.js";
import edit from "./edit.js";

const taskForm = document.querySelector(".task-form");
const content = document.querySelector(".content");
const sideNav = document.querySelector(".side-nav");
const topNav = document.querySelector(".top-nav");

const initForm = function() {
    initFormPopUp();
    initCloseBtn();
    initSaveBtn();
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

const initSaveBtn = function() {
    const saveBtn = document.querySelector("#save");
    saveBtn.addEventListener("click", function(e) {
        const title = document.querySelector("input#title").value;
        const category = document.querySelector("input#category").value;
        const note = document.querySelector("input#note").value;
        const due = document.querySelector("input#due").value;
        
        if (edit.getState() === true) {
            edit.updateTask(title, category, note, due);
        } else {
            const newTask = new Task(title, category, note, due, false); 
            console.log(newTask);
            handleTask(newTask);
            storage.add(newTask);
        }
        closeForm();
    });
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
    })
};

const loadFormFromEdit = function(task, liContainer) {
    // toggles on 
    edit.toggleOn();
    const addBtn = document.querySelector('#add-task'); 

    // pre-fill previous details
    document.querySelector("input#title").value = task.title;
    document.querySelector("input#category").value = task.category;
    document.querySelector("input#note").value = task.note;
    document.querySelector("input#due").value = task.due;

    edit.storeEditingTask(task, liContainer);
    // open the form
    addBtn.click();
}

export { initForm, loadFormFromEdit }

// work on the edit logic, where we do not create a new task, but edit the pre-exising task