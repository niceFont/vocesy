/* eslint-disable */
const db = require("../../../lib/db")
const escape = require("sql-template-strings")

module.exports = async (req, res) => {

    if (req.method === "POST") {
        try {
            let {front, back, deck_id} = JSON.parse(req.body)
            console.log(req.body)
            let res = await db.query(escape`
        INSERT INTO cards(front, back, deck_id) VALUES(${front}, ${back}, ${deck_id});
        `) 

            console.log(res)
        } catch (err) {
            res.status(400).send(err)
        }
    
}

}