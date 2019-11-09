<<<<<<< HEAD
import { Container, Row, Col, Button} from "react-bootstrap"
=======
import { Container, Button } from "react-bootstrap"
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { PlayViewer } from "../../components/Player/PlayViewer"
import React, { useEffect, useState } from "react"
import { WithAuth } from "../../components/Auth/WithAuth"
import fetch from "isomorphic-fetch"
import { Loading } from "../../components/Helpers/Loading"
import { NotFound } from "../../components/Helpers/NotFound"
<<<<<<< HEAD
import {Shuffle} from "../../lib/utils"
import { PlayControl } from "../../components/Player/PlayControl"
import {CheckResult, ReturnDiffs} from "../../lib/utils"
=======
import { Shuffle } from "../../lib/utils"
import { PlayControl } from "../../components/Player/PlayControl"
import { CheckResult, ReturnDiffs } from "../../lib/utils"
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
import Link from "next/link"

const Play = WithAuth(props => {
	const [data, setData] = useState([])
	const [fetched, setFetched] = useState(false)
	const [shuffled, setShuffled] = useState()
	const [current, goNext] = useState(0)
	const [userInput, pushInput] = useState([])
	const [done, toggleDone] = useState(false)
<<<<<<< HEAD
	const [flipped, toggleFlipped] = useState(false)
=======
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own

	useEffect(() => {
		async function fetchCards() {
			try {
<<<<<<< HEAD
				
				let response = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				if(!response.ok) throw new Error(response.statusText)
=======
				let response = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				if (!response.ok) throw new Error(response.statusText)
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
				let cards = await response.json()
				if (cards.length) {
					setData(cards)
					setShuffled(Shuffle(cards))
				}
				setFetched(true)
			} catch (err) {
				console.error(err)
			}
		}
		fetchCards()
	}, [props.slug, props.user.displayName])

	function _restart() {
		setShuffled(cards => Shuffle(cards))
		goNext(0)
		pushInput([])
		toggleDone(false)
	}

	async function _sendStats(roundResult) {
		try {
			let results = roundResult.map(x => x.result.toString())
			let response = await fetch("/api/stats/submit", {
				headers: {
<<<<<<< HEAD
					"authorization": "Bearer " + props.token
				},
				method: "POST",
				body: JSON.stringify({
					roundResult: results, deckId: data[0].deck_id
				})
			})

			if(!response.ok) throw new Error(response.statusText)
=======
					authorization: "Bearer " + props.token,
				},
				method: "POST",
				body: JSON.stringify({
					roundResult: results,
					deckId: data[0].deck_id,
				}),
			})

			if (!response.ok) throw new Error(response.statusText)
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
		} catch (err) {
			console.error(err)
		}
	}

	function _verifyResult() {
		return userInput.map((input, index) => {
<<<<<<< HEAD

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
			marginTop: 150 
		}}>
=======
			if (props.settings.uv === "false") {
				return {
					result: CheckResult(input, shuffled[index].back),
					front: shuffled[index].front,
					back: shuffled[index].back,
					diffs: ReturnDiffs(input, shuffled[index].back),
				}
			} else {
				return {
					result: input,
					front: shuffled[index].front,
					back: shuffled[index].back,
					diffs: null,
				}
			}
		})
	}

	return (
		<Container
			style={{
				marginTop: 100,
			}}
		>
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
			{!fetched ? (
				<Loading fetched={fetched}></Loading>
			) : (
				<div>
					<Link href={`/decks/${props.slug}`}>
<<<<<<< HEAD
						<Button variant="outline-dark" style={{
							marginTop: 0
						}}>
=======
						<Button
							variant="outline-dark"
							style={{
								marginTop: 0,
							}}
						>
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
							<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
						</Button>
					</Link>
					{data.length ? (
						<React.Fragment>
							<PlayViewer
<<<<<<< HEAD
								flipped={flipped}
								toggleFlipped={toggleFlipped}
=======
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
								done={done}
								max={shuffled.length}
								current={current + 1}
								userInput={userInput}
								verifyResult={_verifyResult}
								settings={props.settings}
								sendStats={_sendStats}
<<<<<<< HEAD
								data={shuffled}></PlayViewer>
							<PlayControl
								restart={_restart}
								flipped={flipped}
								toggleFlipped={toggleFlipped}
=======
								data={shuffled}
							></PlayViewer>
							<PlayControl
								restart={_restart}
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
								done={done}
								toggleDone={toggleDone}
								pushInput={pushInput}
								current={current}
								max={shuffled.length}
								next={goNext}
<<<<<<< HEAD
								settings={props.settings}></PlayControl>
=======
								settings={props.settings}
							></PlayControl>
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
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
<<<<<<< HEAD
	let {slug} = ctx.query
=======
	let { slug } = ctx.query
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
	let settings = ctx.query

	if (!settings) {
		settings = {
<<<<<<< HEAD
			userValidation: "false" 
		}
	}
	return {
		slug, settings 
=======
			userValidation: "false",
		}
	}
	return {
		slug,
		settings,
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
	}
}

export default Play
