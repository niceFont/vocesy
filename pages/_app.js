import React from "react"
import App from "next/app"
import "bootstrap/dist/css/bootstrap.min.css"
import { Layout } from "../components/Helpers/Layout"
import nextCookies from "next-cookies"
import fetch from "isomorphic-fetch"

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
				try {
					let response = await fetch("http://localhost:3000/api/authorize", {
						headers: {
							method: "POST",
							"authorization": "Bearer " + user
						}
					})
					if(!response.ok) throw response.statusText
					pageProps.user = await response.json()
				} catch (err) {
					console.error(err)
				}
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
