(function () {
    //Not sure if we rly need this module....
    function loadItem(key) {
        return localStorage.getItem(key);
    }

    function saveItem(key, value) {
        localStorage.setItem(key, value);
    }

    function removeItem(key){
        localStorage.removeItem(key);
    }

    return {
        loadItem: loadItem,
        saveItem: saveItem,
        removeItem: removeItem
    }
}());
