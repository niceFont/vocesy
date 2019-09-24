import {Container, Form, FormGroup, FormControl, FormLabel, Row, Col} from "react-bootstrap"
import {useState} from "react"

const Login = () => {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	async function _handleSubmit() {
		let response = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({email, password})
		})
        
	}


	return (
		<Container style={{ marginTop: 200 }}>
			<Row style={{padding: "40px 40px 0px 40px"}} className="justify-content-md-center">
				<Col lg="2">
					<h3 style={{ textAlign: "center" }}>Login</h3>
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col lg="4">
					<Form style={{padding: "40px 0px 40px 0px"}}>
						<FormGroup>
							<FormLabel>Email:</FormLabel>
							<FormControl type="email" placeholder="Enter your Email..." onChange={(e) =>{ setEmail(e.target.value)}}/>
						</FormGroup>
						<FormGroup>
							<FormLabel>Password:</FormLabel>
							<FormControl type="password" placeholder="Enter your Password..." onChange={(e) => { setPassword(e.target.value) }}/>
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
	)
}

export default Login