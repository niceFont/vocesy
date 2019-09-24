import {useState, useEffect} from "react"
import {NotFound} from "../../components/NotFound"
import fetch from "isomorphic-fetch"
import {Loading} from "../../components/Loading"
import {WithAuth} from "../../components/WithAuth"
import {Container,Card , Button, Row, Col} from "react-bootstrap"
import { CreateCard } from "../../components/CreateCard"


const Deck = WithAuth((props) => {

	const [exists, setExists] = useState(false)
	const [fetched, setFetched] = useState(false)
	const [data, setData] = useState([])
	const [editing, toggleEditing] = useState(false)
	const [cards, setCards] = useState([])
	console.log(data)
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
	}, [])


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
									<Button variant="light" size="sm" style={{margin: "0 50px 0 0"}} onClick={() => toggleEditing(true)}>Add</Button>
								</Col>
							</Row>
							<Row style={{margin: "20px 0 20px 0"}} className="justify-content-center">
								{data[0].front && data.map((cards) => {
									return (<Card key={cards.id} style={{margin: "10px 10px 10px 10px", width: "10rem", height: "15rem"}}>
										<Card.Body>
											<Card.Subtitle className="mb-2 text-muted">Front</Card.Subtitle>
											<Card.Text>{cards.front}</Card.Text>
										</Card.Body>
									</Card>)
								})}

							</Row>
							{editing && <CreateCard slug={props.slug} data={data[0]} toggleShow={toggleEditing} show={editing}></CreateCard>}
						</Container>
						: <NotFound></NotFound>}
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