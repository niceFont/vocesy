/*eslint-disable*/
const db = require("../../../lib/db")
const escape = require("sql-template-strings")
const uuid = require("uuid")
const {CheckForValues} = require("../../../lib/utils")


module.exports = async (req, res) => {
    if (req.method === "POST") {
        try {
            const {title, privacy, user} = JSON.parse(req.body)
            console.log(req.body)
            CheckForValues([title, privacy, user])
            let slug = uuid.v4().slice(0, 5)
            let deck = await db.query(escape`
               INSERT INTO decks(title, privacy, username, slug) VALUES(${title}, ${privacy}, ${user}, ${slug});
            `)
            if(deck instanceof Error) throw new Error(deck.message)
            console.log(deck)
            return res.status(200).json(deck)
        } catch (err) {
            if (err instanceof TypeError) res.status(400).send(err.message)
            else res.status(500).send(err.message)
        }
    } else {
        res.status(400).send("Request Method " + req.method + " is not allowed.")
    }
}