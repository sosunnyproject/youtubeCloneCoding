export const join = (req, res) => res.render("join", { pageTitle: "Join"});
export const login = (req, res) => res.render("login", { pageTitle: "login"});
export const logout = (req, res) => res.render("logout", { pageTitle: "logout"});

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "user detail"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "edit profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "change password"});