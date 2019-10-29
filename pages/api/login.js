import {CheckForValues} from "../../lib/utils"
import escape from "sql-template-strings"
import db from "../../lib/db"
import { CompareHash } from "../../lib/hash"
import jwt from "jsonwebtoken"

export default async (req, res) => {

	if (req.method === "POST") {
		try {
			const {username, password} = JSON.parse(req.body)
			CheckForValues([username,  password])
			console.log(req.body)
			let user = await db.query(escape`
                SELECT * FROM users WHERE username = ${username}; 
			`)
			console.log(user[0])
			if(!user.length) throw new Error("Either your Password or your Username is wrong")
			console.log(username, password)
			console.log(await CompareHash(user[0].password, password))
			if(! await CompareHash(user[0].password, password)) throw new Error("Either your Password or your Username is wrong")

			let token = jwt.sign({
				displayName: user[0].username,
				email: user[0].email
			}, process.env.SECRET, {
				expiresIn: "24h"
			})


			return res.status(200).json({
				success: true,
				message: "Authentification successful",
				token
			})
		} catch (err) {
			return res.status(500).send(err.message) 
		}
	}
}