import { Container } from "react-bootstrap"
import React from "react"


function WhiteContainer(props, ref) {
	return (
		<Container ref={ref} {...props} style={{
			...props.style, backgroundColor: "white",
			boxShadow:
                "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
		}}>
			{props.children}
		</Container>
	)
}

export default React.forwardRef(WhiteContainer)
