
/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import {NotFound} from "../../../components/Helpers/NotFound"


describe("NotFound", () => {
    
	it("should render", () => {
		const tree = renderer.create(<NotFound></NotFound>)
		expect(tree.toJSON()).toMatchSnapshot()
	})
    
})
