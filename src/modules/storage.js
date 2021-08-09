const storage = (function() {
    let data = [];

    const getData = function() {
        return data;
    };

    const storeLatestID = function(id) {
        localStorage.setItem("id", id);
    }

    const getLatestID = function() {
        if (localStorage.getItem("id") === null || localStorage.getItem("id") === []) {
            return 0;
        }
        return parseInt(localStorage.getItem("id"));
    }

    const update = function() {
        localStorage.setItem("data", JSON.stringify(data));
    }

    const add = function(task) {
        data.push(task);
        storage.update();
    };
    
    const remove = function(task) {
        const index = data.findIndex(currentTask => currentTask.id === task.id);
        data.splice(index, 1);
        storage.update();
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
        storeLatestID,
        getLatestID,
        add,
        update,
        remove,
        loadDefault,
    }
})();

export default storage;