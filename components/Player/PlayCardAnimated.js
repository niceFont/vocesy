import { useSpring, animated } from "react-spring"
import { Card, Container } from "react-bootstrap"
import React, { useState } from "react"
import Renderer from "../Editor/Renderer"
import whyDidYouRerender from "@welldone-software/why-did-you-render"

whyDidYouRerender(React)

const PlayCardAnimated = props => {
	const [flipped, toggleFlipped] = useState(false)
	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
		config: {
			mass: 10,
			tension: 500,
			friction: 80,
		},
	})

	return (
		<Container
			id="toggler"
			style={{
				overflow: "hidden",
				margin: "25px 0 25px 0",
				position: "absolute",
				cursor: "pointer",
			}}
			onClick={() => {
				toggleFlipped(o => !o)
			}}
		>
			<div>
				<animated.div
					id="front"
					className="justify-content-center text-center"
					style={{
						visibility: opacity.interpolate(o => {
							if (o === 0.5) return flipped ? "hidden" : "visible"
						}),
						opacity: opacity.interpolate(o => 1 - o),
						transform,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Card
						className="mx-auto"
						style={{
							height: "22rem",
							width: "16em",
							position: "absolute",
						}}
					>
						<Card.Header>
							<Card.Subtitle>Front</Card.Subtitle>
						</Card.Header>
						<Card.Body style={{
							height: "15em" 
						}}>
							<Renderer data={props.data.front}></Renderer>
						</Card.Body>
					</Card>
				</animated.div>
				<animated.div
					id="back"
					style={{
						visibility: opacity.interpolate(o => (o ? "visible" : "hidden")),
						opacity,
						transform: transform.interpolate(t => `${t} rotateY(180deg)`),
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Card
						style={{
							height: "22rem",
							width: "16em",
						}}
					>
						<Card.Header>
							<Card.Subtitle>Back</Card.Subtitle>
						</Card.Header>
						<Card.Body style={{
							height: "10em" 
						}}>
							<Renderer data={props.data.back}></Renderer>
						</Card.Body>
					</Card>
				</animated.div>
			</div>
		</Container>
	)
}

PlayCardAnimated.whyDidYouRerender = true
export default PlayCardAnimated
