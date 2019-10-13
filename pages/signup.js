import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useState } from "react"

const Login = (props) => {

	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")

	const _handleSubmit = async (event) => {
		event.preventDefault()
		if(password !== confirm) return 

		try {
			let res = await fetch("/api/signup", {
				method: "POST",
				body: JSON.stringify({
					username, email, password
				})
			})

			if(res.ok) window.location.replace("/login")
		} catch (err) {
			console.error(err)
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
					}}>Sign up</h5>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md="8" lg="6" style={{
					border: "1px solid lightgray",
					padding: 100
				}} >
					<Form onSubmit={_handleSubmit}>
						<Form.Group>
							<Form.Label>Username:</Form.Label>
							<Form.Control placeholder="Enter your username..." type="username" required onChange={({target}) => setUsername(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control placeholder="Enter your email address..." type="email" required onChange={({target}) => setEmail(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control placeholder="Enter a Password..." type="password" required onChange={({target}) => setPassword(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Control placeholder="Enter your Password again..." type="password" onChange={({target}) => setConfirm(target.value)}></Form.Control>
						</Form.Group>
						<Form.Group>
							<Button type="submit" variant="dark" block>Sign up</Button>
						</Form.Group>
					</Form>        
				</Col>
			</Row>
		</Container>
	)
}


export default Login