import { Jumbotron, Row, Col, Container, Button } from "react-bootstrap"
import React, { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { Card } from "react-bootstrap"
import { useTransition, animated } from "react-spring"
import {
	FlexibleXYPlot,
	HorizontalGridLines,
	VerticalGridLines,
	XAxis,
	YAxis,
	LineMarkSeries,
} from "react-vis"
import dynamic from "next/dynamic"
let BalloonEditor
if (typeof window !== "undefined") {
	BalloonEditor = require("@ckeditor/ckeditor5-build-balloon")
}
const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react"), {
	ssr: false,
})
import Config from "../lib/editor_init"
import WhiteContainer from "../components/Helpers/WhiteContainer"

const ExampleCard = ({ card }) => {
	return (
		<Card
			style={{
				position: "absolute",
				width: "10em",
				height: "15em",
				right: "50px",
				boxShadow:
					"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
			}}>
			<Card.Body>
				<Card.Text>{card}</Card.Text>
			</Card.Body>
		</Card>
	)
}

const Index = () => {
	const cards = ["This", "is", "an", "example"].map(card => (
		<ExampleCard card={card}></ExampleCard>
	))

	const scrollRef = useRef()
	const [current, setCurrent] = useState(0)
	const [points, setPoints] = useState([{ x: 0, y: 0 }])
	const [input, setInput] = useState("<b>Select me : )</b>")

	const transitions = useTransition(current % cards.length, p => p, {
		from: {
			opacity: 0,
			transform: "translate3d(100%,0,0)",
		},
		enter: {
			opacity: 1,
			transform: "translate3d(0%,0,0)",
		},
		leave: {
			opacity: 0,
			transform: "translate3d(-50%,0,0)",
		},
	})

	useEffect(() => {
		setInterval(() => {
			setCurrent(curr => curr + (1 % cards.length))
			setPoints(oldp => {
				if (oldp.length > 6) {
					return [{ x: 0, y: 0 }]
				}
				return [
					...oldp,
					{
						x: oldp[oldp.length - 1].x + 1,
						y: oldp[oldp.length - 1].y + 1,
					},
				]
			})
		}, 2500)
	}, [])

	const handleChange = useCallback((event, editor) => {
		setInput(editor.getData())
	})

	return (
		<React.Fragment>
			<div
				style={{
					width: "100%",
					height: "95vh",
					background: "url('/static/background1.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}>
				<Row>
					<Col sm="8" md="8" lg="6" xs="10">
						<div
							style={{
								margin: "25% 0 0 20%",
								width: "100%",
								color: "white",
							}}>
							<h3
								style={{
									fontSize: "3em",
								}}>
								Welcome to Vocesy
							</h3>
							<h5>
								Where traditional learning meets modern
								solutions
							</h5>
							<Button
								onClick={() =>
									scrollRef.current.scrollIntoView({
										behavior: "smooth",
										block: "start",
										inline: "nearest",
									})
								}
								style={{
									fontWeight: 800,
								}}
								size="lg"
								variant="light">
								Learn More
							</Button>
							<Link href="/decks">
								<Button
									style={{
										fontWeight: 800,
									}}
									size="lg"
									variant="info" as="a">
									Get Started
								</Button>
							</Link>
						</div>
					</Col>
				</Row>
			</div>
			<WhiteContainer
				ref={scrollRef}
				style={{
					marginTop: 10,
					marginBottom: 100,
					padding: "150px 50px",
					minHeight: "90vh",
				}}>
				<Container>
					<Row
						style={{ minHeight: 300 }}
						className="justify-content-center">
						<Col
							md="6"
							lg="4"
							style={{ borderBottom: "5px dotted #5be2f8" }}>
							<div
								style={{
									height: 100,
									width: 200,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: "url('/static/HeadBlue.png')",
									backgroundSize: "200px 100px",
									backgroundPosition: "0px 0px",
									backgroundRepeat: "no-repeat",
								}}>
								<h3
									style={{
										fontWeight: "bold",
									}}>
									Create
								</h3>
							</div>
							<p
								style={{
									color: "grey",
									fontWeight: "bold",
								}}>
								Create new cards and start learning about things
								you're interested in.
							</p>
						</Col>
						<Col
							md="6"
							lg="4"
							style={{ minHeight: "18em", padding: 20 }}>
							{transitions.map(({ item, props: styles, key }) => {
								return (
									<animated.div style={styles} key={key}>
										{cards[item]}
									</animated.div>
								)
							})}
						</Col>
					</Row>
					<Row
						className="justify-content-center"
						style={{ minHeight: 300, marginTop: 200 }}>
						<Col
							md="6"
							lg="4"
							style={{ borderBottom: "5px dotted #ffa922" }}>
							>
							<div
								style={{
									height: 100,
									width: 200,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: "url('/static/HeadYellow.png')",
									backgroundSize: "200px 100px",
									backgroundPosition: "0px 0px",
									backgroundRepeat: "no-repeat",
								}}>
								<h3
									style={{
										fontWeight: "bold",
									}}>
									Customize
								</h3>
							</div>
							<p>
								Customize your cards to fit your needs and make
								it easier to remember them.
							</p>
						</Col>
						<Col md="6" lg="4" style={{ padding: 20 }}>
							<Card
								className="mx-auto"
								style={{
									width: "10em",
									height: "15em",
									boxShadow:
										"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
								}}>
								<Card.Body
									style={{
										overflow: "auto",
									}}>
									<CKEditor
										editor={BalloonEditor}
										data={input}
										onChange={handleChange}
										config={Config}></CKEditor>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row
						className="justify-content-center"
						style={{ minHeight: 300, marginTop: 200 }}>
						<Col
							md="6"
							lg="4"
							style={{ borderBottom: "5px dotted #fe4c62" }}>
							<div
								style={{
									height: 100,
									width: 200,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									background: "url('/static/HeadRed.png')",
									backgroundSize: "200px 100px",
									backgroundPosition: "0px 0px",
									backgroundRepeat: "no-repeat",
								}}>
								<h3
									style={{
										fontWeight: "bold",
									}}>
									Improve
								</h3>
							</div>
							<p>
								See your progress and improve over time by
								practicing continuously.
							</p>
						</Col>
						<Col md="6" lg="4" style={{ padding: 20 }}>
							<FlexibleXYPlot xDomain={[0, 6]} yDomain={[0, 6]}>
								<XAxis
									title="rounds"
									tickValues={[1, 2, 3, 4, 5, 6]}
									tickTotal={6}></XAxis>
								<YAxis
									tickValues={[1, 2, 3, 4, 5, 6]}
									tickTotal={6}
									title="performance in %"></YAxis>
								<HorizontalGridLines></HorizontalGridLines>
								<VerticalGridLines></VerticalGridLines>
								<LineMarkSeries
									animation="gentle"
									color="#000000"
									data={points}></LineMarkSeries>
							</FlexibleXYPlot>
						</Col>
					</Row>
				</Container>
			</WhiteContainer>
		</React.Fragment>
	)
}

export default Index
