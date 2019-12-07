import { Button } from "react-bootstrap"

const RoundButton = props => {
	return (
		<Button
			style={{
				...props.style,
				borderRadius: 25,
				padding: 0,
			}}
			{...props}
		>
			{props.children}
		</Button>
	)
}

export default RoundButton
