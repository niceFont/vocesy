
/*eslint no-undef: off*/
/*eslint camelcase: off*/

import React from "react"
import { PlayViewer } from "../../components/Player/PlayViewer"
import renderer from "react-test-renderer"
import {mount} from "enzyme"

describe("PlayViewer", () => {
	it("should render correctly with passed Props.", () => {

		const tree = renderer.create(<PlayViewer
			flipped={false}
			done={false}
			max={1}
			current={1}
			settings={{
				uv: "true"
			}}
			data={[{
				front: "hello", back: "world", id: 1, deck_id: 1
			}]}
		></PlayViewer>)
        
		expect(tree.toJSON()).toMatchSnapshot()
	})
    
	it("should show Card Back on Click", () => {
		let toggleFlipped = jest.fn()

		const component = mount(<PlayViewer
			flipped={false}
			toggleFlipped={toggleFlipped}
			done={false}
			max={1}
			current={1}
			settings={{
				uv: "true"
			}}
			data={[{
				front: "hello", back: "world", id: 1, deck_id: 1
			}]}
		></PlayViewer>)

        
		component.find("div#toggler").simulate("click")

		expect(toggleFlipped).toHaveBeenCalledTimes(1)
        
		component.setProps({
			flipped: true
		})
        
	})
	

})
