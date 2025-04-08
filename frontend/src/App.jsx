import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Layout and common components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Pages
import HomePage from "./pages/Home"
import LoginForm from "./auth/Login"
import RegisterForm from "./auth/Register"
import SplitsPage from "./pages/Splits"
import Imprint from "./pages/Imprint"
import NotFoundPage from "./pages/NotFound"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/splits" element={<SplitsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
