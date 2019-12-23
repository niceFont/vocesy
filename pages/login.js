import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useError } from "../hooks/hooks"
import Cookies from "js-cookie"
import React from "react"
import Link from "next/link"


const Login = () => {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useError(null)
	const [completed, toggleCompleted] = useState(false)


	useEffect(() => {
		if (password.length >= 8 && username.length >= 2) toggleCompleted(true)
		else toggleCompleted(false)
	}, [password, username])


	const _handleLogin = async (event) => {
		if (typeof Cookies.get("user") !== "undefined") Cookies.remove("user")
		event.preventDefault()
		if (username && password && completed) {
			try {
				let response = await fetch("/api/login", {
					method: "POST",
					body: JSON.stringify({
						username, password
					})
				})
				if (!response.ok) throw await response.text()
				setError(null)
				let { token } = await response.json()
				Cookies.set("user", token, {
					expires: 1
				})
				window.location.replace("/")
			} catch (err) {
				setError(err)
			}
		}
	}

	return (
		<Container style={{
			marginBottom: 200,
			marginTop: 150
		}}>
			<Row className="justify-content-center">
				<Col className="text-center" md="4">
					<h5 style={{
						fontWeight: 600
					}}>Login</h5>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col sm="10" md="8" lg="6" style={{
					backgroundColor: "white"
				}}>
					{error}
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col sm="4" md="8" lg="6" style={{
					border: "1px solid lightgray",
					padding: "10%",
					backgroundColor: "white",
					margin: "0 5% 0 5%"
				}} >
					<Form onSubmit={_handleLogin}>
						<Form.Group>
							<Form.Label>Username:</Form.Label>
							<Form.Control placeholder="Enter your Username..." type="username" required onChange={({ target }) => setUsername(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control placeholder="Enter your Password..." type="password" required onChange={({ target }) => setPassword(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Button block disabled={!completed} type="submit" variant="dark">Login</Button>
						</Form.Group>
						<Link href="/reset-password">
							<a>Forgot password?</a>
						</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}


export default Login