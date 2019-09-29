/* eslint-disable */
const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async function(req, res) {
	if (req.method === "POST") {
		try {
			let { front, back, deck_id } = JSON.parse(req.body)
			console.log(req.body)
			let response = await db.query(escape`
        INSERT INTO cards(front, back, deck_id) VALUES(${front}, ${back}, ${deck_id});
        `)

			res.status(200).send(JSON.stringify(response))
		} catch (err) {
			console.log(err)
			res.send(err)
		}
	}
}
