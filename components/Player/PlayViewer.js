import { Container, Row, Col, Card, Table } from "react-bootstrap"
import { PlayCard } from "./PlayCard"
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTransition, animated } from "react-spring"
import React, { useCallback } from "react"

export const PlayViewer = React.memo(props => {
	const pages = props.data.map(card =>
		useCallback(({ style }) => {
			return (
				<animated.div
					style={{
						...style,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Card
						style={{
							position: "absolute",
							height: "22em",
							width: "16em",
						}}
					>
						<Card.Header>Front</Card.Header>
						<Card.Body className="text-center">
							<Card.Text>{card.front}</Card.Text>
						</Card.Body>
					</Card>
				</animated.div>
			)
		},
		[card]))

	const uvPages = props.data.map(card =>
		useCallback(({ style }) => {
			return (
				<animated.div style={style}>
					<PlayCard
						data={card}
					></PlayCard>
				</animated.div>
			)
		},
		[card]))
	const transitions = useTransition(props.current - 1, p => p, {
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

	function _setDiffs(diffs) {
		return {
			__html:
        diffs.inputDiff +
        "<span style='color: red'>" +
        diffs.lengthDiff.join("") +
        "</span>",
		}
	}

	function _generateResult(roundResult) {
		return roundResult.map((result, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{result.result ? "Right" : "Wrong"}</td>
					<td>{result.front}</td>
					<td>{result.back}</td>
					{props.settings.uv === "false" && (
						<td dangerouslySetInnerHTML={_setDiffs(result.diffs)}></td>
					)}
				</tr>
			)
		})
	}
	return (
		<Container>
			<Row
				style={{
					margin: 20,
				}}
				className="justify-content-center"
			>
				<Col md="6" className="text-center">
					{!props.done ? (
						<span>{props.current + "/" + props.max}</span>
					) : (
						<span>
							<FontAwesomeIcon
								style={{
									color: "seagreen" 
								}}
								icon={faCheckCircle}
							></FontAwesomeIcon>{" "}
              Complete
						</span>
					)}
				</Col>
			</Row>
			{props.done ? (
				<Row className="justify-content-center">
					<Col xs="10" className="text-center">
						<Table striped size="sm" responsive>
							<thead>
								<tr>
									<th>Number</th>
									<th>Result</th>
									<th>Front</th>
									<th>Back</th>
									{props.settings.uv === "false" && <th>Diffs</th>}
								</tr>
							</thead>
							<tbody>
								{(() => {
									let result = props.verifyResult()
									props.sendStats(result)
									return _generateResult(result)
								})()}
							</tbody>
						</Table>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center">
					{props.settings.uv === "false" ? (
						<Col xs="10" sm="8" md="6" lg="4">
							{transitions.map(({ item, props, key }) => {
								const Page = pages[item]
								return <Page key={key} style={props}></Page>
							})}
						</Col>
					) : (
						<div className="text-center">
							<span
								style={{
									color: "gray",
								}}
							>
								<FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Click
                the Card to see if you're right!
							</span>
							{transitions.map(({ item, props: styles, key }) => {
								const Page = uvPages[item]
								return (
									<Page
										style={styles}
										key={key}
									></Page>
								)
							})}
						</div>
					)}
				</Row>
			)}
		</Container>
	)
})
