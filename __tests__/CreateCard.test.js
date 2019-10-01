/*eslint no-undef: off*/
/*eslint camelcase: off*/

import React from "react"
import { mount } from "enzyme"
import { CreateCard } from "../components/Cards/CreateCard"


describe("CreateCard", () => {
	const component = mount(<CreateCard
		data={{
			deck_id: 1, title: "unitTest", privacy: 0
		}}
		toggleShow={() => { }}
		show={true}
	></CreateCard>)
	it("should render correctly with passed Props.", () => {

		expect(component.find("div.modal-title b").text()).toEqual(" unitTest ")
			
	})
	
	it("should render an alert on empty input.", () => {
		component.find(".btn-block").simulate("click")
		expect(component.find(".alert-danger").exists()).toEqual(true)
	})

	it("should not show the Modal after prop change.", () => {
		component.setProps({
			show: false, toggleShow: () => { } 
		})
		
		expect(component.find("modal-dialog").exists()).toEqual(false)
	})

})



