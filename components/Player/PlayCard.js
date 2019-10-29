import { useSpring, animated } from "react-spring"
import { Card, Container } from "react-bootstrap"

export const PlayCard = (props) => {

	const { transform, opacity } = useSpring({
		opacity: props.flipped ? 1 : 0,
		transform: `perspective(600px) rotateY(${props.flipped ? 180 : 0}deg)`,
		config: {
			mass: 15, tension: 800, friction: 80 
		}
	})

	return (
        
		<Container style={{
			overflow: "hidden",
			padding: "25px 0 25px 0",
			cursor: "pointer"
		}} onClick={()=> props.toggleFlipped(o => !o)}>
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