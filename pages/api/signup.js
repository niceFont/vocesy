import db from "../../lib/db"
import escape from "sql-template-strings"
<<<<<<< HEAD
import { CheckForValues} from "../../lib/utils"
import {HashPassword} from "../../lib/hash"
=======
import { CheckForValues } from "../../lib/utils"
import { HashPassword } from "../../lib/hash"
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own

export default async (req, res) => {
	if (req.method === "POST") {
		try {
<<<<<<< HEAD
			const {email, username, password} = JSON.parse(req.body)
			CheckForValues([email, username, password])
			const hashed = await HashPassword(password)            
            
=======
			const { email, username, password } = JSON.parse(req.body)
			CheckForValues([email, username, password])
			let user = await db.query(escape`
			SELECT username FROM users WHERE username = ${username} ;
			`)
			if (user.length) throw new Error("User already exists.")
			user = await db.query(escape`
			SELECT email FROM users WHERE email = ${email} ;
			`)
			if (user.length) throw new Error("Email already exists.")
			const hashed = await HashPassword(password)

>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
			let response = await db.query(escape`
			INSERT INTO users(username, email, password) VALUES(${username}, ${email}, ${hashed});
			`)
			if (response instanceof Error) throw new Error(response.message)
			res.status(200).json(response)
		} catch (err) {
<<<<<<< HEAD
			res.status(500).send(err) 
=======
			res.status(500).send(err.message)
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
		}
	} else {
		res.status(400).send("Invalid Request Method.")
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> a02b1f7... -Removed setTimeout fix and replaced it with Cards having their own
