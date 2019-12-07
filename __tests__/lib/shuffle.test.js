import { Shuffle } from "../../lib/utils"


describe("Shuffle", () => {
	it("should return a new array with random order", () => {
		const arr = [1, 2, 3, 4, 5]

		const shuffledArr = Shuffle(arr)

		let isShuffled = true

		for (let num in arr) {
			if (arr[num] === shuffledArr[num]) {
				isShuffled = false
				break
			}
		}

		expect(isShuffled).toEqual(true)

	})
})
