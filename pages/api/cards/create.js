/* eslint-disable */
const db = require("../../../lib/db")
const escape = require("sql-template-strings")
const {CheckForValues} = require("../../../lib/utils")

module.exports = async function(req, res) {
	
	if (req.method === "POST") {
		try {			
			let { front, back, deckId } = JSON.parse(req.body)
			CheckForValues([front, back, deckId])
			let response = await db.query(escape`
        INSERT INTO cards(front, back, deck_id) VALUES(${front}, ${back}, ${deckId});
        `)

			res.status(200).json(response)
		} catch (err) {
			if (err instanceof TypeError) res.status(400).send(err.message)
			else res.status(500).send(err.message)
		}
	} else {
		res.status(400).send("Request Method " + req.method + " is not allowed." )
	}
}
