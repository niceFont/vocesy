import {Container, Row, Col, Dropdown, DropdownButton} from "react-bootstrap"
import { useEffect, useState } from "react"
import {Loading} from "../../components/Helpers/Loading"
import {NotFound} from "../../components/Helpers/NotFound"
import {FlexibleXYPlot, HorizontalGridLines, VerticalGridLines, XAxis, XYPlot, YAxis, LineMarkSeries, Highlight, Hint} from "react-vis"
import { faChartArea} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



const User = (props) => {

	const [stats, setStats] = useState([])
	const [fetched, toggleFetched] = useState(false)
	const [selected, setSelected] = useState()
	const [decks, setDecks] = useState()

	useEffect(() => {
		async function fetchStats() {
			try {

				let response = await fetch(`/api/stats?username=${props.slug}`)
				if(!response.ok) throw new Error(response.statusText)

				let userStats = await response.json()

				if (userStats.length) {
					setStats(userStats)
					let deckTitles = userStats.map(stat => stat.title)
					setDecks(deckTitles)
					setSelected(deckTitles[0])
				}
				toggleFetched(true)
				
			} catch (error) {
				console.error(error)
			} 

		}

		fetchStats()
	}, [ props.slug]) 
	
	function getUniqueTitles() {
		let uniqueDeckTitles = []
		for (let title of decks) {
			if(!uniqueDeckTitles.includes(title)) uniqueDeckTitles.push(title)
		}
		return uniqueDeckTitles
	}

	function _convertToCoords() {


		return stats.filter(stat => stat.title === selected).map((stat, x) => {
			return {
				x, y: stat.performance
			}
		})
	}

	function _generateTicks() {
		return new Array(11).fill(0).map((x, index) => index * 10)
	}
	console.log(stats)
	return (
		<Container style={{
			marginTop: 200,
			marginBottom: 200
		}}>
			{!fetched ? 
				<Row>
					<Col>
						<Loading fetched={fetched}></Loading>
					</Col>
				</Row>
				:
				<React.Fragment>
					{!stats.length ? <Row>
						<Col>
							<div>
								Either user doesn't exist or needs to play atleast once for stats to show... 
							</div>
						</Col>
					</Row>
						:
						<React.Fragment>
							<Row style={{
								margin: "0 10px 0 10px",
								borderBottom: "1px solid lightgray"
							}}>
								<Col>
									<h3 className="text-capitalize"><FontAwesomeIcon icon={faChartArea}></FontAwesomeIcon>{" " +props.slug + "s performance"}</h3>
								</Col>
							</Row>
							<Row style={{
								marginTop: 50
							}} className="justify-content-center">
								<Col style={{
									display: "flex", alignItems: "center"
								}} lg="4" md="4" sm="6" xs="6">
									<span >Overall Deck Performance</span>
								</Col>
								<Col lg="2" md="4" sm="4" xs="4" className="text-right">
									<DropdownButton variant="light" alignRight id="dropdown-basic-button" title={selected}>
										{getUniqueTitles(decks).map((deck, index) => {
											return (
												<Dropdown.Item key={index} onClick={() => setSelected(deck)}>{deck}</Dropdown.Item>
											)
										})}
									</DropdownButton>
								</Col>
							</Row>
							<Row style={{
								marginTop: 20
							}} className="justify-content-center">
								<Col style={{
									height: 300
								}} xs="10" sm="10" md="8" lg="6">
									<FlexibleXYPlot>
										<XAxis title="rounds"></XAxis>
										<YAxis tickValues={_generateTicks()} title="performance in %"></YAxis>
										<HorizontalGridLines></HorizontalGridLines>
										<VerticalGridLines></VerticalGridLines>
										<LineMarkSeries animation="gentle" color="#000000" data={_convertToCoords()}></LineMarkSeries>
									</FlexibleXYPlot>
								</Col>
							</Row>

						</React.Fragment>
						
					}
				</React.Fragment>
			}
		</Container>
	)
}

User.getInitialProps = async (ctx) => {

	const {slug} = ctx.query

	return {
		slug
	}

}

export default User