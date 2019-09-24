import {CreateDeck} from "../components/CreateDeck"
import {WithAuth} from "../components/WithAuth"
const NewDeck = WithAuth(() => {

	return (
		<div>

			<h2 style={{textAlign: "center"}}>Create a new Deck.</h2>
			<CreateDeck></CreateDeck>
		</div>
	)
})


export default NewDeck