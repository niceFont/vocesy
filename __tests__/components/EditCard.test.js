
/*eslint no-undef: off*/
/*eslint camelcase: off*/

import React from "react"
import { mount } from "enzyme"
import { EditCard } from "../../components/Cards/EditCard"

describe("EditCard", () => {
	const component = mount(<EditCard
		data={{
			deck_id: 1, title: "unitTest", privacy: 0, front: "unit", back: "test"
		}}
		toggleShow={() => { }}
		show={true}
	></EditCard>)
	it("should render correctly with passed Props.", () => {

		expect(component.find("div.modal-title b").text().trim()).toEqual("unitTest")
			
	})
	
	it("should render an alert on empty input.", () => {
		let component = mount(<EditCard
			data={{
				deck_id: 1, title: "unitTest", privacy: 0, front: "", back: ""
			}}
			toggleShow={() => { }}
			show={true}
		></EditCard>)
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
