/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import  LoadingButton  from "../../../components/Helpers/LoadingButton"


describe("LoadingButton", () => {
    
	it("should render spinner", () => {
		const tree = renderer.create(<LoadingButton sending={true} ></LoadingButton>)
		expect(tree.toJSON()).toMatchSnapshot()
	})
    
})
