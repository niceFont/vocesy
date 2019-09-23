import {Nav,NavDropdown, Navbar,Container, NavbarBrand, Button} from "react-bootstrap"
import Link from "next/link"
import {useAuth0} from "./Auth0wrapper"

export const Layout = (props) => {

	const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0()

	return (
		<div>
			<Navbar fixed="top" bg="dark" variant="dark">
				<NavbarBrand>
					<Link href="/">
						<h3>Vocesy</h3>
					</Link>
				</NavbarBrand>
				<Navbar.Collapse className="justify-content-end">
					<Nav> 
						<Link href="/new">
							<Nav.Link as="a">
								new
							</Nav.Link>
						</Link>

						{!isAuthenticated && (
					
							<Button onClick={() => loginWithRedirect({})}>
						Log in
							</Button>
						)}	
						{isAuthenticated && typeof user !== "undefined"&&

							<NavDropdown title={user.name} id="nav-dropdown">
									
								<Link href={`/user/${encodeURI(user.name)}`}>
									<NavDropdown.Item as="a">
											Profile
									</NavDropdown.Item>
								</Link>

								<Link href="/decks">
									<NavDropdown.Item as="a">
											My Decks
									</NavDropdown.Item>
								</Link>
							</NavDropdown>
							
						}
						{isAuthenticated && <Button variant="outline-danger" onClick={() => logout()}>log out</Button>}
					</Nav>
				</Navbar.Collapse>	
			</Navbar>
			<Container style={{ marginTop: 200 }}>
				{props.children}
			</Container>

			<Navbar fixed="bottom" bg="dark" variant="dark">
			</Navbar>
		</div>

	)
}


