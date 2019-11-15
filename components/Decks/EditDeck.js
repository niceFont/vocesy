import {useState, useEffect} from "react"
import React from "react"
import { Container, Form, Button, ButtonGroup, Row, Col} from "react-bootstrap"
import {Loading} from "../../components/Helpers/Loading"
import fetch from "isomorphic-fetch"
import LoadingButton from "../../components/Helpers/LoadingButton"

export const EditDeck = (props) => {

	const [data, setData] = useState([])
	const [fetched, toggleFetched] = useState(false)
	const [title, setTitle] = useState("")
	const [privacy, setPrivacy] = useState(0)
	const [sending, toggleSending] = useState(false)
	
	useEffect(() => {
		async function fetchDeck() {
			try {
				let response = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				if (!response.ok) throw new Error(response.statusText)
				let deck = await response.json()			
	
				setData(deck)
				toggleFetched(true)
				if (deck.length) {
					setTitle(deck[0].title)
					setPrivacy(deck[0].privacy)
				} 
			} catch (err) {
				console.error(err)
			}
		}
		fetchDeck()
	},[props.slug, props.user.displayName])

	async function _handleSubmit() {
		toggleSending(true)
		if (title.trim() === data[0].title && privacy === data[0].privacy) {
			window.location.replace("/decks")
			return
		}
		if (title.trim() === "") setTitle(data[0].title)
		
		try {
			let response = await fetch("/api/decks/edit", {
				headers: {
					"authorization": "Bearer " + props.token
				},
				method: "POST",
				body: JSON.stringify({
					title, privacy, deckId: data[0].deck_id
				})
			})

			if(!response.ok) throw new Error(response.statusText)

			window.location.replace("/decks")

		} catch (err) {
			console.error(err)
		} finally {
			toggleSending(false)
		}

	}

	return (

		<Container>

			<Row style={{
				margin: "20px 0 0 0",
			}} className="justify-content-center">
				{!fetched ? <Loading fetched={fetched}></Loading>
					:
					<React.Fragment>
						{!data.length ? 
							<Row>
								<Col>
									Deck doesn't exist.
								</Col>
							</Row>
							:
							<Col style={{
								padding: "80px 40px 80px 40px",
								border: "1px solid lightgray",
								backgroundColor: "white",
								boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"

							}} xs="12" sm="12" md="8" lg="6">
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
											value={title}
											onChange={e => {
												setTitle(e.target.value)
											}}
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
										<LoadingButton sending={sending} disabled={sending} type="submit" variant="dark" block >Save</LoadingButton>
									</Form.Group>
								</Form>
							</Col>
						}
					</React.Fragment>}
			</Row>
		</Container>
	)
}