import { CreateDeck } from "../../components/Decks/CreateDeck"
import { WithAuth } from "../../components/Auth/WithAuth"
import { Container } from "react-bootstrap"

const NewDeck = WithAuth(props => {
	return (
		<Container style={{
			marginTop: 200 
		}}>
			<h5 style={{
				textAlign: "center",
				background: "black",
				color: "white",
				padding: 5,
			}}>Create a new deck</h5>
			<CreateDeck user={props.user}></CreateDeck>
		</Container>
	)
})

export default NewDeck
