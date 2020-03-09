import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = (req, res) => {
    // console.log(req.body);   // able to get body via app.js/bodyparser
    const {
        body: {name, email, password, password2}
    } = req;
    if(password !== password2) {
        res.status(400)     // status code HTTP
        res.render("join", {pageTitle: "Join"})
    } else {
        // To Do: Register User
        // To Do: Log User In
        res.redirect(routes.home)
    }
}

export const getLogin = (req, res) => res.render("login", { pageTitle: "login"});

export const postLogin = (req, res) => {
    res.redirect(routes.home)
}

export const logout = (req, res) => {
    // res.render("logout", { pageTitle: "logout"});
    res.redirect(routes.home);
}

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "edit profile"});

export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "change password"});

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "user detail"});
