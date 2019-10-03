import { Container, Row, Col, Card, Table } from "react-bootstrap"

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
									<th>Diffs</th>
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
											<td dangerouslySetInnerHTML={_setDiffs(result.diffs)}></td>
										</tr>
									)
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center">
					<Col md="6">
						<Card style={{
							height: "25rem" 
						}}>
							<Card.Header>
								<Card.Subtitle>Front</Card.Subtitle>
							</Card.Header>
							<Card.Body>
								<Card.Text>{props.data.front}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	)
}
