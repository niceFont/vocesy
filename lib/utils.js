

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
		if(typeof val === "undefined") {
			throw new TypeError("One or some of the required values are undefined or null.")
		}
	}

	return
}



export function GenerateHtml(input, locations) {
	let diff = ""
	
	for(let i in input) {
		if(locations[i]) {
			diff += "<span style='color: red'>" + input[i] + "</span>"
		} else {

			diff += input[i]
		}
	}
	return diff
}


export function ReturnDiffs(input, answer) {


	let diffs = {
		lengthDiff: [],
		inputDiff: answer,
		diffLocations: []
	}

	
	for(let i in input) {
		if(i >= answer.length) {
			diffs.lengthDiff.push(input[i])
		} else {
			if(input[i].toLowerCase() !== answer[i].toLowerCase()) {
				diffs.inputDiff = diffs.inputDiff.slice(0, i) + input[i] + diffs.inputDiff.slice(parseInt(i)+1)
				diffs.diffLocations[i] = input[i]
			}
			
			
		}
	}
	if(answer.length > input.length) {
		for(let i = input.length; i < answer.length; i++) {
			diffs.diffLocations[i] = answer[i]
		}
					  }
	diffs.inputDiff = GenerateHtml(diffs.inputDiff, diffs.diffLocations)
	return diffs
}


export function CheckResult(input, answer) {
	if (!answer.toLowerCase().trim().localeCompare(input.toLowerCase().trim())) {
		return true
	} else {
		return false
	}
} 


export function ExtractName(displayName) {

	if(displayName.includes("@")) return displayName.split("@")[0]
	else return displayName
}

