import { useState, useEffect } from "react"
import { NotFound } from "../../components/Helpers/NotFound"
import fetch from "isomorphic-fetch"
import { Loading } from "../../components/Helpers/Loading"
import { WithAuth } from "../../components/Auth/WithAuth"
import { Container, Button, Row, Col, Dropdown } from "react-bootstrap"
import { CreateCard } from "../../components/Cards/CreateCard"
import { EditCard } from "../../components/Cards/EditCard"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowLeft,
	faPlay,
	faPlus,
	faCog,
	faLayerGroup,} from "@fortawesome/free-solid-svg-icons"
import { AnimatedCard } from "../../components/Cards/AnimatedCard"
import DropdownToggle from "react-bootstrap/DropdownToggle"
import SettingsMenu from "../../components/Decks/SettingsMenu"

const Deck = WithAuth(props => {
	const [exists, setExists] = useState(false)
	const [fetched, setFetched] = useState(false)
	const [data, setData] = useState([])
	const [adding, toggleAdding] = useState(false)
	const [editing, toggleEditing] = useState(false)
	const [removing, toggleRemove] = useState(false)
	const [settings, changeSettings] = useState(() => {
		if (typeof localStorage !== "undefined") {
			return {
				userValidation: localStorage.getItem("settings_uv") === "true",
			}
		}
	})
	const [editID, setEditID] = useState()
	useEffect(() => {
		const fetchCards = async () => {
			try {
				let response = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				if (!response.ok) throw new Error(response.statusText)
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
			let response = await fetch("/api/cards/remove", {
				method: "DELETE",
				headers: {
					authorization: "Bearer " + props.token,
				},
				body: JSON.stringify({
					id,
				}),
			})
			if (!response.ok) throw new Error(response.statusText)
			setData(data => data.filter(card => card.id !== id))
			toggleRemove(false)
		} catch (err) {
			console.error(err)
		}
	}

	function _saveSettingsLocal() {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem("settings_uv",
				(!settings.userValidation).toString())
		}
	}
	return (
		<Container
			style={{
				marginTop: 40,
			}}
		>
			{fetched ? (
				<div>
					<Link href="/decks">
						<Button
							variant="outline-dark"
							style={{
								marginTop: 100,
							}}
						>
							<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
						</Button>
					</Link>
					{exists ? (
						<Container
							style={{
								margin: "50px 0 100px 0px",
								padding: "20px 15px 40px 15px",
								borderRadius: 5,
								backgroundColor: "white",
								boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
							}}
						>
							<Row
								style={{
									padding: 5,
									borderBottom: "1px solid lightgray",
								}}
							>
								<Col
									style={{
										display: "flex",
									}}
									className="align-items-center"
								>
									<h6 className="my-auto text-capitalize">
										<FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>
										{` ${data[0].title} - ${data.length} Cards`}
									</h6>
								</Col>
								<Col className="text-right">
									<Link
										href={`/play/${props.slug}?uv=${settings.userValidation}`}
									>
										<Button
											disabled={!data[0].front}
											style={{
												margin: "0 5px 0 0",
											}}
											variant="success"
											size="sm"
										>
											<FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
										</Button>
									</Link>
									<Button
										variant="info"
										size="sm"
										style={{
											margin: "0 5px 0 0",
										}}
										onClick={() => toggleAdding(true)}
									>
										<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
									</Button>
								</Col>
								<Dropdown alignRight>
									<DropdownToggle variant="light" size="sm" style={{
									}}>
										<FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
									</DropdownToggle>
									<Dropdown.Menu
										style={{
											padding: 10,
										}}
										currentSettings={settings}
										saveSettingsLocal={_saveSettingsLocal}
										changeSettings={changeSettings}
										as={SettingsMenu}
									></Dropdown.Menu>
								</Dropdown>
							</Row>
							<Row
								style={{
									overflowY: "auto",
									marginTop: 35,
									paddingTop: 20,
									paddingBottom: 20
								}}
								className="justify-content-center"
							>
								{data[0].front
									? data.map(cards => {
										return (
											<AnimatedCard
												key={cards.id}
												cards={cards}
												toggleRemove={toggleRemove}
												_removeCard={_removeCard}
												setEditID={setEditID}
												toggleEditing={toggleEditing}
											></AnimatedCard>
										)
									})
									: "No Cards yet :("}
							</Row>
							{adding && (
								<CreateCard
									token={props.token}
									slug={props.slug}
									data={data[0]}
									toggleShow={toggleAdding}
									show={adding}
								></CreateCard>
							)}
							{editing && (
								<EditCard
									token={props.token}
									show={editing}
									toggleShow={toggleEditing}
									data={data.filter(card => card.id === editID)[0]}
								></EditCard>
							)}
						</Container>
					) : (
						<Container>
							<Row
								style={{
									marginTop: 100,
								}}
							>
								<Col>
									<NotFound></NotFound>
								</Col>
							</Row>
						</Container>
					)}
				</div>
			) : (
				<Container>
					<Row
						style={{
							marginTop: 250,
						}}
					>
						<Col>
							<Loading fetched={fetched}></Loading>
						</Col>
					</Row>
				</Container>
			)}
				<style global jsx>
					{`
						.ck-balloon-panel {
							z-index: 1100 !important;
						}
						.ck-editor__editable {
							overflow: hidden;
							height: 100% !important;
						}
					`}
				</style>
		</Container>
	)
})

export default Deck

Deck.getInitialProps = async function(ctx) {
	let { slug } = ctx.query
	return {
		slug,
	}
}
