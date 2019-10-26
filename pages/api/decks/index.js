/*eslint-disable */

const db = require("../../../lib/db")
const escape = require("sql-template-strings")
const { CheckForValues } = require("../../../lib/utils")


module.exports = async (req, res) => {
	if (req.method === "GET") {
		try {
			const { user, slug } = req.query
			CheckForValues([user])
			
			let queryString

			if (typeof slug !== "undefined") {
				queryString = escape`SELECT * FROM decks LEFT OUTER JOIN cards USING(deck_id) WHERE decks.username=${user} AND decks.slug=${slug};`
			} else {
				queryString = escape`SELECT * FROM decks WHERE username=${user};`
			}

			let decks = await db.query(queryString)
			return res.status(200).json(decks)
		} catch (err) {
			if (err instanceof TypeError) res.status(400).send(err.message)
			else res.status(500).send(err)
		}
	} else {
		res.status(400).send("Request Method " + req.method + " is not allowed.")
	}
}
