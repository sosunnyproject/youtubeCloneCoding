// GET request: if you don't change db
// POST request: if you change db

const registerView = () => {
    const videoId = window.location.href.split("/video")[1];
    fetch(`/api/${videoId}/view`, {
        method:"POST"
    })
}

function handleEnded(){
    registerView();         // api
    
}

function init() {
    // videoPlayer add Event Listener -> handleEnded;
}