import routes from "./routes";
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;

    next();
}

export const protectorMiddleware = (req, res, next) => {
    // if not logged in, redirect to login page
    // if logged in, continue

    if(req.session.loggedIn) {
        return next();
    } else {
       return res.redirect("/login")
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/")
    }
}

export const avatarUploadMiddleware = multer({ 
    dest: "uploads/avatars/", 
    limits: {
        fileSize: 3000000,
    }
});
export const videoUploadMiddleware = multer({ 
    dest: "uploads/videos/", 
    limits: {
        fileSize: 10000000,
    },
});