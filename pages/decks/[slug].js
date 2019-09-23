import { Layout } from "../../components/Layout"
import { useEffect } from "react"
import {useAuth0} from "../../components/Auth0wrapper"
import {useState} from "react"
import {NotFound} from "../../components/NotFound"

async function checkIfExists(user, slug) {
	let res = await fetch(`/api/decks?user=${user.name}&slug=${slug}`)
	let exists = await res.json()
	return exists.length > 0
}



const Deck = (props) => {

	//Authentification check
	const {user, isAuthenticated} = useAuth0()
	const [exists, setExists] = useState(false)
	//Database check


	useEffect(() => {

		if (typeof window !== "undefined" && user) {
			if (!isAuthenticated) {
				window.location.replace("http://localhost:3000/")
			}
			
			checkIfExists(user, props.slug).then(exists => {
				if (!exists) {
					return
				}
				setExists(true)
				return
			}).catch(err => console.error(err))
		}
	}, [user, isAuthenticated])


	return (
		<Layout>
			{exists ?
				<div>{props.slug}</div>
				:
				<NotFound></NotFound>}
		</Layout>
	)
}

export default Deck


Deck.getInitialProps = async function (ctx) {
    
	return ctx.query 
}