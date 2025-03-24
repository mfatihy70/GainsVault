import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import CustomNavLink from './NavLink';
import logo from '../../assets/logo.png'; // Pfad zum Logo

const CustomNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <CustomNavLink to="/">Home</CustomNavLink>
        <CustomNavLink to="/exercises">Exercises</CustomNavLink>
        <CustomNavLink to="/splits">Splits</CustomNavLink>
        <CustomNavLink to="/profile">Profile</CustomNavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default CustomNavbar;
