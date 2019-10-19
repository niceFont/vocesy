import React from "react"
import App from "next/app"
import "bootstrap/dist/css/bootstrap.min.css"
import { Layout } from "../components/Helpers/Layout"
import nextCookies from "next-cookies"

class MyApp extends App {
	// Only uncomment this method if you have blocking data requirements for
	// every single page in your application. This disables the ability to
	// perform automatic static optimization, causing every page in your app to
	// be server-side rendered.
	//
	static async getInitialProps({ ctx, Component }) {
		let pageProps = {
		}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		if (ctx) {
			let {user} = nextCookies(ctx)
			if (user) {
				pageProps.user = JSON.parse(user)
			}
		}

		return {
			pageProps 
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			user: props.pageProps.user
		}
	}

	render() {
		const { Component, pageProps } = this.props
		const props = {
			...pageProps,
			user: this.state.user
		}
		return (
			<Layout user={this.state.user}>
				<Component {...props} />
			</Layout>
		)
	}
}

export default MyApp
