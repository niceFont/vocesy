import { Container } from "react-bootstrap"
import { PlayViewer } from "../../components/Player/PlayViewer"
import React, { useEffect, useState } from "react"
import { WithAuth } from "../../components/Auth/WithAuth"
import fetch from "isomorphic-fetch"
import { Loading } from "../../components/Helpers/Loading"
import { NotFound } from "../../components/Helpers/NotFound"
import {Shuffle} from "../../lib/utils"
import { PlayControl } from "../../components/Player/PlayControl"
import {CheckResult, ReturnDiffs} from "../../lib/utils"

const Play = WithAuth(props => {
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

			if (response.length) {
				setData(response)
				setShuffled(Shuffle(response))
			}
			setFetched(true)
		}

		fetchData()
	}, [props.slug, props.user.displayName])

	function _restart() {
		setShuffled(cards => Shuffle(cards))
		goNext(0)
		pushInput([])
		toggleDone(false)
	}

	function _verifyResult() {
		return userInput.map((input, index) => {

			if (props.settings.uv === "false") {
				
				return {
					result: CheckResult(input, shuffled[index].back),
					answer: shuffled[index].back,
					diffs: ReturnDiffs(input, shuffled[index].back)
				}
			} else {
				return {
					result: input,
					answer: shuffled[index].back,
					diffs: null
				}
			}

		})
	}

	return (
		<Container style={{
			marginTop: 200 
		}}>
			{!fetched ? (
				<Loading fetched={fetched}></Loading>
			) : (
				<div>
					{data.length ? (
						<React.Fragment>
							<PlayViewer
								done={done}
								max={shuffled.length}
								current={current + 1}
								userInput={userInput}
								verify={_verifyResult}
								settings={props.settings}
								data={shuffled[current]}></PlayViewer>
							<PlayControl
								restart={_restart}
								done={done}
								toggleDone={toggleDone}
								pushInput={pushInput}
								current={current}
								max={shuffled.length}
								next={goNext}
								settings={props.settings}></PlayControl>
						</React.Fragment>
					) : (
						<NotFound></NotFound>
					)}
				</div>
			)}
		</Container>
	)
})

Play.getInitialProps = async function(ctx) {
	let {slug} = ctx.query
	let settings = ctx.req.query

	if (!settings) {
		settings = {
			userValidation: "false" 
		}
	}
	return {
		slug, settings 
	}
}

export default Play
