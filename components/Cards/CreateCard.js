import {Modal,
	Alert,
	Card,
	Button,
	Row,
	Col,
	ButtonGroup,} from "react-bootstrap"
import React from "react"
import fetch from "isomorphic-fetch"
import LoadingButton from "../../components/Helpers/LoadingButton"
import { CheckIfEditorEmpty } from "../../lib/utils"
import { ExtractRawText } from "../../lib/utils"
let CKEditor, BalloonEditor
if (typeof window !== "undefined") {
	CKEditor = require("@ckeditor/ckeditor5-react")
	BalloonEditor = require("@ckeditor/ckeditor5-build-balloon")
}
import Config from "../../lib/editor_init"

export class CreateCard extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			front: "",
			back: "",
			side: "front",
			sending: false,
			error: null,
			charCount: 0,
			charLimit: 100,
		}

		this._handleSave = this._handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	async _handleSave() {
		if (
			!CheckIfEditorEmpty(this.state.front) &&
      !CheckIfEditorEmpty(this.state.back)
		) {
			this.setState({
				sending: true,
			})
			try {
				this.setState({
					error: null,
				})
				let response = await fetch("/api/cards/create", {
					method: "POST",
					headers: {
						authorization: "Bearer " + this.props.token,
					},
					body: JSON.stringify({
						front: this.state.front,
						back: this.state.back,
						deckId: this.props.data.deck_id,
					}),
				})
				if (!response.ok) throw new Error(response.statusText)
			} catch (err) {
				console.error(err)
			} finally {
				this.setState({
					sending: false,
				})
				this.props.toggleShow(false)
			}
		} else {
			this.setState({
				error: "Front or Back can not be empty.",
			})
		}
	}

	handleChange(event, editor) {
		let data = editor.getData()
		this.setState({
			charCount: ExtractRawText(data).length 
		})

		if (this.state.charCount > this.state.charLimit) {
			this.setState({
				error: "Only a Maximum of 100 Characters allowed." 
			})
			editor.setData(this.state.front)
		} else {
			this.setState({
				error: null 
			})
			if (this.state.side === "front") {
				this.setState({
					front: data,
				})
			} else {
				this.setState({
					back: data,
				})
			}
		}
	}

	render() {
		return (
			<Modal
				centered
				size="lg"
				show={this.props.show}
				onHide={() => this.props.toggleShow(false)}
				dialogClassName="modal-90w"
			>
				<Modal.Header closeButton>
					<Modal.Title>
            Add a new Card to
						<b className="text-capitalize">{" " + this.props.data.title} </b>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.error && (
						<Row className="justify-content-center">
							<Alert variant="danger">{this.state.error}</Alert>
						</Row>
					)}
					<Row
						style={{
							margin: "0 0 20px 0",
						}}
						className="justify-content-center"
					>
						<ButtonGroup>
							<Button
								variant={this.state.side === "front" ? "primary" : "secondary"}
								size="sm"
								onClick={() => {
									this.setState({
										side: "front",
									})
								}}
							>
                Front
							</Button>
							<Button
								variant={this.state.side === "back" ? "primary" : "secondary"}
								size="sm"
								onClick={() => {
									this.setState({
										side: "back",
									})
								}}
							>
                Back
							</Button>
						</ButtonGroup>
					</Row>
					<Row
						style={{
							marginBottom: 30,
						}}
						className="justify-content-center"
					>
						<Col className="text-center">
							<Card
								className="mx-auto"
								style={{
									width: "18rem",
									height: "25rem",
								}}
							>
								<Card.Body style={{
									height: "100%" 
								}}>
									<CKEditor
										editor={BalloonEditor}
										data={
											this.state.side === "front"
												? this.state.front
												: this.state.back
										}
										onChange={this.handleChange}
										config={Config}
									></CKEditor>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<LoadingButton
						disabled={this.state.sending}
						variant="dark"
						block
						onClick={() => {
							this._handleSave()
						}}
					>
            Save
					</LoadingButton>
				</Modal.Body>
			</Modal>
		)
	}
}
