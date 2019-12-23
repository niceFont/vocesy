import React, { useState, useEffect } from "react"
import { Row, Col, Form } from "react-bootstrap"
import fetch from "isomorphic-fetch"
import { Loading } from "../components/Helpers/Loading"
import WhiteContainer from "../components/Helpers/WhiteContainer"
import { useError } from "../hooks/hooks"


function Pw(props) {

	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")
	const [success, setSuccess] = useState()
	const [user, setUser] = useState({
	})
	const [error, setError] = useError()

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
				setUser(user)
				setError(null)

			} catch (error) {
				console.error(error)
				setError(error)
			} finally {
				toggleFetched(true)
			}

		}
		UserExists()
	}, [props.email, props.resetToken, props.token, setError])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password === repeatPassword && password.length >= 8) {
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
		} else {
			setError("Make Sure the Passwords match and are atleast 8 characters long.")
		}
	}


	return (
		<WhiteContainer style={{
			marginTop: 50,
			padding: "100px 0",
			background: "white"
		}}>
			{fetched ?
				<>
					{user.authenticated ?
						<>
							<Row>
								{error}
							</Row>
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
						</>
						:
						<Row className="justify-content-center">
							<Col md="6" lg="6">
								<div>Error: Token is either <span style={{
									borderBottom: "3px solid rgba(235,60,60,1)",
									fontWeight: 600
								}}>invalid or expired. </span></div>
							</Col>
						</Row>
					}
					{success && <div>YAYYYYY</div>}
				</>
				:
				<Loading fetched={fetched}></Loading>
			}
		</WhiteContainer>
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
