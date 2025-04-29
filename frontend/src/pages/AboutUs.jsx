import React from "react"
import { Container, Card } from "react-bootstrap"

const AboutUs = () => {
  return (
    <Container className="my-5">
      <Card bg="dark" text="light" className="p-4 shadow">
        <Card.Body>
          <Card.Title
            className="text-warning mb-4"
            style={{ fontSize: "1.8rem" }}
          >
            About Us
          </Card.Title>
          <div>
            <h5>Our Mission</h5>
            <p>
              At GainsVault, our mission is to empower individuals to achieve
              their financial goals through innovative and user-friendly
              solutions. We strive to provide the tools and resources necessary
              to make informed decisions and grow wealth effectively.
            </p>
          </div>
          <div>
            <h5>Who We Are</h5>
            <p>
              GainsVault is a team of passionate professionals dedicated to
              creating a platform that simplifies financial management. With
              expertise in technology, finance, and customer service, we are
              committed to delivering excellence in everything we do.
            </p>
          </div>
          <div>
            <h5>Our Values</h5>
            <p>
              We believe in transparency, innovation, and customer-centricity.
              These values guide us in building trust with our users and
              continuously improving our services to meet their needs.
            </p>
          </div>
          <div>
            <h5>Our Team</h5>
            <p>
              Our team consists of talented individuals from diverse
              backgrounds, united by a shared vision of making financial
              management accessible to everyone. We are proud to work together
              to bring GainsVault to life.
            </p>
          </div>
          <div>
            <h5>Contact Us</h5>
            <p>
              Have questions or feedback? We'd love to hear from you! Reach out
              to us at{" "}
              <a href="mailto:gainsvault@support.com" className="text-light">
                gainsvault@support.com
              </a>
              .
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AboutUs
