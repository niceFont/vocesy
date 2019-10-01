export function Shuffle(arr) {
	let arrCopy = [...arr]
	for (let i = arrCopy.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * i)
		let temp = arrCopy[j]
		arrCopy[j] = arrCopy[i]
		arrCopy[i] = temp
	}
	return arrCopy
}

export function CheckForValues(values) {
	for(let val of values) {
		if(!val) {
			throw new TypeError("One or some of the required values are undefined or null.")
		}
	}

	return
}