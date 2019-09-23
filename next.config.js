/* eslint-disable */ 
const withCss = require("@zeit/next-css")
const webpack = require("webpack")
const {parsed: localenv} = require("dotenv").config()

module.exports = withCss({
	webpack(config) {
		config.plugins.push(new webpack.EnvironmentPlugin(localenv))
		return config
	}
})