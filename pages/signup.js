import {Alert, Container, Form, FormGroup, FormControl, FormLabel, Row, Col} from "react-bootstrap"
import { Layout } from "../components/Layout"
import {useState} from "react"

const SignUp = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [repeatpass, setRepeat] = useState("")
	const [error, setError] = useState(null)

	async function _handleSubmit() {
		if (password === repeatpass) {
			setError(null)
			let response = await fetch("/api/signup", {
				method: "POST",
				body: JSON.stringify({email, password})
			})
            
			console.log(response.json())
			return
		} 
        
		setError({
			message: "Passwords don't match"
		})
	}


	return (
		<Layout>
			<Container style={{ marginTop: 200 }}>
				<Row style={{ padding: "40px 0 20px 0px"}}className="justify-content-md-center">
					<Col lg="2">
						<h3 style={{ textAlign: "center" }}>Login</h3>
					</Col>
				</Row>
				{error ? 
					<Row className="justify-content-md-center">
						<Col lg="4">
							<Alert variant="danger">{error.message}</Alert>
						</Col>
					</Row>
					: null}
				<Row className="justify-content-md-center">
					<Col lg="4">
						<Form style={{padding: "20px 0px 40px 0px"}}>
							<FormGroup>
								<FormLabel>Email:</FormLabel>
								<FormControl type="email" placeholder="Enter your Email..." onChange={(e) =>{ setEmail(e.target.value)}}/>
							</FormGroup>
							<FormGroup>
								<FormLabel>Password:</FormLabel>
								<FormControl type="password" placeholder="Enter your Password..." onChange={(e) => { setRepeat(e.target.value) }}/>
							</FormGroup>

							<FormGroup>
								<FormLabel>Confirm Password:</FormLabel>
								<FormControl type="password" placeholder="Enter your Password again..." onChange={(e) => { setPassword(e.target.value) }}/>
							</FormGroup>
							<FormGroup>
								<FormControl type="submit" onClick={(e) => {
									e.preventDefault()
									_handleSubmit()
								}} />
							</FormGroup>
						</Form>
					</Col>
				</Row>            
			</Container>
		</Layout>
	)
}

export default SignUp 