import {
	Nav,
	NavDropdown,
	Navbar,
	Container,
	NavbarBrand
} from "react-bootstrap"
import Link from "next/link"

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
							style={{ width: 120, height: 40 }}
							src="/static/logo.png"
						/>
					</Link>
				</NavbarBrand>
				<Nav>
					<Link href="/new">
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
							<NavDropdown
								title={props.user.displayName}
								id="nav-dropdown">
								<Link
									href={`/user/${encodeURI(
										props.user.displayName
									)}`}>
									<NavDropdown.Item as="a">
										Profile
									</NavDropdown.Item>
								</Link>

								<Link href="/logout">
									<NavDropdown.Item
										style={{ color: "#e84646" }}
										as="a">
										Log Out
									</NavDropdown.Item>
								</Link>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			{props.children}

			<Navbar fixed="bottom" bg="dark" variant="dark"></Navbar>
		</React.Fragment>
	)
}
