const jwt = require("jsonwebtoken")


export default async (req, res) => {


	let token = req.headers["authorization"]
    
	if (token.startsWith("Bearer ")) {
		token = token.slice(7)
	}
    
	if (token) {
		jwt.verify(
			token, process.env.SECRET, (err, decoded) => {
				if (err) return res.status(400).json({
					success: false,
					message: "Token is invalid."
				})
				else {
					return res.status(200).json(decoded)
				}
			}
		)   
	} else {
		return res.status(400).send("No token provided in request.")
	}
}