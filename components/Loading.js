import { Spinner } from "react-bootstrap"
import {useState, useEffect} from "react"

export const Loading = (props) => {

	const loading = process.browser	

	useEffect(() => {
		console.log(loading)
	}, [loading])
	return (
		<div>
			
			{!loading ? <div>{props.children}</div> :
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span></Spinner>
			}
		</div>

	)
}
