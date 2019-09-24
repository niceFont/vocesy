/*eslint-disable*/
const db = require("../../../lib/db")
const escape = require("sql-template-strings")
const uuid = require("uuid")

module.exports = async (req, res) => {
 console.log("test")
    try {

        let body = JSON.parse(req.body)
    
        let slug = uuid.v4().slice(0,5)
    
        let deck = await db.query(escape`
           INSERT INTO decks(title, privacy, user, slug) VALUES(${body.title}, ${body.privacy}, ${body.user.name}, ${slug});
        `)
    
        console.log(deck)
        return res.send(200)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}