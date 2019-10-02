import { useEffect, useState } from "react"
import { Row, Button, Container, Card, Col, ButtonGroup } from "react-bootstrap"
import { WithAuth } from "../../components/Auth/WithAuth"
import Link from "next/link"
import fetch from "isomorphic-fetch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faCog} from "@fortawesome/free-solid-svg-icons"

const Decks = WithAuth(({ user }) => {
	const [decks, setDecks] = useState()

	useEffect(() => {
		const fetchData = async () => {
			const url = `/api/decks?user=${user.displayName}`
			let decks = await fetch(url)
				.then(res => res.json())
				.catch(err => console.error(err))
			if (decks.length > 0) {
				setDecks(decks)
				return
			}
		}
		fetchData()
	}, [user.displayName])

	return (
		<Container style={{
			marginTop: 200 
		}}>
			<Row className="justify-content-center">
				<Col className="text-center" md="6" lg="3">
					<h5
						style={{
							borderBottom: "1px solid black",
							paddingBottom: 50,
							marginBottom: 40,
							textAlign: "center"
						}}>
						Your Decks
					</h5>
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				{decks &&
					decks.map((deck, i) => {
						return (
							<Card
								style={{
									margin: 30, width: "18rem" 
								}}
								key={i}>
								<Card.Header style={{
									background: "black"
								}} className="text-right">
									<ButtonGroup>

										<Button variant="outline-light" size="sm"><FontAwesomeIcon icon={faCog}></FontAwesomeIcon></Button>
										<Button variant="outline-danger" size="sm"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
									</ButtonGroup>
								</Card.Header>
								<Link href={`/decks/${deck.slug}`}>
									<Card.Body>
										<Card.Title>
											{deck.title[0].toUpperCase() +
											deck.title.slice(1)}
										</Card.Title>
										<Button size="sm" variant="light" disabled>
											{deck.privacy ? "Private" : "Public"}
										</Button>
									</Card.Body>
								</Link>
							</Card>
						)
					})}
			</Row>
		</Container>
	)
})

export default Decks
