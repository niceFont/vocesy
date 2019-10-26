import {Button, Spinner} from "react-bootstrap"

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
