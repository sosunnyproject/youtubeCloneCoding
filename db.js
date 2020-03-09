import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/wetube", 
  {
    useNewUrlParser: true,
    userFindAndModify: false
  }
);

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
const handleError = error => console.log(`error on db :${error}`)

db.once("open", handleOpen);
db.on("error", handleError);