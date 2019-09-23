import {Layout} from "../components/Layout"
import {Jumbotron} from "react-bootstrap"

const Index = () => {
	return (
		<div>
			<Layout>
				<Jumbotron fluid={true}>

					<p>Hello World</p>
				</Jumbotron>
			</Layout>
		</div>
	)
}


export default Index