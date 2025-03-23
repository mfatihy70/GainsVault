import { Outlet } from 'react-router-dom'
// TODO import custom navbar
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Define the main website layout
export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer/>
        </>
    )
}
