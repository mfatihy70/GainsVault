import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import { Container, Button } from 'react-bootstrap'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

// Router Definition
const router = createBrowserRouter(
  createRoutesFromElements(
    // Main Layout
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

function App() {
  // Call the router as the main 'App'
  return <RouterProvider router={router} />
}

export default App
