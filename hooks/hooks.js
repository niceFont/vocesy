import { useState } from "react"
import { Alert } from "react-bootstrap"

export function useError(errorMessage) {

	const [error, setError] = useState(errorMessage)
    
	let alert

	if (error) {
		alert = <Alert variant="danger">{error}</Alert>
	}

	return [alert, setError]

}
