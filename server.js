/* eslint-disable */

const express = require("express")
const next = require("next")

const session = require("express-session")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const strategy = new Auth0Strategy({
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/"
}, function (accessToken, refreshToken, extraParams, profile, done) {
        
        return done(null, profile)
})

passport.use(strategy)

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
}

if (process.env.NODE_ENV === "production") {
    sess.cookie.secure = true
}


function Auth(req, res, next) {
    
}



app.prepare().then(() => {
    const server = express()
    
    server.use(session(sess))
    server.use(passport.initialize())
    server.use(passport.session())
	server.get("/", (req, res) => {
		console.log("test")
		return app.render(req, res, "/", req.query)
	})
    server.get("/decks", passport.authenticate("auth0", {scope: "openid email profile"}) , (req, res) => {
        return app.render(req, res, "/decks", req.query)
    })
	server.get("*", (req, res) => {
		return handle(req, res)
	})

	server.listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})