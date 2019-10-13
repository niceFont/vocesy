/*eslint-disable*/

const mysql = require("serverless-mysql")

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST_PRODUCTION,
        database: process.env.MYSQL_DATABASE_PRODUCTION,
        user: process.env.MYSQL_USER_PRODUCTION,
        password: process.env.MYSQL_PASSWORD_PRODUCTION
    }
})


exports.query = async query => {
    try {
        const res = await db.query(query)
        await db.end()
        return res
    } catch (err) {
       return err 
    }
}