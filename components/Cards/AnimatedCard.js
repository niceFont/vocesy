import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSpring, animated } from "react-spring"
import { Card, Container, Row, Col } from "react-bootstrap"

export const AnimatedCard = (props) => {

	const [animatedProps, set] = useSpring(() => ({
		opacity: 1,
		s: 1
	}))

	return (
        
		<animated.div style={animatedProps} onMouseMove={() => set({
			opacity: .5,
			s: 1.5
		})} onMouseLeave={() => set({
			opacity: 1,
			s: 1
		})}>
			<Card
													
				style={{
					cursor: "pointer",
					margin:"10px 10px 10px 10px",
					willChange: "transform",
					width: "15rem",
					height: "20rem"
				}}>
				<Container>
					<Row>
						<Col style={{
							padding: "7px 3px 0 3px"
						}} className="text-right">
							<span
								style={{
									margin: 10
								}}
								onClick={e => {
									e.stopPropagation()
									if (confirm("Are you sure you want to delete this Card?")) {
										props._removeCard(props.cards.id)
										props.toggleRemove(true)
									}
								}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></span>
						</Col>
					</Row>
				</Container>
				<Card.Body
					onClick={() => {
						props.setEditID(props.cards.id)
						props.toggleEditing(true)
					}}
					className="align-middle"
					style={{
						padding: "10px 5px 10px 5px"
					}}>
					<Card.Text className="text-center">
						{props.cards.front}
					</Card.Text>
				</Card.Body>
			</Card>
		</animated.div>
	)
}