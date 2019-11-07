const bcrypt = require("bcrypt")


function HashPassword(password) {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) return reject(err)
			else {
				resolve(hash)
			}
		})
	})
}


function CompareHash(savedHash, password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, savedHash, (err, match) => {
			if (err) return reject(err)
			else return resolve(match)
		})
	})
} 


module.exports = {
	HashPassword, CompareHash
}