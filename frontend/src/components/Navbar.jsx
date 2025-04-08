import { Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import logo from "@/assets/gainsvault-tr.png"
import "@/styles/navbar.css" // Import the CSS file

const CustomNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="sm" className="navbar mb-5 p-3">
    <Navbar.Brand href="/">
      <img src={logo} className="navbar-logo" alt="Logo" />
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
