import db from "../../lib/db"
import escape from "sql-template-strings"
import { CheckForValues} from "../../lib/utils"
import {HashPassword} from "../../lib/hash"

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			const {email, username, password} = JSON.parse(req.body)
			CheckForValues([email, username, password])
			console.log(req.body)
			const hashed = await HashPassword(password)            
            
			let response = await db.query(escape`
			INSERT INTO users(username, email, password) VALUES(${username}, ${email}, ${hashed});
			`)
			if (response instanceof Error) throw new Error(response.message)
			res.status(200).json(response)
		} catch (err) {
			res.status(500).send(err) 
		}
	} else {
		res.status(400).send("Invalid Request Method.")
	}
}