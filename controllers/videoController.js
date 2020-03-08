import {videos} from "../db"
import routes from "../routes";

export const home = (req, res) => res.render("home", {pageTitle: "Home", videos});

export const search = (req, res) => {
    // console.log(req.query.term);
    const {query : {term: searchingBy}} = req;  // const {query: {term}} works too. ~~: searchingBy just to rename the var
    res.render("search", {pageTitle: "Search", searchingBy });
}

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = (req, res) => {
    const {
        body: {file, title, description} 
    } = req;
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(324393))
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video Detail"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});

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