import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="nav-class">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/" className="header-logo">
              <img
                alt=""
                src={`${process.env.REACT_APP_URL}logo-sm.png`}
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
                style={{ borderRadius: "50%" }}
              />{" "}
              Billing App
            </Link>
          </Navbar.Brand>

          <div className="z-setter">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="main-nav-link">
                  Sales
                </NavLink>
                <NavDropdown title="Masters" id="basic-nav-dropdown">
                  <NavLink to="/masters/items" className="header-link">
                    Item Master
                  </NavLink>
                  <NavLink to="/masters/company" className="header-link">
                    Company Master
                  </NavLink>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
