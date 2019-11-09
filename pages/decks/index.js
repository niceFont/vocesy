import { useEffect, useState } from "react"
<<<<<<< HEAD
import { Row, Button, Container, Card, Col, ButtonGroup } from "react-bootstrap"
import { WithAuth } from "../../components/Auth/WithAuth"
import {Loading} from "../../components/Helpers/Loading"
import Link from "next/link"
import fetch from "isomorphic-fetch"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faCog, faLayerGroup} from "@fortawesome/free-solid-svg-icons"
=======
import {Row,
	Button,
	Container,
	Card,
	Col,
	ButtonGroup,} from "react-bootstrap"
import { WithAuth } from "../../components/Auth/WithAuth"
import { Loading } from "../../components/Helpers/Loading"
import Link from "next/link"
import fetch from "isomorphic-fetch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTrash,
	faCog,
	faLayerGroup,} from "@fortawesome/free-solid-svg-icons"
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own

const Decks = WithAuth(({ user, token }) => {
	const [decks, setDecks] = useState([])
	const [removing, toggleRemoving] = useState(false)
	const [fetched, toggleFetched] = useState(false)

	useEffect(() => {
		const fetchDecks = async () => {
			try {
				const url = `/api/decks?user=${user.displayName}`
				let response = await fetch(url)
<<<<<<< HEAD
				if(!response.ok) throw new Error(response.statusText) 
=======
				if (!response.ok) throw new Error(response.statusText)
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
				let decks = await response.json()
				setDecks(decks)
				toggleFetched(true)
			} catch (err) {
				console.error(err)
			}
		}
		fetchDecks()
	}, [removing, user.displayName])

	async function _removeDeck(id) {
		try {
			let response = await fetch("/api/decks/remove", {
				headers: {
<<<<<<< HEAD
					"authorization": "Bearer " + token
				},
				method: "DELETE",
				body: JSON.stringify({
					id
				})
			})
			if(!response.ok) throw new Error(response.statusText)
=======
					authorization: "Bearer " + token,
				},
				method: "DELETE",
				body: JSON.stringify({
					id,
				}),
			})
			if (!response.ok) throw new Error(response.statusText)
			setDecks(decks => decks.filter(deck => deck.id !== id))
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
			toggleRemoving(false)
		} catch (err) {
			console.error(err)
		}
	}

	return (
<<<<<<< HEAD
		<Container style={{
			marginBottom: 200, 
			marginTop: 200 
		}}>
=======
		<Container
			style={{
				marginBottom: 200,
				marginTop: 200,
			}}
		>
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
			<Row className="justify-content-center">
				<Col className="text-center" md="10" lg="3">
					<h5
						style={{
							borderBottom: "1px solid lightgray",
							paddingBottom: 20,
							marginBottom: 40,
							textAlign: "center",
<<<<<<< HEAD
							fontWeight: 600
						}}>
						{fetched && <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>}
						{" Decks"}
=======
							fontWeight: 600,
						}}
					>
						{fetched && <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>}
						{" Decks (" + decks.length + ")"}
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
					</h5>
				</Col>
			</Row>
			<Row className="justify-content-md-center">
<<<<<<< HEAD
				{!fetched ? <Loading fetched={fetched}></Loading> :
					<React.Fragment>
						
						{!decks.length ? <div>No decks found create one
							<Link href="/create"><a> here.</a></Link>
						</div>
							:
=======
				{!fetched ? (
					<Loading fetched={fetched}></Loading>
				) : (
					<React.Fragment>
						{!decks.length ? (
							<div>
                No decks found create one
								<Link href="/create">
									<a> here.</a>
								</Link>
							</div>
						) : (
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
							decks.map((deck, i) => {
								return (
									<Card
										style={{
<<<<<<< HEAD
											margin: 30, width: "18rem" 
										}}
										key={i}>
										<Card.Header style={{
											background: "black"
										}} className="text-right">
											<ButtonGroup>
		
												<Link href={`/decks/edit?deck=${deck.slug}`}>
													<Button variant="outline-light" size="sm">
														<FontAwesomeIcon icon={faCog}>
														</FontAwesomeIcon>
													</Button>
												</Link>
												<Button variant="outline-danger" size="sm" onClick={() => {
													if (confirm("Are you sure you want to Delete " + deck.title + "?")) {
														_removeDeck(deck.deck_id)
														toggleRemoving(true)
													}
												}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
											</ButtonGroup>
										</Card.Header>
										<Link href={`/decks/${deck.slug}`}>
											<Card.Body style={{
												cursor: "pointer"
											}}>
												<Card.Title>
													{deck.title[0].toUpperCase() +
													deck.title.slice(1)}
=======
											margin: 30,
											width: "18rem",
										}}
										key={i}
									>
										<Card.Header
											style={{
												background: "black",
											}}
											className="text-right"
										>
											<ButtonGroup>
												<Link href={`/decks/edit?deck=${deck.slug}`}>
													<Button variant="outline-light" size="sm">
														<FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
													</Button>
												</Link>
												<Button
													variant="outline-danger"
													size="sm"
													onClick={() => {
														if (
															confirm("Are you sure you want to Delete " +
                                  deck.title +
                                  "?")
														) {
															_removeDeck(deck.deck_id)
															toggleRemoving(true)
														}
													}}
												>
													<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
												</Button>
											</ButtonGroup>
										</Card.Header>
										<Link href={`/decks/${deck.slug}`}>
											<Card.Body
												style={{
													cursor: "pointer",
												}}
											>
												<Card.Title>
													{deck.title[0].toUpperCase() + deck.title.slice(1)}
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
												</Card.Title>
												<Button size="sm" variant="light" disabled>
													{deck.privacy ? "Private" : "Public"}
												</Button>
											</Card.Body>
										</Link>
									</Card>
								)
<<<<<<< HEAD
							})}
					</React.Fragment>	
				}
=======
							})
						)}
					</React.Fragment>
				)}
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
			</Row>
		</Container>
	)
})

export default Decks
