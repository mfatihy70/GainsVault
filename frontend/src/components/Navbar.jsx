import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import logo from "@/assets/gainsvault-tr.png"

const CustomNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">
      <img
        src={logo}
        width="200"
        height="200"
        className="d-inline-block align-top"
        alt="Logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </Nav>
      <Nav>
        <NavLink to="/exercises" className="nav-link">
          Exercises
        </NavLink>
      </Nav>
      <Nav>
        <NavLink to="/splits" className="nav-link">
          Splits
        </NavLink>
      </Nav>
      <Nav>
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default CustomNavbar
