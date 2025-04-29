import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Layout and common components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Pages
import HomePage from "./pages/Home"
import LoginForm from "./auth/Login"
import RegisterForm from "./auth/Register"
import Profile from "./profile/Profile"
import Imprint from "./pages/Imprint"
import Exercises from "./exercises/Exercises"
import Splits from "./splits/SplitsPage"
import AboutUs from "./pages/AboutUs"
import Help from "./pages/Help"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/splits" element={<Splits />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
