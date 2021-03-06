import db from "../../../lib/db"
import escape from "sql-template-strings"
import {CheckForValues} from "../../../lib/utils"



export default async (req, res) => {
	if (req.method === "GET") {
        
		try {
			let {username} = req.query 
			CheckForValues([username])
			let response = await db.query(escape`
                SELECT stats.*, deck_id, title FROM decks INNER JOIN stats USING(deck_id) WHERE decks.username=${username};
            `)
			if(response instanceof Error) throw new Error(response.message) 

			res.status(200).json(response)
		} catch (error) {
			res.status(500)
		}
	}
}