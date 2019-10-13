import { Container, Row, Col } from "react-bootstrap"

export const NotFound = () => {
	return (
		<Container>
			<Row className="justify-content-center">
				<Col className="text-center">
					<h5> 404 | We could not find what you were looking for.</h5 >
				</Col>
			</Row>
		</Container>
	)
}
