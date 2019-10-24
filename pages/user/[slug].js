import {Container, Row, Col, Dropdown, DropdownButton} from "react-bootstrap"
import { useEffect, useState } from "react"
import {Loading} from "../../components/Helpers/Loading"
import {NotFound} from "../../components/Helpers/NotFound"
import {HorizontalGridLines, VerticalGridLines, XAxis, XYPlot, YAxis, LineMarkSeries} from "react-vis"



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
		uniqueDeckTitles.push(decks[0])
		for (let title of decks) {
			for (let uqtitle of uniqueDeckTitles) {
				if(title !== uqtitle) uniqueDeckTitles.push(title)
			}
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

	return (
		<Container style={{
			marginTop: 200
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
							<NotFound></NotFound>
						</Col>
					</Row>
						:
						<React.Fragment>
							<Row>
								<Col className="text-right">
									<DropdownButton alignRight id="dropdown-basic-button" title={selected}>
										{getUniqueTitles(decks).map((deck, index) => {
											return (
												<Dropdown.Item key={index} onClick={() => setSelected(deck)}>{deck}</Dropdown.Item>
											)
										})}
									</DropdownButton>
								</Col>
							</Row>
							<Row className="justify-content-center">
								<Col xs="10" sm="10" md="8" lg="6">
									<h6>{props.slug + "s Profile"}</h6>
									<XYPlot width={400} height={300}>
										<XAxis title="rounds"></XAxis>
										<YAxis title="performance in %"></YAxis>
										<HorizontalGridLines></HorizontalGridLines>
										<VerticalGridLines></VerticalGridLines>
										<LineMarkSeries color="green" data={_convertToCoords()}></LineMarkSeries>
									</XYPlot>
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