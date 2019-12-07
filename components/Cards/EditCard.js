import {Modal,
	Alert,
	Row,
	Col,
	ButtonGroup,
	Button,
	Card} from "react-bootstrap"
import React, { useState } from "react"
import LoadingButton from "../../components/Helpers/LoadingButton"
let CKEditor, BalloonEditor
if (typeof window !== "undefined") {
	CKEditor = require("@ckeditor/ckeditor5-react")
	BalloonEditor = require("@ckeditor/ckeditor5-build-balloon")
}
import Config from "../../lib/editor_init"

export class EditCard extends React.PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			front: this.props.data.front,
			back: this.props.data.back,
			side: "front",
			error: null,
			sending: false
		}

		this._handleSave = this._handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event, editor) {
		if (this.state.side === "front") {
			this.setState({
				front: editor.getData()
			})
		} else {
			this.setState({
				back: editor.getData()
			})
		}
	}

	async _handleSave() {
		if (this.state.front.trim() !== "" && this.state.back.trim() !== "") {
			this.setState({
				sending: true
			})
			try {
				this.setState({
					error: null
				})
				let response = await fetch("/api/cards/edit", {
					method: "POST",
					headers: {
						"authorization": "Bearer " + this.props.token
					},
					body: JSON.stringify({
						front: this.state.front,
						back: this.state.back,
						id: this.props.data.id
					})
				})

				if (!response.ok) throw new Error(response.statusText)

			} catch (err) {
				console.error(err)
				this.setState({
					error: err
				})
			} finally {
				this.setState({
					sending: false
				})
				this.props.toggleShow(false)
			}
		} else {
			this.setState({
				error: "Front or Back can not be empty."
			})
		}
	}

	render() {

		return (
			<Modal
				centered
				size="lg"
				show={this.props.show}
				onHide={() => this.props.toggleShow(false)}
				dialogClassName="modal-90w">
				<Modal.Header closeButton>
					<Modal.Title
						className="text-capitalize"
						id="example-custom-modal-styling-title">
						Editing{" "}
						<b className="text-capitalize">{this.props.data.title} </b>
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
							margin: "0 0 20px 0"
						}}
						className="justify-content-center">
						<ButtonGroup>
							<Button
								variant={this.state.side === "front" ? "primary" : "secondary"}
								size="sm"
								onClick={() => {
									this.setState({
										side: "front"
									})
								}}>
								Front
							</Button>
							<Button
								variant={this.state.side === "back" ? "primary" : "secondary"}
								size="sm"
								onClick={() => {
									this.setState({
										side: "back"
									})
								}}>
								Back
							</Button>
						</ButtonGroup>
					</Row>
					<Row
						style={{
							marginBottom: 30
						}}
						className="justify-content-center">
						<Col className="text-center">
							<Card
								className="mx-auto"
								style={{
									width: "18rem", height: "25rem"
								}}>
								<Card.Body style={{
									height: "100%"
								}}>
									<CKEditor
										editor={BalloonEditor}
										data={this.state.side === "front" ? this.state.front : this.state.back}
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
						}}>
						Save
					</LoadingButton>
				</Modal.Body>
			</Modal>
		)
	}
}
