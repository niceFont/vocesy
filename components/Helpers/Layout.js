import {Nav,
	NavDropdown,
	Navbar,
	NavbarBrand} from "react-bootstrap"
import Link from "next/link"
import { ExtractName } from "../../lib/utils"
import Cookies from "js-cookie"
import React  from "react"


export const Layout = props => {

	const _logout = () => {

		Cookies.remove("user")
		if (typeof localStorage !== "undefined") {
			localStorage.removeItem("loggedIn")
			window.location.reload()
		}
		
	}

	return (
		<div className="justify-content-center">
			<Navbar
				style={{
					margin: "0 10vw 0 10vw",
					height: 100,
					backgroundColor: "white",
					backgroundColor: "rgba(0,0,0,0)",
					fontWeight: 600,
					width: "80%",
					minWidth: "auto",
					zIndex: 1,
					position: "absolute"
				}}
				expand="md"
				variant="light"
			>
				<NavbarBrand>
					<Link href="/">
						<img
							alt="logo"
							style={{
								width: 120, height: 40 
							}}
							src="/static/logo.png"
						/>
					</Link>
				</NavbarBrand>
				<Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
				<Navbar.Collapse id="main-menu" >
					<Nav className="ml-auto justify-content-end">
						<Nav>
						<Nav.Item>
							<Link href="/decks/create">
								<Nav.Link as="a">Create</Nav.Link>
							</Link>
						</Nav.Item>
						<Nav.Item>
							<Link href="/decks">
								<Nav.Link as="a">My Decks</Nav.Link>
							</Link>
						</Nav.Item>
							{!props.user && (
								<Nav>
									<Nav.Item>
										<Link href="/login" replace>
											<Nav.Link as="a">Log in</Nav.Link>
										</Link>
									</Nav.Item>
									<Nav.Item>
										<Link href="/signup">
											<Nav.Link as="a">Sign up</Nav.Link>
										</Link>
									</Nav.Item>
								</Nav>
							)}
							{props.user && (
								<Nav>
									<Nav.Item>
										<Link href={`/user/${encodeURI(ExtractName(props.user.displayName).split(" ").join("").toLowerCase())}`}>
											<Nav.Link as="a">
												{props.user.displayName[0].toUpperCase() + props.user.displayName.slice(1)}
											</Nav.Link>
										</Link>
									</Nav.Item>
									<Nav.Item onClick={_logout}>
										<Nav.Link>	
										Logout
										</Nav.Link>
									</Nav.Item>
								</Nav>
							)}
						</Nav>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Navbar fixed="bottom" bg="light" variant="dark">
				<Nav>
					<Nav.Item>
						<span>ver. 1.01a Still in Development...</span>
					</Nav.Item>
				</Nav>
			</Navbar>
			 <style jsx global>{`
        a {
          cursor: pointer;
        }
      `}</style>
		</div>
	)
}
