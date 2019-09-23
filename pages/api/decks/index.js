/*eslint-disable */

const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async (req, res) => {

    const { user, slug } = req.query
    let queryString

    if (typeof slug !== "undefined") {
     queryString = escape`SELECT * FROM vocesy.decks WHERE user=${user} AND slug=${slug};`
    } else {

     queryString = escape`SELECT * FROM vocesy.decks WHERE user=${user};`
    }
    let decks = await db.query(queryString)

    return res.json(decks)
}