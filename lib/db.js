/*eslint-disable*/

const mysql = require("serverless-mysql")

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
})


exports.query = async query => {
    try {
        const res = await db.query(query)
        await db.end()

        return res
    } catch (err) {
        return {err}
    }
}