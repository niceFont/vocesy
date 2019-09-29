import React, { useState } from "react"
import { Form, Row, Col, Container, ButtonGroup, Button } from "react-bootstrap"

export const PlayControl = props => {
	const [userValue, setUserValue] = useState("")

	return (
		<Container style={{
			margin: "50px 0 100px 0px" 
		}}>
			<Row className="justify-content-center">
				{props.done ? (
					<Col md="4">
						<Button block onClick={props.restart}>
							Restart
						</Button>
					</Col>
				) : (
					<React.Fragment>
						{props.settings.uv === "false" ? (
							<Col md="8">
								<Form.Control
									placeholder="Enter your Answer..."
									style={{
										resize: "none" 
									}}
									as="textarea"
									onKeyPress={({ key, target }) => {
										if (key === "Enter") {
											target.value = ""
											target.blur()
											if (
												props.current + 1 ===
												props.max
											) {
												props.toggleDone(true)
											} else {
												props.next(curr => curr + 1)
											}
											props.pushInput(arr => [
												...arr,
												userValue
											])
											setUserValue("")
										}
									}}
									onChange={({ target }) =>
										setUserValue(target.value)
									}></Form.Control>
							</Col>
						) : (
							<Col md="4" className="text-center">
								(
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
								)
							</Col>
						)}
					</React.Fragment>
				)}
			</Row>
		</Container>
	)
}
