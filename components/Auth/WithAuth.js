import React from "react"


export const WithAuth = (Component) => {

	return class extends React.Component {

		constructor(props) {
			super(props)
		}
        
		render() {
            
			if(typeof this.props.user === "undefined") {
				window.location.replace("http://localhost:3000/login")
				return null
			}
			return (
				<Component {...this.props}></Component>
			)
		}
	}
}