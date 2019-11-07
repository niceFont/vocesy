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
							<Col style={{
								marginTop: 350
							}} xs="12" sm="10" lg="6" md="8">
								<Form.Control placeholder="Enter your Answer..."
									style={{
										resize: "none" 
									}}
									as="textarea"
									onKeyPress={(e) => {
										if (e.key === "Enter" || e.keyCode === 13) {
											if (e.target.value.trim() !== "") {
												e.preventDefault()
												e.target.value = "".replace(/(\r\n|\n|\r)/gm, "")
												if (props.current + 1 === props.max) {
													props.toggleDone(true)
												} else {
													props.next(curr => curr + 1)
												}
												props.pushInput(arr => [ ...arr, userValue ])
												setUserValue("")
												return false
											}
										}
									}}
									onChange={({ target }) =>
										setUserValue(target.value)
									}></Form.Control>
							</Col>
						) : (
							<Col style={{
								marginTop: 350
							}} md="4" className="text-center">
								<ButtonGroup>
									<Button disabled={props.done}
										variant="danger"
										onClick={() => {
											if (props.flipped) {
												props.toggleFlipped(false)
											}
											const timeout = props.flipped ? 1000 : 0
											setTimeout(() => {
	
												if ( props.current + 1 === props.max) {
													props.toggleDone(done => !done)
												} else {
													props.next(curr => curr + 1)
												}
												props.pushInput(arr => [
													...arr,
													false
												])
											}, timeout)
										}}>
										Wrong
									</Button>
									<Button disabled={props.done}
										variant="success"
										onClick={() => {
											if (props.flipped) {
												props.toggleFlipped(false)
											}
											const timeout = props.flipped ? 1000 : 0
											setTimeout(() => {
												if (props.current + 1 === props.max) {
													props.toggleDone(done => !done)
												} else {
													props.next(curr => curr + 1)
												}
												props.pushInput(arr => [ ...arr, true ])

											}, timeout)
										}}>
										Right
									</Button>
								</ButtonGroup>
							</Col>
						)}
					</React.Fragment>
				)}
			</Row>
		</Container>
	)
}
