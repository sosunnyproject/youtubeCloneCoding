const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const addBtn = form.querySelector("button");
const videoContainer = document.getElementById("videoContainer")

const handleSubmit = (event) => {
    event.preventDefault();
    const text = textarea.value;
    console.log(videoContainer.dataset);
}

addBtn.addEventListener("click", handleSubmit);