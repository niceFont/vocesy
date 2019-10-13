import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useState } from "react"
import Cookies from "js-cookie"

const Login = (props) => {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	console.log(props)
	const _handleLogin = async (event) => {
		event.preventDefault()
		if (username && password) {
			try {
				let res = await fetch("/api/login", {
					method: "POST",
					body: JSON.stringify({
						username, password
					})
				})
				Cookies.set("user", await res.json())
				if(window) localStorage.setItem("loggedIn", username)
				if(typeof Cookies.get("user") !== "undefined") window.location.replace("/")
				else throw new Error("Could not create Session, try again.")
			} catch (err) {
				console.error(err)
			}
		}
	}

	return (
		<Container style={{
			marginTop: 200
		}}>
			<Row className="justify-content-center">
				<Col className="text-center" md="4">
					<h5 style={{
						fontWeight: 600
					}}>Login</h5>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md="8" lg="6" style={{
					border: "1px solid lightgray",
					padding: 100
				}} >
					<Form onSubmit={_handleLogin}>
						<Form.Group>
							<Form.Label>Username:</Form.Label>
							<Form.Control type="username" required onChange={({target}) => setUsername(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control type="password" required onChange={({target}) => setPassword(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Button type="submit" variant="dark">Login</Button>
						</Form.Group>
					</Form>        
				</Col>
			</Row>
		</Container>
	)
}


export default Login