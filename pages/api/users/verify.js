import { CheckForValues } from "../../../lib/utils"
import jwt from "jsonwebtoken"

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			const { email, resetToken } = JSON.parse(req.body)
			CheckForValues([email, resetToken])
			jwt.verify(resetToken, process.env.SECRET, (err, decoded) => {
				if (err) return res.status(401).send({
					email, resetToken, authenticated: false
				})
				if (decoded.email === email) {
					res.status(200).send({
						email, resetToken, authenticated: true
					})
				}
			})
		} catch (error) {
			console.log(error)
			res.status(500).send(error)
		}
	}
}