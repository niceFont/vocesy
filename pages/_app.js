import React from "react"
import App from "next/app"
import "bootstrap/dist/css/bootstrap.min.css"
import {Auth0Provider} from "../components/Auth0wrapper"
import config from "../auth_config.json"

const onRedirectCallback = appState => {
	window.history.replaceState({},
		document.title,
		appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
	)
}


class MyApp extends App {
	// Only uncomment this method if you have blocking data requirements for
	// every single page in your application. This disables the ability to
	// perform automatic static optimization, causing every page in your app to
	// be server-side rendered.
	//
	// static async getInitialProps(appContext) {
	//   // calls page's `getInitialProps` and fills `appProps.pageProps`
	//   const appProps = await App.getInitialProps(appContext);
	//
	//   return { ...appProps }
	// }

	render() {
		const { Component, pageProps } = this.props
		return (
			<Auth0Provider
				domain={config.domain}
				client_id={config.clientId}
				redirect_uri={typeof window !== "undefined" ? window.location.origin: null}
				onRedirectCallback={onRedirectCallback}
			>
				<Component {...pageProps} />
			</Auth0Provider>
		)
	}
}

export default MyApp
