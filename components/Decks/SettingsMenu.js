import { forwardRef } from "react"


const SettingsMenu = forwardRef(({style, changeSettings, children, className, "aria-labeledby" : labeledBy}, context) => {


	return (
		<div style={style} className={className} aria-labelledby={labeledBy}>
			<div className="custom-control custom-switch">
				<input
					type="checkbox"
					className="custom-control-input"
					id="customSwitches"
					readOnly
					onChange={() => {
						changeSettings(settings =>
							Object.assign({
								...settings,
								userValidation: !settings.userValidation
							}))
					}}
				/>
				<label
					style={{
						fontSize: 14
					}}
					className="custom-control-label"
					htmlFor="customSwitches">
					User validation
				</label>
			</div>
			{children}
		</div>
	)
})


export default SettingsMenu