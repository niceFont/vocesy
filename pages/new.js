import { Layout } from "../components/Layout"
import {CreateDeck} from "../components/CreateDeck"

const NewDeck = () => {

	return (
		<Layout>

			<h2 style={{textAlign: "center"}}>Create a new Deck.</h2>
			<CreateDeck></CreateDeck>
		</Layout>
	)
}


export default NewDeck