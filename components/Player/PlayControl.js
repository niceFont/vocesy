import { Row, Col, Container, ButtonGroup, Button } from "react-bootstrap"

export const PlayControl = props => {
	return (
		<Container style={{ margin: "50px 0 100px 0px" }}>
			<Row className="justify-content-center">
				<Col md="4" className="text-center">
					{props.settings.uv === "false" ? (
						<textarea></textarea>
					) : (
						<React.Fragment>
							{props.done ? (
								<Button block onClick={props.restart}>
									Restart
								</Button>
							) : (
								<ButtonGroup>
									<Button
										disabled={props.done}
										variant="danger"
										onClick={() => {
											if (
												props.current + 1 ===
												props.max
											) {
												props.toggleDone(done => !done)
											} else {
												props.next(curr => curr + 1)
											}
											props.pushInput(arr => [
												...arr,
												"Wrong"
											])
										}}>
										Wrong
									</Button>
									<Button
										disabled={props.done}
										variant="success"
										onClick={() => {
											if (
												props.current + 1 ===
												props.max
											) {
												props.toggleDone(done => !done)
											} else {
												props.next(curr => curr + 1)
											}
											props.pushInput(arr => [
												...arr,
												"Wrong"
											])
										}}>
										Right
									</Button>
								</ButtonGroup>
							)}
						</React.Fragment>
					)}
				</Col>
			</Row>
		</Container>
	)
}
