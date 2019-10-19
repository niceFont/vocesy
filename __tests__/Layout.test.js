/*eslint no-undef: off*/
/*eslint camelcase: off*/
import renderer from "react-test-renderer"
import React from "react"
import { Layout } from "../components/Helpers/Layout"
import {mount} from "enzyme"

describe("Layout", () => {
    
	it("renders", () => {
		const tree = renderer.create(<Layout></Layout>)
    
		expect(tree.toJSON()).toMatchSnapshot()
	})

	it("renders with user", () => {
		const component = mount(<Layout user={{
			displayName:"unitTest", email: "unit@test.de" 
		}}></Layout>)
       
		expect(component.containsAllMatchingElements([
			<a>Create</a>,
			<a>My Decks</a>,
			<a>unittest</a>,
			<a>logout</a>
		])).toEqual(true)
	})

})