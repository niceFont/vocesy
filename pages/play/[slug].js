import {Container, Row, Col} from "react-bootstrap"
import { PlayViewer} from "../../components/Player/PlayViewer"
import {useEffect, useState} from "react"
import {WithAuth} from "../../components/Auth/WithAuth"
import fetch from "isomorphic-fetch"
import {Loading} from "../../components/Helpers/Loading"
import {NotFound} from "../../components/Helpers/NotFound"
import Shuffle from "../../lib/shuffle"
import { PlayControl } from "../../components/Player/PlayControl"

const Play = WithAuth((props) => {

	const [data, setData] = useState([])
	const [fetched, setFetched] = useState(false)
	const [shuffled, setShuffled] = useState()
	const [current, goNext] = useState(0)
	const [userInput, pushInput] = useState([])
	const [done, toggleDone] = useState(false)

	useEffect(() => {
		async function fetchData() {
			let response = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				.then(res => res.json())
				.catch(err => console.error(err))

			if (response.length){
				setData(response)
				setShuffled(Shuffle(response))
			} 
			setFetched(true)
		}
            
		fetchData() 
	}, [])

	function _restart() {
		setShuffled(cards => Shuffle(cards))
		goNext(0)
		pushInput([])
		toggleDone(false)
	}

	console.log(props)
	return (

		<Container style={{marginTop: 200}}>
			{!fetched ? <Loading fetched={fetched}>
			</Loading>
				:
				<div>
					
					{data.length ?
						<React.Fragment>
							<PlayViewer
								done={done}
								max={shuffled.length}
								current={current + 1}
								userInput={userInput}
								data={shuffled[current]}>

							</PlayViewer>
							<PlayControl
								restart={_restart}
								done={done}
								toggleDone={toggleDone}
								pushInput={pushInput}
								current={current}
								max={shuffled.length}
								next={goNext}
								settings={props.settings}>
							</PlayControl>
						</React.Fragment>
						:
						<NotFound></NotFound>
					}		
				</div>
			}
		</Container>
	)
})


Play.getInitialProps = async function (ctx) {
	const slug = ctx.req.params[0].replace(/\/play\//gi, "")
	let settings = ctx.req.query

	if (!settings) {
		settings = {userValidation: "false"}
	}
	return {slug, settings}
}


export default Play


