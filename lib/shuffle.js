export default function Shuffle(arr) {
	let arrCopy = [...arr]
	for (let i = arrCopy.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * i)
		let temp = arrCopy[j]
		arrCopy[j] = arrCopy[i]
		arrCopy[i] = temp
	}
	return arrCopy
}
