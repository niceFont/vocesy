import {useState, useEffect} from "react"
import { Form, Button, ButtonGroup, Row, Col} from "react-bootstrap"
import {Loading} from "../../components/Helpers/Loading"
import fetch from "isomorphic-fetch"

export const EditDeck = (props) => {

	const [data, setData] = useState([])
	const [fetched, toggleFetched] = useState(false)
	const [title, setTitle] = useState("")
	const [privacy, setPrivacy] = useState(0)

	useEffect(() => {
		async function fetchData() {
			let data = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				.then(res => res.json())
				.catch(err => console.error(err))
			
			setData(data)
			toggleFetched(true)
			if (data.length) {
				setTitle(data[0].title)
				setPrivacy(data[0].privacy)
			} 
		}
		fetchData()
	},[props.slug, props.user.displayName])

	async function _handleSubmit() {

		if (title.trim() === data[0].title && privacy === data[0].privacy) {
			window.location.replace("/decks")
			return
		}
		if (title.trim() === "") setTitle(data[0].title)
		
		try {
			await fetch("/api/decks/edit", {
				method: "POST",
				body: JSON.stringify({
					title, privacy, deckId: data[0].deck_id
				})
			})
			window.location.replace("/decks")
		} catch (err) {
			console.error(err)
		}

	}

	return (

		<Row style={{
			margin: "20px 0 0 0",
			border: "1px solid lightgray",
			padding: "80px 0 80px 0",
		}} className="justify-content-md-center">
			{!fetched ? <Loading fetched={fetched}></Loading>
				:
				<React.Fragment>
					{!data.length ? 
						<Row>
							<Col>
				Not Found
							</Col>
						</Row>
						:
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
									<Button type="submit" variant="dark" block >Save</Button>
								</Form.Group>
							</Form>
						</Col>
					}
				</React.Fragment>}
		</Row>
	)
}