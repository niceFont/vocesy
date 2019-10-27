
/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import Login from "../../pages/login"


describe("Login", () => {
    
	it("should render", () => {
		const tree = renderer.create(<Login></Login>)
		expect(tree.toJSON()).toMatchSnapshot()
	})
    
})
