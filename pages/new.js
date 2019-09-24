import {CreateDeck} from "../components/CreateDeck"

const NewDeck = (props) => {

	return (
		<div>

			<h2 style={{textAlign: "center"}}>Create a new Deck.</h2>
			<CreateDeck user={props.user}></CreateDeck>
		</div>
	)
}


export default NewDeck