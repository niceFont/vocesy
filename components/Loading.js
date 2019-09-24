import {Spinner} from "react-bootstrap"



export const Loading = (props) => {


	return (

		<div>
			{!props.fetched && 
<Spinner size="lg" animation="border" role="status"><span className="sr-only">Loading...</span>
</Spinner>
			}
		</div>
	)
}