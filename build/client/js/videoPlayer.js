"use strict";

// GET request: if you don't change db
// POST request: if you change db
var registerView = function registerView() {
  var videoId = window.location.href.split("/video")[1];
  fetch("/api/".concat(videoId, "/view"), {
    method: "POST"
  });
};

function handleEnded() {
  registerView(); // api
}

function init() {// videoPlayer add Event Listener -> handleEnded;
}