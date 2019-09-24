import { useEffect } from "react"
import {useState} from "react"
import {NotFound} from "../../components/NotFound"
import fetch from "isomorphic-fetch"

async function checkIfExists(user, slug) {
	let res = await fetch(`/api/decks?user=${user.displayName}&slug=${slug}`)
	let exists = await res.json()
	return exists.length > 0
}



const Deck = (props) => {

	//Authentification check
	const [exists, setExists] = useState(false)
	//Database check


	useEffect(() => {
		checkIfExists(props.user, props.slug).then(exists => {
			if (!exists) {
				return
			}
			setExists(true)
			return
		}).catch(err => console.error(err))
	}, [exists])


	return (
		<div>
			{exists ? 
				<div>{props.slug}</div>
				: <NotFound></NotFound>}
		</div>
	)
}

export default Deck


Deck.getInitialProps = async function (ctx) {
	let slug = ctx.req.params[0].replace(/\/decks\//gi, "")
	return {slug}
}