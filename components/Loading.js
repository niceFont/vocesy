import { Spinner } from "react-bootstrap"


export const Loading = (props) => {



	return (

		<div>

			{typeof window !== "undefined" ? <div>{props.children}</div>: <Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>}
		</div>

	)    
}