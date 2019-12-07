import React, { useState, useEffect } from "react"
import { Container, Row, Col, Form } from "react-bootstrap"
import fetch from "isomorphic-fetch"
import { Loading } from "../components/Helpers/Loading"

function Pw(props) {

	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")
	const [success, setSuccess] = useState()
	const [user, setUser] = useState({

	})
	const [fetched, toggleFetched] = useState(false)



	useEffect(() => {
		const UserExists = async () => {
			try {
				const response = await fetch("/api/users/verify", {
					method: "POST",
					headers: {
						authorization: "Bearer " + props.token,
					},
					body: JSON.stringify({
						email: props.email,
						resetToken: props.resetToken
					})
				})
				if (!response.ok) throw response.statusText
				const user = await response.json()
				console.log(user)
				setUser(user)

			} catch (error) {
				console.error(error)
			} finally {
				toggleFetched(true)
			}

		}
		UserExists()
	}, [props.email, props.resetToken, props.token])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password === repeatPassword) {
			try {
				const result = await fetch("/api/users/update", {
					method: "PUT",
					headers: {
						authorization: "Bearer " + props.token,
					},
					body: JSON.stringify({
						email: props.email, password
					})

				})
				if (!result.ok) throw result.statusText
				setSuccess(true)

			} catch (error) {
				console.error(error)
				setSuccess(false)
			}
		}
	}


	return (
		<Container style={{
			marginTop: 50,
			padding: "100px 0",
			background: "white"
		}}>
			{fetched ?
				<>
					{user.authenticated ?
						<Row className="justify-content-center">
							<Col lg="6" md="6">
								<Form onSubmit={handleSubmit}>
									<Form.Group>
										<Form.Label>New Password:</Form.Label>
										<Form.Control onChange={({ target }) => setPassword(target.value)} type="password"></Form.Control>
									</Form.Group>
									<Form.Group>
										<Form.Label>Repeat new Password:</Form.Label>
										<Form.Control onChange={({ target }) => setRepeatPassword(target.value)} type="password"></Form.Control>
									</Form.Group>
									<Form.Group>
										<Form.Control type="submit" value="Send" />
									</Form.Group>
								</Form>
							</Col>
						</Row>
						:
						<div>Token is invalid or expired </div>
					}
					{success && <div>YAYYYYY</div>}
				</>
				:
				<Loading fetched={fetched}></Loading>
			}
		</Container>
	)
}

Pw.getInitialProps = async (ctx) => {
	const { "t": resetToken, "e": email } = ctx.query

	return {
		resetToken,
		email
	}
}

export default Pw
