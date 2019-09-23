import {Nav, Navbar,Container, NavbarBrand, Button} from "react-bootstrap"
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
					<Link href={`/user/${encodeURI(user.name)}`}>
						<Nav.Link as="a">
							{user.name.toLowerCase()}
						</Nav.Link>
					</Link>
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


