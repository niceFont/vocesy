


const Background = props => {


    return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				minHeight: "100%",
				background: "url('/static/background.webp')",
				backgroundSize: "cover",
				backgroundAttachment: "fixed",
				backgroundPosition: "center"
            }}>
            {props.children}
            </div>
    )
}

export default Background