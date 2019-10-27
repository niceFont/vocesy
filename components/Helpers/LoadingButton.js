import {Button, Spinner} from "react-bootstrap"
import React from "react"


export default function LoadingButton({sending,...props}) {
	return (
		<Button {...props}>
			{sending ? <Spinner animation="border"></Spinner> : 
				<React.Fragment>
					{props.children}
				</React.Fragment>
			}
		</Button>
	)
}
