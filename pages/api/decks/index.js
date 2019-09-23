/*eslint-disable */

const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async (req, res) => {

    const {user} = req.query

    let decks = await db.query(escape`
        SELECT * FROM decks WHERE user=${user} 
    `)

    return res.json(decks)
}