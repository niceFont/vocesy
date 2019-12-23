import React, { useState } from "react"
import { Row, Col, Form } from "react-bootstrap"
import fetch from "isomorphic-fetch"
import WhiteContainer from "../components/Helpers/WhiteContainer"

function ResetPassword() {

	const [email, setEmail] = useState("")
	const [sent, setSent] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log({
			email
		})
		if (email.length) {
			try {
				const result = await fetch("/api/resetpassword", {
					method: "POST",
					body: JSON.stringify({
						email
					})
				})
				if (!result.ok) throw result.statusText
			} catch (err) {
				console.error(err)
			} finally {
				setSent(true)
			}
		}
	}

	return (
		<WhiteContainer style={{
			padding: "100px 0",
			margin: "150px auto",
			background: "white"
		}}>
			<Row style={{
				marginBottom: 25
			}} className="justify-content-center">
				<Col sm="8" xs="8" md="6" lg="4">
					<h4 style={{
						fontWeight: 600
					}}>Recover Account</h4>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs="8" sm="8" lg="4" md="6">
					<Form onSubmit={handleSubmit}>
						<Form.Label>Enter your E-mail address:</Form.Label>
						<Form.Group>
							<Form.Control type="email" onChange={({ target }) => setEmail(target.value)}></Form.Control>
						</Form.Group>
						<Form.Control type="submit" value="Send"></Form.Control>
					</Form>
				</Col>
			</Row>
			{sent &&
				<Row className="justify-content-center">
					<Col lg="6" md="6">
						<p>We sent a Message to this E-Mail.
						If you did not receive one, click <a onClick={handleSubmit}>resend</a>
						</p>
					</Col>
				</Row>
			}
		</WhiteContainer >
	)
}

ResetPassword.getInitialProps = async (ctx) => {
	const { "t": token } = ctx.query


	return {
		token
	}
}


export default ResetPassword
