import {useEffect, useState} from "react"
import {Button, Container, Card} from "react-bootstrap"
import Link from "next/link"
import fetch from "isomorphic-fetch"

const Decks = ({user}) => {
	const [decks, setDecks] = useState()

	//if (!isAuthenticated) {
	//	if (typeof window !== "undefined") {
	//		window.location.replace("http://localhost:3000")
	//	}
	//}
	useEffect(() => {

		if (typeof user !== "undefined") {
			const url = `/api/decks?user=${user.displayName}`
			fetch(url)
				.then(res => res.json())
				.then(decks => {
					if (decks.length) {
						setDecks(decks)
					}
					return
				}).catch(err => console.error(err))
		}
		return () => "done"
	}, [user])

	return (

		<Container>

			{decks && decks.map((deck, i) => {
				return (
					<Card style={{width: "18rem"}} key={i}>
						<Link href={`/decks/${deck.slug}`}>
							<a>
								<Card.Img variant="top" src="https://via.placeholder.com/450"/>
							</a>
						</Link>
						<Card.Body>
							<Card.Title>{deck.title[0].toUpperCase() + deck.title.slice(1)}</Card.Title>
							<Button size="sm" variant="light" disabled>{deck.privacy ? "Private" : "Public"}</Button>
						</Card.Body>
					</Card>
				)
			})}
		</Container>
	)
}


export default Decks