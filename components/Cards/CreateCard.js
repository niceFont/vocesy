import { Modal, Card, Button, Row, Col, ButtonGroup } from "react-bootstrap"
import React, {useState} from "react"
import fetch from "isomorphic-fetch"

export const CreateCard = (props) => {


	const [front, editFront] = useState("")
	const [back, editBack] = useState("")
	const [side, switchSideTo] = useState("front")
	const textAreaRef = React.createRef()


	const handleSave = async () => {
		//TODO Add error message on empty String
		if (front !== "" && back !== "") {
			await fetch("/api/cards/create", {
				method: "POST",
				body: JSON.stringify({front, back, deck_id: props.data.deck_id})
			}).then(res => res.json())
				.catch(err => console.error(err))
		}
	}
	return (
		<Modal
			centered
			size="lg"
			show={props.show}
			onHide={() => props.toggleShow(false)}
			dialogClassName="modal-90w"
		>
			<Modal.Header closeButton>
				<Modal.Title >
					Add a new Card to <b className="text-capitalize">{props.data.title} </b>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body  >
				<Row style={{margin: "0 0 20px 0"}} className="justify-content-center">
                    
					<ButtonGroup>
						<Button variant={side === "front" ? "primary" : "secondary"} size="sm" onClick={() => {
							textAreaRef.current.value = front
							switchSideTo("front")
						}}>Front</Button>
						<Button variant={side === "back" ? "primary" : "secondary"} size="sm" onClick={() => {
							textAreaRef.current.value = back
							switchSideTo("back")
						}}>Back</Button>
					</ButtonGroup>
				</Row>
				<Row style={{marginBottom: 30}} className="justify-content-center">
					<Col className="text-center">
						<Card className="mx-auto" style={{width: "18rem", height: "25rem"}} >
							<Card.Body style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
								<textarea placeholder="Enter your Text..." ref={textAreaRef} className="my-auto" style={{ border: "none", resize: "none", height: "20rem" }} onChange={(e) => {
									if (side === "front") {
										editFront(e.target.value)
									} else {
										editBack(e.target.value)
									}
								}}></textarea> 
							</Card.Body>
						</Card>
					</Col>
                
				</Row>    
				<Button variant="dark" block onClick={() => handleSave()}>Save</Button>
			</Modal.Body>
		</Modal>
	)
}