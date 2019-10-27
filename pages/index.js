import { Jumbotron, Row, Col, Container, Button } from "react-bootstrap"
import React from "react"
import Link from "next/link"

const Index = () => {
	return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				height: "100vh",
				background: "url('/static/background-min.webp')",
				backgroundSize: "cover",
				backgroundPosition: "center"
			}}>
			<Container>
				<Row style={{
					marginTop: 200 
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
