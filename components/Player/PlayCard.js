import { Card } from "react-bootstrap"
import Renderer from "../../components/Editor/Renderer"
import React from "react"

const PlayCard = props => {
	return (
		<Card
			style={{
				position: "absolute",
				height: "22em",
				width: "16em",
			}}>
			<Card.Header>Front</Card.Header>
			<Card.Body
				style={{
					overflow: "auto",
				}}
				className="text-center">
				<Renderer data={props.data}></Renderer>
			</Card.Body>
		</Card>
	)
}

export default PlayCard
