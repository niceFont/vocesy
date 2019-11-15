import React, { useState } from "react"
import {Form,
	Row,
	Col,
	Container,
	ButtonGroup,
	Button,} from "react-bootstrap"


export const PlayControl = props => {
	const [userValue, setUserValue] = useState("")
	const [disabled, toggleDisabled] = useState(false)

	return (
		<Container
			style={{
				margin: "50px 0 100px 0px",
			}}
		>
			<Row className="justify-content-center">
				{props.done ? (
					<Col xs="6" sm="6" md="6">
						<Button block onClick={props.restart}>
              Restart
						</Button>
					</Col>
				) : (
					<React.Fragment>
						{props.settings.uv === "false" ? (
							<Col
								style={{
									marginTop: 350,
								}}
								xs="12"
								sm="10"
								lg="6"
								md="8"
							>
								<Form.Control
									placeholder="Enter your Answer..."
									style={{
										resize: "none",
									}}
									as="textarea"
									onKeyPress={e => {
										if (e.key === "Enter" || e.keyCode === 13) {
											if (e.target.value.trim() !== "") {
												e.preventDefault()
												e.target.value = "".replace(/(\r\n|\n|\r)/gm, "")
												if (props.current + 1 === props.max) {
													props.toggleDone(true)
												} else {
													props.next(curr => curr + 1)
												}
												props.pushInput(arr => [...arr, userValue])
												setUserValue("")
												return false
											}
										}
									}}
									onChange={({ target }) => setUserValue(target.value)}
								></Form.Control>
							</Col>
						) : (
							<Col
								style={{
									marginTop: 350,
								}}
								md="4"
								className="text-center"
							>
								<ButtonGroup>
									<Button
										disabled={props.done || disabled}
										variant="danger"
										onClick={() => {
											toggleDisabled(true)
											if (props.current + 1 === props.max) {
												props.toggleDone(done => !done)
											} else {
												props.next(curr => curr + 1)
											}
											props.pushInput(arr => [...arr, false])
											toggleDisabled(false)
										}}
									>
                    Wrong
									</Button>
									<Button
										disabled={props.done || disabled}
										variant="success"
										onClick={() => {
											toggleDisabled(true)
											if (props.current + 1 === props.max) {
												props.toggleDone(done => !done)
											} else {
												props.next(curr => curr + 1)
											}
											props.pushInput(arr => [...arr, true])
											toggleDisabled(false)
										}}
									>
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