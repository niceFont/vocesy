import { Container, Row, Col, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useError } from "../hooks/hooks"
import InputWithOverlay from "../components/Signup/InputWithOverlay"

const SignUp = () => {

	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passVerify, setPassVerify] = useState("")
	const [error, setError] = useError(null)
	const [completed, toggleCompleted] = useState(false)

	useEffect(() => {
		if (password.length >= 8 && email.includes("@") && username.length >= 3 && passVerify.length) {
			toggleCompleted(true)
		} else {
			toggleCompleted(false)
		}
		
	}, [password, passVerify, email, username])

	const _handleSubmit = async (event) => {
		event.preventDefault()
		if (completed) {
			if (password !== passVerify) {
				setError("Passwords dont match!")
				return
			}
			
			try {
				let response = await fetch("/api/signup", {
					method: "POST",
					body: JSON.stringify({
						username, email, password
					})
				})
				
				if (response.ok) {
					setError(null)
					window.location.replace("/login")
				} else {
					throw await response.text()
				}
			} catch (err) {
				setError(err)
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
					}}>Sign up</h5>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col sm="10" md="8" lg="6"> 
					{error}
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md="8" lg="6" style={{
					border: "1px solid lightgray",
					padding: "10%",
					margin: "0 5% 0 5%"
				}} >
					<Form onSubmit={_handleSubmit}>
						<InputWithOverlay
							tooltip="no special characters..."
							overlayId="username"
							placeholder="Enter your Username..."
							type="text"
							label="Username:"
							handleChangeFn={setUsername} >
						</InputWithOverlay>
						<InputWithOverlay
							tooltip="only valid email address..."
							overlayId="email"
							placeholder="Enter your Email..."
							type="email"
							label="Email:"
							handleChangeFn={setEmail} >
						</InputWithOverlay>
						<InputWithOverlay
							tooltip="atleast 8 characters long..."
							overlayId="password"
							placeholder="Enter your Password..."
							type="password"
							label="Password:"
							handleChangeFn={setPassword} >
						</InputWithOverlay>
						<InputWithOverlay
							tooltip="make sure they match..."
							overlayId="passwordVer"
							placeholder="Enter your Password again..."
							type="password"
							label={null}
							handleChangeFn={setPassVerify} >
						</InputWithOverlay>
						<Form.Group>
							<OverlayTrigger overlay={
								<Tooltip>check if your input is valid.</Tooltip>
							}>
								<Button disabled={!completed} type="submit" variant="dark" block>Sign up</Button>
							</OverlayTrigger>
						</Form.Group>
					</Form>        
				</Col>
			</Row>
		</Container>
	)
}


export default SignUp