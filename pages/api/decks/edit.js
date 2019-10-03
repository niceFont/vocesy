/* eslint-disable */

const db = require("../../../lib/db")
const escape = require("sql-template-strings")
const {CheckForValues} = require("../../../lib/utils")

module.exports = async (req, res) => {
    
    if (req.method === "POST") {
        const {deckId, privacy, title } = JSON.parse(req.body)
        CheckForValues([deckId, privacy, title])
        try {
            let response = await db.query(escape`
                UPDATE decks SET title = ${title}, privacy = ${privacy} WHERE deck_id = ${deckId}; 
            `)

            res.status(200).json(response)

        } catch (err) {
            if (err instanceof TypeError) res.status(400).send(err.message)
            else res.status(500).send(err)
        }

    } else {
        res.status(400).send("Request Method " + req.method + " is not allowed.")
    }
}