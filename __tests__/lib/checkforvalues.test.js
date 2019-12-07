import { CheckForValues } from "../../lib/utils"


describe("CheckForValues", () => {
	it("should throw an error", () => {
		try {
			const cool = undefined
			CheckForValues([cool])
		} catch (error) {
			expect(error.message).toEqual("One or some of the required values are undefined or null.")
		}
	})

	it("should return undefined", () => {
		const cool = "defined"

		const result = CheckForValues([cool])

		expect(result).toEqual(undefined)

	})
})
