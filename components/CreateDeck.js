import { Row, Col,Form, ButtonGroup, Button } from "react-bootstrap"
import {useAuth0} from "./Auth0wrapper"
import {useState} from "react"

export const CreateDeck = () => {

	const [privacy, setPrivacy] = useState(0)
	const [title, setTitle] = useState(null)
	const {user} = useAuth0()

	const _handleSubmit = async () => {

		if (title) {
			let res = await fetch("/api/decks/create", {
				method: "POST",
				body: JSON.stringify({title, privacy, user})
			})

			if (res.status === 200) {
				////				window.location.replace("localhost:3000/decks")
			}
			return
		}
	}


	return (
		<Row className="justify-content-md-center">
			<Col lg="6">
			
				<Form onSubmit={(e) => {
					e.preventDefault()
					_handleSubmit()
				}}>
					<Form.Group>
						<Form.Label>Deck Title:</Form.Label>
						<Form.Control lg="2" type="text" onChange={(e) => setTitle(e.target.value)}/>
					</Form.Group>

					<Form.Group>
						<ButtonGroup>
							<Button variant={!privacy ? "primary": "secondary"}size="sm" onClick={() => setPrivacy(0)}>Public</Button>
							<Button variant={privacy ? "primary": "secondary"} size="sm" onClick={() => setPrivacy(1)}>Private</Button>
						</ButtonGroup>
					</Form.Group>
					<Form.Group>
						<Form.Control type="submit"/>
					</Form.Group>
				</Form>
			</Col>
		</Row>
	)
}