import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    // look for video - need async await
    try {
        const videos = await Video.find({}); // find all videos
        res.render("home", {pageTitle: "Home", videos});
    } catch (error) {
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
}

export const search = (req, res) => {
    // console.log(req.query.term);
    const {query : {term: searchingBy}} = req;  // const {query: {term}} works too. ~~: searchingBy just to rename the var
    res.render("search", {pageTitle: "Search", searchingBy });
}

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async (req, res) => {
    const {
        body: {title, description}, 
        file: { path }
    } = req;
    // To Do: Upload and save video
    // console.log(body, file);
    // res.render("upload", {pageTitle: "Upload"})
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async(req, res) => {
    const {
        params: {id}
    } = req;
    try  {
    const video = await Video.findById(id);
    res.render("videoDetail", {pageTitle: video.title , video});
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }    
} 
export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`});
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
    
}

export const postEditVideo = (req, res) => {
    const {
        params: {id},
        body: {title, description}  // same parameter names as Video.js Model's properties
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id}, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: {id},
    } = req;
    try {
        await Video.findOneAndRemove({_id: id})
    } catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);    
} 

// Register Video View

export const postRegisterView = async(req, res) => {
    const {
        params: {id}
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