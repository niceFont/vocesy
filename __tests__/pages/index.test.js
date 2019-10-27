
/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import Index from "../../pages/index"


describe("Index", () => {
    
	it("should render", () => {
		const tree = renderer.create(<Index></Index>)
		expect(tree.toJSON()).toMatchSnapshot()
	})
    
})

