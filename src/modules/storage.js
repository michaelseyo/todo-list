const storage = (function() {
    let data = [];

    const getData = function() {
        return data;
    };

    const taskIsStored = function(currentTask) {
        return data.findIndex(task => task.id === currentTask.id);
    }

    const add = function(task) {
        data.push(task);
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data);
        console.log("In localStorage:", localStorage.getItem("data"));
    };
    
    const remove = function(task) {
        const index = data.findIndex(currentTask => currentTask.id === task.id);
        console.log('index found: ', index);
        console.log('updated data: ', data);
        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
    };
    
    const loadDefault = function() {
        // retrieve
        data = JSON.parse(localStorage.getItem("data"));
        // default tab
        const inboxTab = document.querySelector('#inbox');
        inboxTab.click();
    };

    return {
        getData,
        taskIsStored,
        add,
        remove,
        loadDefault,
    }
})();

export default storage;