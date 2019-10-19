import { Container, Row, Col, Card, Table } from "react-bootstrap"
import { PlayCard } from "./PlayCard"
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
export const PlayViewer = props => {

	function _setDiffs(diffs) {

		return {
			__html: diffs.inputDiff + "<span style='color: red'>" + diffs.lengthDiff.join("") + "</span>"
		}
	}


	return (
		<Container>
			<Row
				style={{
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

								{props.verify().map((result, index) => {
									console.log(result)
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
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center">
					<Col md="6" lg="4">
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
								<PlayCard data={props.data}></PlayCard>
							</div>
						}
					</Col>
				</Row>
			)}
		</Container>
	)
}
