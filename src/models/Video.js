import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

VideoSchema.static("formatHashtags", function (hashtags) {
    return hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`));
  });

const Video = mongoose.model("Video", VideoSchema);

export default Video;