import React from "react"
import { Container, Card } from "react-bootstrap"

const Help = () => {
  return (
    <Container className="my-5">
      <Card bg="dark" text="light" className="p-4 shadow">
        <Card.Body>
          <Card.Title
            className="text-warning mb-4"
            style={{ fontSize: "1.8rem" }}
          >
            Help & Support
          </Card.Title>
          <div>
            <h5>Getting Started</h5>
            <p>
              New to GainsVault? No problem! Visit our{" "}
              <a href="/getting-started" className="text-light">
                Getting Started
              </a>{" "}
              page for a step-by-step guide on how to create an account, set up
              your profile, and start managing your finances effectively.
            </p>
          </div>
          <div>
            <h5>FAQs</h5>
            <p>
              Have questions? Check out our{" "}
              <a href="/faqs" className="text-light">
                Frequently Asked Questions
              </a>{" "}
              section for answers to common queries about our platform,
              features, and services.
            </p>
          </div>
          {/* <div>
            <h5>Troubleshooting</h5>
            <p>
              Encountering issues? Visit our{" "}
              <a href="/troubleshooting" className="text-light">
                Troubleshooting
              </a>{" "}
              page for solutions to common problems or errors you might face
              while using GainsVault.
            </p>
          </div> */}
          <div>
            <h5>Contact Support</h5>
            <p>
              Need further assistance? Our support team is here to help! Reach
              out to us at{" "}
              <a href="mailto:support@gainsvault.com" className="text-light">
                support@gainsvault.com
              </a>{" "}
              or use the{" "}
              <a href="/contact-support" className="text-light">
                Contact Support
              </a>{" "}
              form on our website.
            </p>
          </div>
          <div>
            <h5>Community</h5>
            <p>
              Join our community of users to share tips, ask questions, and
              learn from others. Visit our{" "}
              <a href="/community" className="text-light">
                Community Forum
              </a>{" "}
              to connect with like-minded individuals.
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Help
