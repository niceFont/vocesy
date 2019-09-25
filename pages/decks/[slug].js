import {useState, useEffect} from "react"
import {NotFound} from "../../components/NotFound"
import fetch from "isomorphic-fetch"
import {Loading} from "../../components/Loading"
import {WithAuth} from "../../components/WithAuth"
import {Container,Card , Button, Row, Col} from "react-bootstrap"
import { CreateCard } from "../../components/CreateCard"
import { EditCard } from "../../components/EditCard"


const Deck = WithAuth((props) => {

	const [exists, setExists] = useState(false)
	const [fetched, setFetched] = useState(false)
	const [data, setData] = useState([])
	const [adding, toggleAdding] = useState(false)
	const [editing, toggleEditing] = useState(false)
	const [editID, setEditID] = useState()
	useEffect(() => {
		const fetchData = async () => {

			let res = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				.then(res => res.json())
				.catch(err => console.error(err))
			
			if (res.length) {
				setExists(true)
				setData(res)
			}
			setFetched(true)
			return
		}
		fetchData()
	}, [editing, adding])

	// TODO Add Card Editing
	return (
		<div>
			{fetched ?
				<div>

					{exists ?
						<Container>
							<Row className="justify-content-between" style={{padding: 5, border: "1px solid #e3e6e4"}}>
								<Col className="my-auto"> 
									<h6 style={{margin: "0 0 0 50px" }}>{data[0].title[0].toUpperCase() + data[0].title.slice(1) + "'s Cards"}</h6>
								</Col>
								<Col className="text-right">
									<Button variant="light" size="sm" style={{margin: "0 50px 0 0"}} onClick={() => toggleAdding(true)}>Add</Button>
								</Col>
							</Row>
							<Row style={{margin: "20px 0 20px 0"}} className="justify-content-center">
								{data[0].front && data.map((cards) => {
									return (<Card key={cards.id} style={{cursor: "pointer", margin: "10px 10px 10px 10px", width: "10rem", height: "15rem"}} onClick={() => {
										setEditID(cards.id)
										toggleEditing(true)
									}}>
										<Card.Body>
											<Card.Subtitle className="mb-2 text-muted">Front</Card.Subtitle>
											<Card.Text>{cards.front}</Card.Text>
										</Card.Body>
									</Card>)
								})}

							</Row>
							{adding && <CreateCard slug={props.slug} data={data[0]} toggleShow={toggleAdding} show={adding}></CreateCard>}
							{editing && <EditCard show={editing} toggleShow={toggleEditing}  data={data.filter(card => card.id === editID)[0]}></EditCard>}
						</Container>
						: <NotFound ></NotFound>}
				</div>
				:
				<Loading fetched={fetched}></Loading>
			}	
		</div>
	)
})

export default Deck


Deck.getInitialProps = async function (ctx) {
	let slug = ctx.req.params[0].replace(/\/decks\//gi, "")
	return {slug}
}