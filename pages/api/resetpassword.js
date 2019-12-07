import jwt from "jsonwebtoken"
import { CheckForValues } from "../../lib/utils"
import nodemailer from "nodemailer"
import db from "../../lib/db"
import escape from "sql-template-strings"

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			const { email } = JSON.parse(req.body)
			CheckForValues([email])

			const user = await db.query(escape`
				SELECT email FROM users WHERE email = ${email}
			`)

			console.log(user)
			if (user.length) {

				let token = jwt.sign({
					email
				}, process.env.SECRET, {
					expiresIn: 60 * 5
				})
				const transporter = nodemailer.createTransport({
					service: "gmail",
					auth: {
						user: "vocesy.team@gmail.com",
						pass: "Quu89sd88E7x"
					}
				})

				transporter.sendMail({
					from: "vocesy.team@gmail.com",
					to: email,
					subject: "Password Reset Requested",
					text: "this is a test message http://localhost:3000/pw?t=" + token + "&e=" + email
				}, (err) => {
					if (err) console.log(err)
				})
			}
			res.status(200).send("Sent")
		} catch (error) {
			console.error(error)
			res.status(500).send(error)
		}
	}
}