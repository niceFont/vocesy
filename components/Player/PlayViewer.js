import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap"

export const PlayViewer = props => {
	return (
		<Container>
			<Row style={{ margin: 20 }} className="justify-content-center">
				<Col className="text-center">
					<span>{props.current + "/" + props.max}</span>
				</Col>
			</Row>
			{props.done ? (
				<Row>
					<Col className="text-center">
						<ul>
							{props.userInput.map((input, index) => {
								return <li key={index}>{input}</li>
							})}
						</ul>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center">
					<Col md="6">
						<Card style={{ height: "25rem" }}>
							<Card.Header>
								<Card.Subtitle>Front</Card.Subtitle>
							</Card.Header>
							<Card.Body>
								<Card.Text>{props.data.front}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	)
}
