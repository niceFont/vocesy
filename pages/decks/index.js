import {useEffect, useState} from "react"
import {Button, Container, Card} from "react-bootstrap"
import Link from "next/link"
import fetch from "isomorphic-fetch"
import {WithAuth} from "../../components/WithAuth"


const Decks = WithAuth(({user}) => {
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
	}, [])

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
})


export default Decks