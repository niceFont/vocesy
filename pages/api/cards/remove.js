/* eslint-disable */

const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async (req, res) => {
	if (req.method === "DELETE") {
		try {
			const { id } = JSON.parse(req.body)
			let response = await db.query(escape`
                DELETE FROM cards WHERE id=${id};
            `)
			console.log(res, id)
			res.status(200).send(JSON.stringify(response))
		} catch (err) {
			res.status(500).send(err)
		}
	}
}
