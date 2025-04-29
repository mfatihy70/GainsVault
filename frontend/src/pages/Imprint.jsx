import React from "react"
import { Container, Card, ListGroup } from "react-bootstrap"

const Imprint = () => {
  return (
    <Container className="my-5">
      <Card bg="dark" text="light" className="p-4 shadow">
        <Card.Body>
          <Card.Title
            className="text-warning mb-4"
            style={{ fontSize: "1.8rem" }}
          >
            Imprint
          </Card.Title>
          <div>
            <h5>Company Information</h5>
            <p>
              GainsVault
              <br />
              Höchstädtplatz 6
              <br />
              1200 Wien, Österreich
            </p>
          </div>
          <div>
            <h5>Contact</h5>
            <p>
              Phone: +43 123 456 789
              <br />
              Email:{" "}
              <a href="mailto:gainsvault@support.com" className="text-light">
                gainsvault@support.com
              </a>
            </p>
          </div>
          <div>
            <h5>Represented By</h5>
            <ListGroup variant="flush" className="bg-dark text-light">
              <ListGroup.Item className="bg-dark text-light">
                Fatih Yildiz
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                Elsherif Ibrahim
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                Emre Yüksel
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                Shez Soltani
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light">
                Humza Ajaz
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div>
            <h5>Disclaimer</h5>
            <p>
              The contents of our pages were created with the utmost care.
              However, we cannot guarantee the accuracy, completeness, or
              timeliness of the content.
            </p>
          </div>
          <div>
            <h5>External Links</h5>
            <p>
              Our website contains links to external websites. We have no
              influence on the content of these websites and therefore cannot
              assume any liability for them.
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Imprint
