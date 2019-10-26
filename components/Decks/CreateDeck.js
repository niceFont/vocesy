import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap"
import { useState } from "react"
import fetch from "isomorphic-fetch"
import LoadingButton from "../../components/Helpers/LoadingButton"

export const CreateDeck = props => {
	const [privacy, setPrivacy] = useState(0)
	const [title, setTitle] = useState(null)
	const [sending, toggleSending] = useState(false)

	const _handleSubmit = async () => {
		if (title.length) {
			toggleSending(true)
			try {

				let response = await fetch("/api/decks/create", {
					method: "POST",
					headers: {
						"authorization": "Bearer " + props.token
					},
					body: JSON.stringify({
						title,
						privacy,
						user: props.user.displayName
					})
				})
	
				if (response.ok) {
					window.location.replace("/decks")
				} else {
					throw new Error(response.statusText)
				}
			} catch (err) {
				console.error(err)
			} finally {
				toggleSending(false)
			}
		}
	}

	return (
		<Row style={{
			margin: "20px 0 0 0",
			border: "1px solid lightgray",
			padding: "80px 0 80px 0",
		}} className="justify-content-md-center">
			<Col md="6" lg="6">
				<Form
					onSubmit={e => {
						e.preventDefault()
						_handleSubmit()
					}}>
					<Form.Group>
						<Form.Label>Title:</Form.Label>
						<Form.Control
							lg="2"
							type="text"
							onChange={e => setTitle(e.target.value)}
						/>
					</Form.Group>

					<Form.Group style={{
						margin: "10px 0 40px 0"
					}}>
						<ButtonGroup>
							<Button
								variant={!privacy ? "primary" : "secondary"}
								size="sm"
								onClick={() => setPrivacy(0)}>
								Public
							</Button>
							<Button
								variant={privacy ? "primary" : "secondary"}
								size="sm"
								onClick={() => setPrivacy(1)}>
								Private
							</Button>
						</ButtonGroup>
					</Form.Group>
					<Form.Group>
						<LoadingButton disabled={sending} sending={sending} variant="dark" type="submit" block>Submit</LoadingButton>
					</Form.Group>
				</Form>
			</Col>
		</Row>
	)
}
