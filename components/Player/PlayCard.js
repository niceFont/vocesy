import { useSpring, animated } from "react-spring"
import { Card, Container } from "react-bootstrap"
import { useState } from "react"

export const PlayCard = (props) => {

	const [flipped, set] = useState(false)
	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
		config: {
			mass: 15, tension: 800, friction: 80 
		}
	})

	return (
        
		<Container style={{
			overflow: "hidden"
		}} onClick={()=> set(state => !state)}>
			<animated.div className="justify-content-center text-center" style={{
				opacity: opacity.interpolate(o => 1 - o), transform,
				display: "flex",
				justifyContent: "center"
			}} >
				<Card className="mx-auto" style={{
					height: "25rem",
					width: "18em",
					position: "absolute"
				}}>
					<Card.Header>
						<Card.Subtitle>Front</Card.Subtitle>
					</Card.Header>
					<Card.Body>
						<Card.Text>{props.data.front}</Card.Text>
					</Card.Body>
				</Card>
			</animated.div>
			<animated.div style={{
				 opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`),  
				display: "flex",
				justifyContent: "center"
			}}>
				<Card style={{
					height: "25rem", 
					width: "18em",
				}}>
					<Card.Header>
						<Card.Subtitle>Back</Card.Subtitle>
					</Card.Header>
					<Card.Body>
						<Card.Text>{props.data.back}</Card.Text>
					</Card.Body>
				</Card>
			</animated.div> 
		</Container>
	)
}