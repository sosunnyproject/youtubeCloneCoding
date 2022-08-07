const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer")

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    
    if(text === "") return;

    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST", 
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, rating: "5" })
    });
    const status = response.status;

    textarea.value = "";
    window.location.reload();
}

if(form) {
    const addBtn = form.querySelector("button");
    addBtn.addEventListener("click", handleSubmit);
}