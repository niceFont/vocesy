import { Jumbotron, Row, Col, Container, Button } from "react-bootstrap"
import Link from "next/link"

const Index = () => {
	return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				height: "100vh",
				background: "url('/static/background.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center"
			}}>
			<Container>
				<Row style={{
					marginTop: 250 
				}}>
					<Col sm="12" md="10" lg="8">
						<Jumbotron
							style={{
								color: "black",
								backgroundColor: "rgba(255, 255, 255, .8)"
							}}>
							<h1>Welcome to Vocesy!</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</p>
							<Link href="/decks">
								<Button size="lg" variant="dark">
									Get Started
								</Button>
							</Link>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Index
