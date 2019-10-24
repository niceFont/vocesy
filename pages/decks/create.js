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
				padding: 5,
				fontWeight: 600
			}}>Create a deck</h5>
			<CreateDeck user={props.user}></CreateDeck>
		</Container>
	)
})

export default NewDeck
