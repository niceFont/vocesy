import { useEffect, useState } from "react"
import { Row, Button, Container, Card, Col } from "react-bootstrap"
import Link from "next/link"
import fetch from "isomorphic-fetch"
import { WithAuth } from "../../components/Auth/WithAuth"

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
	})

	return (
		<Container style={{ marginTop: 200 }}>
			<Row className="justify-content-center">
				<Col className="text-center" md="6" lg="3">
					<h5
						style={{
							borderBottom: "1px solid black",
							paddingBottom: 50,
							marginBottom: 40,
							textAlign: "center"
						}}>
						{" "}
						Your Decks
					</h5>
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				{decks &&
					decks.map((deck, i) => {
						return (
							<Card
								style={{ margin: 30, width: "18rem" }}
								key={i}>
								<Link href={`/decks/${deck.slug}`}>
									<a>
										<Card.Img
											variant="top"
											src="https://via.placeholder.com/450"
										/>
									</a>
								</Link>
								<Card.Body>
									<Card.Title>
										{deck.title[0].toUpperCase() +
											deck.title.slice(1)}
									</Card.Title>
									<Button size="sm" variant="light" disabled>
										{deck.privacy ? "Private" : "Public"}
									</Button>
								</Card.Body>
							</Card>
						)
					})}
			</Row>
		</Container>
	)
})

export default Decks
