import { Container, Row, Col, Card, Table } from "react-bootstrap"
import { PlayCard } from "./PlayCard"
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useState } from "react"
export const PlayViewer = props => {


	function _setDiffs(diffs) {

		return {
			__html: diffs.inputDiff + "<span style='color: red'>" + diffs.lengthDiff.join("") + "</span>"
		}
	}

	function _generateResult(roundResult) {

		return roundResult.map((result, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{result.result ? "Right" : "Wrong"}</td>
					<td>{result.answer}</td>
					{props.settings.uv === "false" &&
						<td dangerouslySetInnerHTML={_setDiffs(result.diffs)}></td>
					}
				</tr>
			)
		})
	}
	// PlayCard backside is showing when its not on front
	return (
		<Container>
			<Row style={{
				margin: 20
			}}
			className="justify-content-center">
				<Col md="2" className="text-center">
					{!props.done ? 
						<span>{props.current + "/" + props.max}</span>
						:
						<span>Done</span>
					}
				</Col>
			</Row>
			{props.done ? (
				<Row>
					<Col className="text-center">
						<Table>
							<thead>
								<tr>
									<th>Number</th>
									<th>Result</th>
									<th>Answer</th>
									{props.settings.uv === "false" &&
									<th>Diffs</th>
									}
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
					<Col xs="10" sm="8" md="6" lg="4">
						{props.settings.uv === "false" ?
							<Card style={{
								height: "25em"
							}}>
								<Card.Header>Front</Card.Header>
								<Card.Body>
									<Card.Text>
										{props.data.front}
									</Card.Text>
								</Card.Body>
							</Card>
							:
							<div className="text-center">
								<span style={{
									color: "gray"
								}} ><FontAwesomeIcon icon={faInfoCircle} ></FontAwesomeIcon> Click the Card to see if you're right!</span>	
								<PlayCard toggleFlipped={props.toggleFlipped} flipped={props.flipped} data={props.data}></PlayCard>
							</div>
						}
					</Col>
				</Row>
			)}
		</Container>
	)
}
