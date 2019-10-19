import { Form, Overlay, Tooltip } from "react-bootstrap"
import { useState, useRef } from "react"

const InputWithOverlay = ({overlayId, tooltip, label, placeholder, handleChangeFn, type}) => {

	const [show, toggleShow] = useState(false)
	const target = useRef(null)

	return (
		<Form.Group>
			{label &&
			<Form.Label>{label}</Form.Label>
			}
			<Form.Control
				ref={target}
				onBlur={() => toggleShow(false)}
				onFocus={() => toggleShow(true)}
				placeholder={placeholder}
				type={type}
				required
				onChange={({ target }) => handleChangeFn(target.value)}>
			</Form.Control>
			<Overlay target={target.current} show={show} placement="top">

				{props => {
					props.show = props.show.toString()
					return (
						<Tooltip id={"overlay-" + overlayId} {...props}>
							{tooltip} 
						</Tooltip>
					)
				}}
			</Overlay>
		</Form.Group>
	)
} 


export default InputWithOverlay