import { Row, Col,Form, ButtonGroup, Button } from "react-bootstrap"
import {useState} from "react"
import fetch from "isomorphic-fetch"

export const CreateDeck = (props) => {

	console.log(props)
	const [privacy, setPrivacy] = useState(0)
	const [title, setTitle] = useState(null)

	const _handleSubmit = async () => {

		if (title) {
			console.log("wad")
			let res = await fetch("/api/decks/create", {
				method: "POST",
				body: JSON.stringify({title, privacy, user: props.user.displayName})
			})

			console.log(res)
			if (res.status === 200) {
				window.location.replace("http://localhost:3000/decks")
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