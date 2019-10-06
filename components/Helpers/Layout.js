import {Nav,
	NavDropdown,
	Navbar,
	NavbarBrand} from "react-bootstrap"
import Link from "next/link"
import { ExtractName } from "../../lib/utils"

export const Layout = props => {
	return (
		<React.Fragment>
			<Navbar
				style={{
					paddingLeft: "4%",
					paddingRight: "4%",
					backgroundColor: "white",
					borderBottom: "1px solid lightgray"
				}}
				fixed="top"
				variant="light">
				<NavbarBrand>
					<Link href="/">
						<img
							style={{
								width: 120, height: 40 
							}}
							src="/static/logo.png"
						/>
					</Link>
				</NavbarBrand>
				<Nav>
					<Link href="/decks/create">
						<Nav.Link as="a">Create</Nav.Link>
					</Link>
					<Nav.Item>
						<Link href="/decks">
							<Nav.Link as="a">My Decks</Nav.Link>
						</Link>
					</Nav.Item>
				</Nav>
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						{!props.user && (
							<Nav.Item>
								<Link href="/login" replace>
									<Nav.Link as="a">log in</Nav.Link>
								</Link>
							</Nav.Item>
						)}
						{props.user && (
							<div style={{
								display: "flex", flexDirection: "row"
							}}>
								<img style={{
									width: 30, height: 30, borderRadius: "100%", margin: "5px 0 5px 0"
								}} src={props.user.picture}></img>
								<NavDropdown
									title={ExtractName(props.user.displayName).split(" ").join("").toLowerCase()}
									id="nav-dropdown">
									<Link
										href={`/user/${encodeURI(ExtractName(props.user.displayName).split(" ").join("").toLowerCase())}`}>
										<NavDropdown.Item as="a">
										Profile
										</NavDropdown.Item>
									</Link>

									<Link href="/logout">
										<NavDropdown.Item
											style={{
												color: "#e84646" 
											}}
											as="a">
										Log Out
										</NavDropdown.Item>
									</Link>
								</NavDropdown>
							</div>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			{props.children}

			<Navbar fixed="bottom" bg="light" variant="dark">
				<Nav>

					<Nav.Item>
						<span>ver. 1.01a Still in Development...</span>
					</Nav.Item>
				</Nav>
			</Navbar>
		</React.Fragment>
	)
}
