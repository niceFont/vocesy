import { Container, Row, Col, Table } from "react-bootstrap"
import PlayCardAnimated from "./PlayCardAnimated"
import PlayCard from "./PlayCard"
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTransition, animated } from "react-spring"
import React from "react"
import { ExtractRawText } from "../../lib/utils"

export const PlayViewer = props => {
	const pages = props.data.map(card => (
		<PlayCard data={card.front}></PlayCard>
	))

	const uvPages = props.data.map(card => (
		<PlayCardAnimated data={card}></PlayCardAnimated>
	))
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
			let rawFront = ExtractRawText(result.front)
			let rawBack = ExtractRawText(result.back)
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{result.result ? "Right" : "Wrong"}</td>
					<td>
						{`${rawFront.slice(0, 15)}${rawFront.length >= 15
							? "..."
							: ""}`}
					</td>
					<td>
						{`${rawBack.slice(0, 15)}${rawBack.length >= 15
							? "..."
							: ""}`}
					</td>
					{props.settings.uv === "false" && (
						<td
							dangerouslySetInnerHTML={_setDiffs(result.diffs)}></td>
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
				className="justify-content-center">
				<Col md="6" className="text-center">
					{!props.done ? (
						<span>{props.current + "/" + props.max}</span>
					) : (
						<span>
							<FontAwesomeIcon
								style={{
									color: "seagreen",
								}}
								icon={faCheckCircle}></FontAwesomeIcon>{" "}
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
									{props.settings.uv === "false" && (
										<th>Diffs</th>
									)}
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
							{transitions.map(({ item, props: style, key }) => {
								const Page = pages[item]
								return (
									<animated.div
										key={key}
										style={{
											...style,
											display: "flex",
											justifyContent: "center",
										}}>
										{Page}
									</animated.div>
								)
							})}
						</Col>
					) : (
						<div className="text-center">
							<span
								style={{
									color: "gray",
								}}>
								<FontAwesomeIcon
									icon={faInfoCircle}></FontAwesomeIcon>{" "}
										Click the Card to see if you're right!
							</span>
							{transitions.map(({ item, props: style, key }) => {
								const Page = uvPages[item]
								return (
									<animated.div style={style} key={key}>
										{Page}
									</animated.div>
								)
							})}
						</div>
					)}
				</Row>
			)}
		</Container>
	)
}
