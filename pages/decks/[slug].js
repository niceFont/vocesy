import { useState, useEffect } from "react"
import { NotFound } from "../../components/Helpers/NotFound"
import fetch from "isomorphic-fetch"
import { Loading } from "../../components/Helpers/Loading"
import { WithAuth } from "../../components/Auth/WithAuth"
import { Container, Card, Button, Row, Col } from "react-bootstrap"
import { CreateCard } from "../../components/Cards/CreateCard"
import { EditCard } from "../../components/Cards/EditCard"
import Link from "next/link"

const Deck = WithAuth(props => {
	const [exists, setExists] = useState(false)
	const [fetched, setFetched] = useState(false)
	const [data, setData] = useState([])
	const [adding, toggleAdding] = useState(false)
	const [editing, toggleEditing] = useState(false)
	const [removing, toggleRemove] = useState(false)
	const [setting, toggleSetting] = useState(false)
	const [settings, changeSettings] = useState({
		userValidation: false 
	})
	const [editID, setEditID] = useState()
	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				.then(res => res.json())
				.catch(err => console.error(err))
			if (typeof res !== "undefined") {
				setExists(true)
				setData(res)
			}
			setFetched(true)
			return
		}
		fetchData()
	}, [adding, removing, editing, props.slug, props.user.displayName])

	async function _removeCard(id) {
		try {
			await fetch("/api/cards/remove", {
				method: "DELETE",
				body: JSON.stringify({
					id 
				})
			})
				.then(res => {
					res.json()
					toggleRemove(false)
				})
				.catch(err => console.error(err))
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<Container style={{
			marginTop: 200 
		}}>
			{fetched ? (
				<div>
					{exists ? (
						<Container style={{
							marginBottom: 100 
						}}>
							<Container
								style={{
									padding: 5,
									border: "1px solid #e3e6e4"
								}}>
								<Row
									className="justify-content-between"
									style={{
										padding: 5 
									}}>
									<Col className="my-auto">
										<h6
											className="text-capitalize"
											style={{
												fontWeight: "bold",
												margin: "0 0 0 50px"
											}}>
											{data[0].title + "-cards"}
										</h6>
									</Col>
									<Col>
										<Link
											href={`/play/${props.slug}?uv=${settings.userValidation}`}>
											<Button
												style={{
													fontWeight: "bold" 
												}}
												disabled={!data[0].front}
												block
												variant="outline-success"
												size="md">
												START
											</Button>
										</Link>
									</Col>
									<Col className="text-right my-auto">
										<Button
											variant="light"
											size="sm"
											style={{
												margin: "0 5px 0 0" 
											}}
											onClick={() => toggleAdding(true)}>
											Add
										</Button>
										<Button
											variant="light"
											size="sm"
											style={{
												margin: "0 50px 0 0" 
											}}
											onClick={() =>
												toggleSetting(s => !s)
											}>
											Settings
										</Button>
									</Col>
								</Row>
								{setting && (
									<Row>
										<Col
											style={{
												margin: "20px 0 20px 0" 
											}}>
											<div className="text-center custom-control custom-switch">
												<input
													type="checkbox"
													className="custom-control-input"
													id="customSwitches"
													readOnly
													onChange={() => {
														changeSettings(settings =>
															Object.assign({
																...settings,
																userValidation: !settings.userValidation
															}))
													}}
												/>
												<label
													className="custom-control-label"
													htmlFor="customSwitches">
													Toggle User Validation
												</label>
											</div>
										</Col>
									</Row>
								)}
							</Container>
							<Row
								style={{
									margin: "20px 0 20px 0",
									overflowY: "auto",
									height: 400
								}}
								className="justify-content-center">
								{data[0].front
									? data.map(cards => {
										return (
											<Card
												key={cards.id}
												style={{
													cursor: "pointer",
													margin:
															"10px 10px 10px 10px",
													width: "15rem",
													height: "20rem"
												}}>
												<Container>
													<Row>
														<Col style={{
															padding: "0 3px 0 3px"
														}} className="text-right">
															<span
																style={{
																	margin: 5,
																	color: "#b0041d"
																}}
																onClick={e => {
																	e.stopPropagation()
																	if (confirm("Are you sure you want to delete this Card?")) {
																		_removeCard(cards.id)
																		toggleRemove(true)
																	}
																}}> x </span>
														</Col>
													</Row>
												</Container>
												<Card.Body
													onClick={() => {
														setEditID(cards.id)
														toggleEditing(true)
													}}
													className="align-middle"
													style={{
														padding: "10px 5px 10px 5px"
													}}>
													<Card.Text className="text-center">
														{cards.front}
													</Card.Text>
												</Card.Body>
											</Card>
										)
									})
									: "No Cards yet :("}
							</Row>
							<Row
								className="justify-content-center"
								style={{
									padding: 10,
									border: "1px solid #e3e6e4"
								}}></Row>
							{adding && (
								<CreateCard
									slug={props.slug}
									data={data[0]}
									toggleShow={toggleAdding}
									show={adding}></CreateCard>
							)}
							{editing && (
								<EditCard
									show={editing}
									toggleShow={toggleEditing}
									data={
										data.filter(card => card.id === editID)[0]
									}></EditCard>
							)}
						</Container>
					) : (
						<NotFound></NotFound>
					)}
				</div>
			) : (
				<Loading fetched={fetched}></Loading>
			)}
		</Container>
	)
})

export default Deck

Deck.getInitialProps = async function(ctx) {
	let slug = ctx.req.params[0].replace(/\/decks\//gi, "")
	return {
		slug 
	}
}
