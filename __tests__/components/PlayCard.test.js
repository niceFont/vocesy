/*eslint no-undef: off*/
/*eslint camelcase: off*/

import React from "react"
import { PlayCard } from "../../components/Player/PlayCard"
import renderer from "react-test-renderer"

describe("PlayCard", () => {
	it("should render correctly with passed Props.", () => {

		const tree = renderer.create(<PlayCard
			data={{
				front: "hello", back: "world", id: 1, deck_id: 1
			}}
		></PlayCard>)
        
		expect(tree.toJSON()).toMatchSnapshot()
        
			
	})
	

})
