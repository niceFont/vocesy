import React, { useState } from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import fetch from "isomorphic-fetch"


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
		<Container style={{
			padding: "100px 0",
			margin: "50px auto",
			background: "white"
		}}>
			<Row className="justify-content-center">
				<Col lg="6" md="6">
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
		</Container >
	)
}

ResetPassword.getInitialProps = async (ctx) => {
	const { "t": token } = ctx.query


	return {
		token
	}
}


export default ResetPassword
