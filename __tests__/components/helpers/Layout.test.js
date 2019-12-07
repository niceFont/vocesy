/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import TopNav from "../../../components/Helpers/TopNav"
//import { mount } from "enzyme"

describe("TopNav", () => {
	it("renders", () => {
		const tree = renderer.create(<TopNav></TopNav>)

		expect(tree.toJSON()).toMatchSnapshot()
	})
})

