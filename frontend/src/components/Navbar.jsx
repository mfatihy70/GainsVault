import React from "react"
import { Navbar, Nav, NavLink } from "react-bootstrap"
import logo from "@/assets/gainsvault.png" // Pfad zum Logo

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
      <Nav className="mr-auto">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/splits">Splits</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default CustomNavbar
