import { Navbar, Nav } from "react-bootstrap"
import Link from "next/link"

const BottomNav = () => {
	return (
		<Navbar
			variant="dark"
			bg="dark"
			style={{
				position: "absolute",
				bottom: 0,
				width: "100%",
			}}>
			<Nav>
				<Nav.Item onClick={() => window.location.href = "mailto:peterwilms@hotmail.de"}>
					<Nav.Link as="a">
						Contact
					</Nav.Link>
				</Nav.Item>
				{/* 				<Nav.Item>
					<Link href="/about">
						<Nav.Link as="a">
							About
						</Nav.Link>
					</Link>
				</Nav.Item> */}
				<Nav.Item>
					<Link href="/privacy">
						<Nav.Link as="a">
							Privacy
						</Nav.Link>
					</Link>
				</Nav.Item>
				<Nav.Item>
					<Link href="/tos">
						<Nav.Link as="a">
							Terms of Service
						</Nav.Link>
					</Link>
				</Nav.Item>
				{/* <Nav.Item>
					<Link href="/cookies">
						<Nav.Link as="a">
							Cookies
						</Nav.Link>
					</Link>
				</Nav.Item> */}
			</Nav>
		</Navbar>
	)
}

export default BottomNav
