import db from "../../../lib/db"
import escape from "sql-template-strings"
import { CheckForValues } from "../../../lib/utils"
import hash from "../../../lib/hash"

export default async (req, res) => {
	if (req.method === "PUT") {
		try {
			const { email, password } = JSON.parse(req.body)
			CheckForValues([email, password])
			const hashed = await hash.HashPassword(password)
			const response = await db.query(escape`
                UPDATE users SET password = ${hashed} WHERE email = ${email};
            `)
			if (response instanceof Error) throw response.message

			res.status(200)
		} catch (error) {
			res.status(500).send(error)
		}
	}
}