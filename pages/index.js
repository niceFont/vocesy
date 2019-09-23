import {Layout} from "../components/Layout"
import {Jumbotron, Container, Button} from "react-bootstrap"
import {Loading} from "../components/Loading"
const Index = () => {
	return (
		<div>
			<Layout>
				<Jumbotron fluid>
					<Container>
						
						<h1>Welcome to Vocesy!</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<Button size="lg" variant="dark">Get Started</Button>
					</Container>
				</Jumbotron>
			</Layout>
		</div>
	)
}


export default Index