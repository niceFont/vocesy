import {Nav,
	NavDropdown,
	Navbar,
	NavbarBrand} from "react-bootstrap"
import Link from "next/link"
import { ExtractName } from "../../lib/utils"
import Cookies from "js-cookie"
import React, { PureComponent } from "react"


export const Layout = props => {

	const _logout = () => {

		Cookies.remove("user")
		if (typeof localStorage !== "undefined") {
			localStorage.removeItem("loggedIn")
			window.location.reload()
		}
		
	}

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
				expand="md"
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
				<Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
				<Navbar.Collapse id="main-menu" >
					<Nav className="mr-auto">
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
					</Nav>
					<Nav className="justify-content-end">
						<Nav>
							{!props.user && (
								<Nav>

									<Nav.Item>
										<Link href="/login" replace>
											<Nav.Link as="a">log in</Nav.Link>
										</Link>
									</Nav.Item>
									<Nav.Item>
										<Link href="/signup">
											<Nav.Link as="a">sign up</Nav.Link>
										</Link>
									</Nav.Item>
								</Nav>
							)}
							{props.user && (
								<Nav>
									<Nav.Item>
										<Link href={`/user/${encodeURI(ExtractName(props.user.displayName).split(" ").join("").toLowerCase())}`}>
											<Nav.Link as="a">
												{ExtractName(props.user.displayName).split(" ").join("").toLowerCase()}
											</Nav.Link>
										</Link>
									</Nav.Item>
									<Nav.Item onClick={_logout}>
										<Nav.Link style={{
											color: "#e84646" 
										}}>	
										logout
										</Nav.Link>
									</Nav.Item>
								</Nav>
							)}
						</Nav>
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
