import {CheckForValues} from "../../lib/utils"
import escape from "sql-template-strings"
import db from "../../lib/db"
const { CompareHash } = require("../../lib/hash")

export default async (req, res) => {

	if (req.method === "POST") {
		try {
			const {username, password} = JSON.parse(req.body)
			CheckForValues([username,  password])
			let user = await db.query(escape`
                SELECT * FROM users WHERE username = ${username}; 
            `)
			if(!user.length) throw new Error("Either your Password or your Username is wrong")
			if(! await CompareHash(user[0].password, password)) throw new Error("Either your Password or your Username is wrong")
			res.json({
				displayName: user[0].username, email: user[0].email
			})
		} catch (err) {
			res.status(500).send(err.message) 
		}
	}
}