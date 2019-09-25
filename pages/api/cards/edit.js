/* eslint-disable */

const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async (req, res) => {
    if (req.method === "POST") {
        try {

            const {front,back,id} = JSON.parse(req.body)
            await db.query(escape`
            UPDATE cards SET front = ${front}, back = ${back} WHERE id = ${id};
            `)
        } catch (err) {
            res.status(400).send(err)
        }
    }
}