import {CreateDeck} from "../components/Decks/CreateDeck"
import {WithAuth} from "../components/Auth/WithAuth"
import {Container} from "react-bootstrap"

const NewDeck = WithAuth((props) => {

	return (
		<Container style={{ marginTop: 200 }}>
			<h2 style={{textAlign: "center"}}>Create a new Deck.</h2>
			<CreateDeck user={props.user}></CreateDeck>
		</Container>
	)
})


export default NewDeck