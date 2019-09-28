
export default function Shuffle(arr){
	let arr_copy = [...arr] 
	for(let i = arr_copy.length -1; i > 0; i--) {
		let j = Math.floor(Math.random() * i)
		let temp = arr_copy[j]
		arr_copy[j] = arr_copy[i]
		arr_copy[i]=temp
	}
	console.log(arr_copy)
	return arr_copy
}