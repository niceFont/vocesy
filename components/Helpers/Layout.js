import { Nav, NavDropdown, Navbar, NavbarBrand } from "react-bootstrap";
import Link from "next/link";
import { ExtractName } from "../../lib/utils";
import Cookies from "js-cookie";
import React from "react";
import RoundButton from "../../components/Helpers/RoundButton";

export const Layout = props => {
  const _logout = () => {
    Cookies.remove("user");
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("loggedIn");
      window.location.reload();
    }
  };

  return (
    <div className="justify-content-center">
      <Navbar
        style={{
          padding: "0 10vw 0 10vw",
          height: 100,
          backgroundColor: "white",
          backgroundColor: "rgba(0,0,0,0)",
          fontWeight: 600,
          width: "100%",
          minWidth: "auto",
          zIndex: 1,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        }}
        expand="md"
        variant="light"
      >
        <NavbarBrand>
          <Link href="/">
            <img
              alt="logo"
              style={{
                width: 160,
                height: 65,
              }}
              src="/static/logo_transparent_background.png"
            />
          </Link>
        </NavbarBrand>
        <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
        <Navbar.Collapse
          id="main-menu"
          style={{ backgroundColor: "white", padding: 20 }}
        >
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
                <NavDropdown
                  title={
                    props.user.displayName[0].toUpperCase() +
                    props.user.displayName.slice(1)
                  }
                >
                  <NavDropdown.Item as="div">
                    <Link
                      href={`/user/${encodeURI(
                        ExtractName(props.user.displayName)
                          .split(" ")
                          .join("")
                          .toLowerCase()
                      )}`}
                    >
                      <Nav.Link as="a">Profile</Nav.Link>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="div" onClick={_logout}>
                    <Nav.Link>Logout</Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <style jsx global>{`
        a {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
