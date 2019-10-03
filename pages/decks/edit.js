import {EditDeck} from "../../components/Decks/EditDeck"
import {Container} from "react-bootstrap"

const Edit = (props) => {

	return (
		<Container style={{
			marginTop: 200
		}}>
			<h5 style={{
				textAlign: "center",
				padding: 5,
				background: "black",
				color: "white"
			}}>Edit your Deck</h5>
			<EditDeck slug={props.slug} user={props.user}></EditDeck>
		</Container>
	)
	
}


export default Edit

Edit.getInitialProps = async (ctx) => {
	return {
		slug: ctx.query.deck
	}
}