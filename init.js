// start the application by calling the app.js

import app from "./app";

const PORT = 4000;
const handleListening = () => {
    console.log(`Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);