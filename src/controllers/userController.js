import routes from "../routes";
import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = async (req, res) => {
    // console.log(req.body);   // able to get body via app.js/bodyparser
    const {name, username, email, password, password2, location} = req.body;
		const pageTitle = "Join";
		if(password !== password2) {
			res.status(400); // client errors: bad request
			return res.render("join", {
				pageTitle, errorMessage: "Password confirmation does not match"
			});
	} 

		const userExists = await User.exists({ $or: [ {username}, {email} ] });
		// $or query https://www.mongodb.com/docs/manual/reference/operator/query/or/

		if(userExists) {
			// client errors: bad request
			return res.status(400).render("join", {
				pageTitle, errorMessage: "This username or email is already taken"
			});
		}

		await User.create({
			name, username, email, password, location
		});

		res.redirect(routes.login);
}

export const getLogin = (req, res) => {

	res.render("login", { pageTitle: "login"});
}
export const postLogin = async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if(!user) {
			return res
				.status(400)
				.render("login", {
					pageTitle: "Login", 
					errorMessage: "This username does not exist"
				});
		} 
		// check if password matches
		const isCorrectPassword = await bcrypt.compare(password, user.password);
		if(!isCorrectPassword) {
			return res
				.status(400)
				.render("login", {
					pageTitle: "Login",
					errorMessage: "Wrong password"
				})
		}

		console.log("login success")
		res.redirect("/")
}

export const logout = (req, res) => {
    // res.render("logout", { pageTitle: "logout"});
    res.redirect(routes.home);
}

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "edit profile"});

export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "change password"});

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "user detail"});

export const remove = (req, res) => res.send("Remove User");

export const see = (req, res) => res.send("See User");