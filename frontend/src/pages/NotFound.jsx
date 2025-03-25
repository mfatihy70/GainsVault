import { Container, Button } from "react-bootstrap"

const NotFound = () => {
  return (
    <Container className="d-flex flex-column min-vh-100 flex-grow-1 align-items-center text-center">
      <h1 className="display-1 bg-dark m-2 p-2 rounded-4">404</h1>
      <p className="  bg-dark m-2 p-2 rounded-4">
        The page you are looking for does not exist.
      </p>
      <Button href={`/`} variant="primary">
        Go to Home
      </Button>
    </Container>
  )
}

export default NotFound
