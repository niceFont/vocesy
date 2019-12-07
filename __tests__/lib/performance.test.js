import { CalcPerformance } from "../../lib/utils"


describe("Calcperformance", () => {

	it("should return new performance", async () => {
		const performance = ["true", "true", "false"]
		const result = await CalcPerformance(performance, null, 1)

		expect(Math.round(result)).toEqual(67)
	})

	it("should return new + old performance", async () => {

		const performance = ["true", "true", "false", "false"]
		const prevPerformance = 67
		const result = await CalcPerformance(performance, prevPerformance, 2)

		expect(Math.round(result)).toEqual(59)
	})
})

