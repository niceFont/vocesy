const Background = props => {
	return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				minHeight: "100%",
				backgroundColor: "white"
				/* 				background: "url('/static/background2.jpg')",
								backgroundSize: "cover",
								backgroundAttachment: "fixed",
								backgroundPosition: "center", */
			}}
		>
			{props.children}
		</div>
	)
}

export default Background
