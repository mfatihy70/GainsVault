import { Navbar, Nav, Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "@/assets/icon/gainsvault-tr.png"
import "@/styles/navbar.css"
import { isLoggedIn, logout } from "../utils/login"

const CustomNavbar = () => {
  const navigate = useNavigate() // React Router hook for navigation

  const handleLogout = () => {
    logout(navigate)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="navbar mb-5">
      <Navbar.Brand href="/">
        <img src={logo} className="navbar-logo" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/exercises" className="nav-link">
            Exercises
          </NavLink>
          <NavLink to="/splits" className="nav-link">
            Splits
          </NavLink>
          <NavLink to="/workouts" className="nav-link">
            Workouts
          </NavLink>
          {isLoggedIn() && (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          )}
        </Nav>
        <Nav className="ms-auto">
          {!isLoggedIn() ? (
            <>
              {/* Login Button */}
              <NavLink to="/login" className="nav-link">
                <Button variant="outline-light">Login</Button>
              </NavLink>
              {/* Signup Button */}
              <NavLink to="/register" className="nav-link">
                <Button variant="light">Signup</Button>
              </NavLink>
            </>
          ) : (
            <>
              {/* Logout Button */}
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
