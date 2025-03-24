import { Container, Button } from "react-bootstrap"

const NotFound = () => {
  return (
    // To fix the content to the top and footer to the bottom
    <Container className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex flex-column align-items-center text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <Button href={`/`} variant="primary">
          Go to Home
        </Button>
      </div>
    </Container>
  )
}

export default NotFound
