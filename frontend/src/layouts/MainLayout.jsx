import { Outlet } from 'react-router-dom'
// TODO import custom navbar
import { Navbar } from 'react-bootstrap'

// Define the main website layout
export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
