/* eslint-disable */

const express = require("express")
const next = require("next")

const session = require("express-session")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")

const BASE_URL = "http://localhost:3000"
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare().then(() => {
	const server = express()
	const sess = {
		secret: process.env.SECRET,
		cookie: {
			maxAge: 86400 * 1000
		},
		resave: false,
		saveUninitialized: true
	}
	
	if (process.env.NODE_ENV === "production") {
		sess.cookie.secure = true
	}
	server.use(session(sess))
	
	const strategy = new Auth0Strategy(
		{
			clientID: process.env.AUTH0_CLIENT_ID,
			domain: process.env.AUTH0_DOMAIN,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			callbackURL:
			process.env.CALLBACK_URL || "http://localhost:3000/callback"
		},
		function(accessToken, refreshToken, extraParams, profile, done) {
			return done(null, profile, accessToken)
		}
		)
		
		passport.use(strategy)
		passport.serializeUser(function(user, done) {
			done(null, user)
		})
		
		passport.deserializeUser(function(user, done) {
			done(null, user)
		})
		
		server.use(passport.initialize())
		server.use(passport.session())
		
		function isAuth(req, res, next) {
			if (req.isAuthenticated()) return next()
			res.redirect("/login")
		}
		
		function apiAuth(req, res, next) {
			if (req.isAuthenticated()) return next()
			res.send(401)
		} 

	


	server.get("/", (req, res) => {
		console.log(req.session)
		return app.render(req, res, "/", req.query)
	})
	server.get("/callback", (req, res, next) => {
		passport.authenticate("auth0", (err, user) => {
			if (err) return next(err)
			if (!user) return res.redirect("/login")
			req.logIn(user, err => {
				if (err) return next(err)
				res.redirect("/")
			})
		})(req, res, next)
	})
	server.get(
		"/login",
		passport.authenticate("auth0", { scope: "openid email profile" }),
		(req, res) => {
			console.log("SERVEERRRR")
			res.redirect("/")
		}
	)
	server.get("/logout", (req, res) => {
		req.logout()
		const { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = process.env
		res.redirect(
			`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
		)
	})
	server.use("/decks", isAuth)
	server.use("/decks/:slug", isAuth)
	server.use("/new", isAuth)
	server.use("/play/:slug", isAuth)
	server.use("/api", apiAuth)
	server.get("*", (req, res) => {
		return handle(req, res)
	})
	server.post("*", (req, res) => {
		return handle(req, res)
	})
	server.delete("*", (req, res) => {
		return handle(req, res)
	})
	server.listen(port, err => {
		if (err) throw err
	})
})
