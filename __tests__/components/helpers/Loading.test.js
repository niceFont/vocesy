/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import { Loading } from "../../../components/Helpers/Loading"


describe("Loading", () => {
    
	it("should render loading", () => {
		const tree = renderer.create(<Loading fetched={false}></Loading>)
		expect(tree.toJSON()).toMatchSnapshot()
	})
    
})

