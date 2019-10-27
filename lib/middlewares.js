import jwt from "jsonwebtoken"

export function apiWithAuth(handler) {
	return (req, res) => {
		let token = req.headers["authorization"]
		if(typeof token === "undefined") return res.status(403).send("Unauthorized")
		if (token.startsWith("Bearer ")) {
			token = token.slice(7)
		} 
			
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) return res.status(403).send("Unauthorized")
			else return handler(req,res) 
		})
	}
}
