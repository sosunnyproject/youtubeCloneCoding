import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";

// trending
export const trending = async (req, res) => {
    // look for video - need async await

    try {
        const videos = await Video.find({}); // find all videos
        console.log(videos);
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
}

export const search = async (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    // const {query: {term}} works too. ~~: searchingBy just to rename the var
    let videos = [];
    try {
        videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } }); //i = case-insensitive 
    } catch (error) {
        console.log(error);
    }

    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    const { user } = req.session;
    const {
        body: { title, description, hashtags },
        file
    } = req;

    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: file.path,
            owner: user._id,
            hashtags: Video.formatHashtags(hashtags)
        });
        const owner = await User.findById(user._id);
        owner.videos.push(newVideo._id);
        owner.save();
        return res.redirect("/");
    } catch(error) {
        console.log(error);
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: "Video cannot be uploaded"
        });
    }
}

export const watch = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id).populate("owner");
        console.log(video)
        return res.render("watch", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        return res.render("404", { pageTitle: "Video not found." });
    }
}
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
        console.log(error);
        res.status(404).render("404", {pageTitle: "Video not found"} );
    }
}

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description, hashtags }  // same parameter names as Video.js Model's properties
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description, hashtags });
        return res.redirect(`/videos/${id}`);
    } catch (error) {
        console.log(error);
        return res.status(404).render("404", {pageTitle: "Video not found"} );
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id })
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
}

// Register Video View

export const postRegisterView = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        video.status(200);
    } catch (error) {
        res.status(400) // bad request
    } finally {
        res.end();
    }

}