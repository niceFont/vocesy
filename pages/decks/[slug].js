import { useEffect } from "react"
import {useState} from "react"
import {NotFound} from "../../components/NotFound"
import fetch from "isomorphic-fetch"
import {Loading} from "../../components/Loading"
import {WithAuth} from "../../components/WithAuth"


const Deck = WithAuth((props) => {

	//Authentification check
	const [exists, setExists] = useState(false)
	const [fetched, setFetched] = useState(false)
	//Database check


	useEffect(() => {
		const fetchData = async () => {

			let res = await fetch(`/api/decks?user=${props.user.displayName}&slug=${props.slug}`)
				.then(res => res.json())
				.catch(err => console.error(err))
			
			if (res.length) setExists(true)
			setFetched(true)
			return
		}
		fetchData()
	}, [])


	return (
		<div>
			{fetched ?
				<div>

					{exists ?
						<div>{props.slug}</div>
						: <NotFound></NotFound>}
				</div>
				:
				<Loading fetched={fetched}></Loading>
			}	
		</div>
	)
})

export default Deck


Deck.getInitialProps = async function (ctx) {
	let slug = ctx.req.params[0].replace(/\/decks\//gi, "")
	return {slug}
}