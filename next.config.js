/* eslint-disable */ 
const withCss = require("@zeit/next-css")
const webpack = require("webpack")
const {parsed: localenv} = require("dotenv").config()

module.exports = withCss({
//	webpack(config) {
//		config.plugins.push(new webpack.EnvironmentPlugin(localenv))
//		return config
//	},
	env: {
		MYSQL_HOST_PRODUCTION: process.env.MYSQL_HOST_PRODUCTION,
		MYSQL_DATABASE_PRODUCTION: process.env.MYSQL_DATABASE_PRODUCTION,
		MYSQL_USER_PRODUCTION: process.env.MYSQL_USER_PRODUCTION,
		MYSQL_PASSWORD_PRODUCTION: process.env.MYSQL_PASSWORD_PRODUCTION,
		SECRET: process.env.SECRET
	}
})