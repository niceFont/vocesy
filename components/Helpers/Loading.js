import { Spinner, Container, Row } from "react-bootstrap"

export const Loading = props => {
	return (
		<div>
			{!props.fetched && (
				<Container>
					<Row className="justify-content-center">
						<Spinner size="lg" animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</Row>
				</Container>
			)}
		</div>
	)
}
