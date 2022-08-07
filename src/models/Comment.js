import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({

    text: {
        type: String,
        required: "Text is required"
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;