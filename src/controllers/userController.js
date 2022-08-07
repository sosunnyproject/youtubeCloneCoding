import routes from "../routes";
import bcrypt from "bcrypt";
import User from "../models/User";
import fetch from "cross-fetch";

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
		const { email, password } = req.body;
		const user = await User.findOne({ email, githubOnly: false });
		if(!user) {
			return res
				.status(400)
				.render("login", {
					pageTitle: "Login", 
					errorMessage: "This email does not exist"
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

		req.session.loggedIn = true;
		req.session.user = user;
		res.redirect("/")
}

export const logout = (req, res) => {
	req.session.destroy();
    return res.redirect("/");
}

export const startGithubLogin = (req, res) => {
	const baseUrl  = `https://github.com/login/oauth/authorize`;
	const config = {
		client_id: process.env.GITHUB_CLIENT_ID,
		allow_signup: false,
		scope: "read:user user:email"
	};
	const params = new URLSearchParams(config).toString();
	const finalUrl  = `${baseUrl}?${params}`;
	return res.redirect(finalUrl)
}

export const finishGithubLogin = async (req, res) => {
	const baseUrl = "https://github.com/login/oauth/access_token";
	const config = {
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_SECRET,
		code: req.query.code
	};
	const params = new URLSearchParams(config).toString();

	const finalUrl = `${baseUrl}?${params}`;
	const data = await fetch(finalUrl, {
		method: "POST",
		headers: {
			Accept: "application/json",
		}
	});
	const json = await data.json();
	if("access_token" in json) {
		// access api
		const { access_token } = json;
		const apiUrl = "https://api.github.com"
		const userData = await fetch(`${apiUrl}/user`, {
			headers: {
				Authorization: `token ${access_token}`,
			}
		});
		const userDataJson = await userData.json();
		const emailData = await fetch(`${apiUrl}/user/emails`, {
			headers: {
				Authorization: `token ${access_token}`,
			}
		});
		const emailsArr = await emailData.json();
		/**
		 * [
				{
					email: 'parksosun1103@gmail.com',
					primary: true,
					verified: true,
					visibility: 'public'
				},
				{
					email: '17012862+sosunnyproject@users.noreply.github.com',
					primary: false,
					verified: true,
					visibility: null
				}
			]
		 */
		const emailObj = emailsArr.find( (email) => {
			return email.primary === true && email.verified == true;
		})
		if(!emailObj) {
			return res.redirect("/login");
		}

		const existingUser = await User.findOne({ email: emailObj.email });
		if(existingUser) {
			req.session.loggedIn = true;
			req.session.user = existingUser;
			return res.redirect("/");
		} else {
			// create Account
			const user = await User.create({
				name: userDataJson.name, 
				avatarUrl: userDataJson.avatar_url,
				username: userDataJson.login, 
				email: emailObj.email, 
				password: "", 
				location: userDataJson.location,
				githubOnly: true
			});
			req.session.loggedIn = true;
			req.session.user = user;
			return res.redirect("/");
	
		}

	} else {
		return res.redirect("/login");
	}
};

export const getEdit = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});

export const postEdit = async (req, res) => {
	const { 
		session: {
			user: { _id }
		},
		body: { name, email, username, location },
		file
	} = req;

	console.log(file);
	const currData = req.session.user;

	if(currData.email !== email) {
		const userExists = await User.exists({ $or: [ {email} ] });
		if(userExists) {
			return res.status(400).render("editProfile", {
				pageTitle: "Edit Profile", errorMessage: "This email is already taken"
			});
		} else {
			
			await User.findByIdAndUpdate(_id, {
				name, email, username, location
			});
		}
	}

	if(currData.username !== username) {
		const userExists = await User.exists({ $or: [ {username} ] });
		if(userExists) {
			return res.status(400).render("editProfile", {
				pageTitle: "Edit Profile", errorMessage: "This username is already taken"
			});
		} else {
			
			await User.findByIdAndUpdate(_id, {
				name, email, username, location
			});
		}
	}

	// update browser session
	req.session.user = {
		...req.session.user,
		name, email, username, location
	}
	return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
	// github or socialOnly users cannot access password change
	if(req.session.user.githubOnly === true) res.redirect("/");

	return res.render("changePassword", { pageTitle: "Change Password"});
}

export const postChangePassword = async (req, res) => {
	// send notification
	const {
		session: {
			user: { _id, password },
		},
		body: {
			oldPassword, newPassword, newPassword1
		}
	} = req;

	// compare old password
	const user = await User.findById(_id);
	const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
	if(!isCorrectPassword) {
		return res.status(400).render("changePassword", {
			pageTitle: "Change Password", errorMessage: "The current password is incorrect"
		});
	};

	// compare confirmation
	if(newPassword !== newPassword1) {
		return res.status(400).render("changePassword", {
			pageTitle: "Change Password", errorMessage: "The passwor does not match confirmation"
		});
	};

	// trigger userSchema save
	user.password = newPassword;
	await user.save();

	return res.redirect("/");
}

// export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "user detail"});

export const see = (req, res) => res.send("See User");