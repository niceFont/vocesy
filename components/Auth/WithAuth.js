import React from "react"

export const WithAuth = Component => {
	return class Auth extends React.Component {
		constructor(props) {
			super(props)
		}

		render() {
			if (typeof this.props.user === "undefined") {
				window.location.replace("/login")
				return null
			}
			return <Component {...this.props}></Component>
		}
	}
}
