import escape from "sql-template-strings"
import db from "../../../lib/db"
import { CheckForValues, CalcPerformance } from "../../../lib/utils"
import {apiWithAuth} from "../../../lib/middlewares"


export default apiWithAuth( async (req, res) => {
	if (req.method === "POST") {
		try {
			let {roundResult, deckId} = JSON.parse(req.body)
			CheckForValues([...roundResult, deckId])
			let prevPerformance = await db.query(escape`
                SELECT performance, round FROM stats WHERE deck_id = ${deckId} ORDER BY performance_id DESC LIMIT 1;
            `)
    
			if(prevPerformance instanceof Error) throw new Error(prevPerformance.message)
    
			let round = 1
			if (Object.keys(prevPerformance).length) {
				round = prevPerformance[0].round + 1
				prevPerformance = prevPerformance[0].performance
			}
            
			let newPerformance = CalcPerformance(roundResult, prevPerformance, round)
			let response = await db.query(escape`
                INSERT INTO stats(deck_id, performance, round) VALUES(${deckId}, ${newPerformance}, ${round});
            `)
			if(response instanceof Error) throw new Error(response.message)
    
			res.status(200)

		} catch (err) {
			console.error(err)
			res.status(500).send(err)
		}
	}
})