import { useState, useEffect } from "react"
import { NotFound } from "../../components/Helpers/NotFound"
import fetch from "isomorphic-fetch"
import { Loading } from "../../components/Helpers/Loading"
import { WithAuth } from "../../components/Auth/WithAuth"
import { Container, Button, Row, Col } from "react-bootstrap"
import { CreateCard } from "../../components/Cards/CreateCard"
import { EditCard } from "../../components/Cards/EditCard"
import Link from "next/link"
import {AnimatedCard} from "../../components/Cards/AnimatedCard"

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
		const fetchCards = async () => {
			try {

				let response = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				let cards = await response.json()
				if (cards.length) {
					setExists(true)
					setData(cards)
				}
				setFetched(true)
			} catch (err) {
				console.error(err)
			}
		}
		fetchCards()
	}, [adding, removing, editing, props.slug, props.user.displayName])

	async function _removeCard(id) {
		try {
			await fetch("/api/cards/remove", {
				method: "DELETE",
				body: JSON.stringify({
					id 
				})
			})
			toggleRemove(false)
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
									borderBottom: "1px solid lightgray"
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
											<AnimatedCard key={cards.id} cards={cards} toggleRemove={toggleRemove} _removeCard={_removeCard} setEditID={setEditID} toggleEditing={toggleEditing} ></AnimatedCard>
										)
									})
									: "No Cards yet :("}
							</Row>
							<Row
								className="justify-content-center"
								style={{
									padding: 10,
									borderTop: "1px solid lightgray"
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
	let {slug} = ctx.query
	return {
		slug 
	}
}
