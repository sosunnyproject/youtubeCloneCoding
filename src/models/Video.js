import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        // required: "File URL is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    view: {
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
		}
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
})
// console.log(VideoSchema.fileUrl, VideoSchema.title);
const Video = mongoose.model("Video", VideoSchema);
export default Video;