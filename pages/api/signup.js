import db from "../../lib/db"
import escape from "sql-template-strings"
import { CheckForValues} from "../../lib/utils"
const {HashPassword} = require("../../lib/hash")

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			const {email, username, password} = JSON.parse(req.body)
			CheckForValues([email, username, password])
			const hashed = await HashPassword(password)            
            
			console.log(
				email, password, username, hashed
			)
			let response = await db.query(escape`
                INSERT INTO users(username, email, password) VALUES(${username}, ${email}, ${hashed});
			`)
			if (response instanceof Error) throw new Error(response.message)
			res.status(200).json(response)
		} catch (err) {
			res.status(500).send(err.message) 
		}
	} else {
		res.status(400).send("Invalid Request Method.")
	}
}