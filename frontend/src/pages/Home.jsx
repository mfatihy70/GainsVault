import React from "react"
import { Container, Row, Col, Carousel, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/home.css"

const Home = () => {
  const carouselItems = [
    {
      title: "Track Your Progress",
      description:
        "Monitor your fitness journey with detailed analytics and progress tracking",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Custom Workout Plans",
      description:
        "Create and follow personalized workout routines tailored to your goals",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Exercise Library",
      description:
        "Access a comprehensive database of exercises with proper form guidance",
      image:
        "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ]

  const features = [
    {
      title: "Exercise Tracking",
      description: "Log and track your exercises with detailed metrics",
      icon: "💪",
      link: "/exercises",
    },
    {
      title: "Workout Splits",
      description: "Create and manage your workout splits",
      icon: "📊",
      link: "/splits",
    },
    {
      title: "Progress Analytics",
      description: "View your progress with interactive charts",
      icon: "📈",
      link: "/profile",
    },
  ]

  return (
    <Container fluid className="p-0 overflow-hidden bg-dark text-light">
      {/* Hero Section with Carousel */}
      <Carousel interval={5000} controls indicators pause="hover">
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <motion.div
              className="position-relative"
              style={{ height: "80vh", minHeight: "500px" }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="d-block w-100 h-100 object-fit-cover"
                src={item.image}
                alt={item.title}
                style={{ filter: "brightness(0.7)" }}
              />
              <Carousel.Caption
                className="text-start px-5"
                style={{ bottom: "30%" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.h2
                    className="fw-bold display-4"
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    className="fs-5"
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              </Carousel.Caption>
            </motion.div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-100 bg-dark text-light border-warning shadow rounded-4">
                  <Card.Body>
                    <div className="fs-1 mb-3">{feature.icon}</div>
                    <Card.Title className="fs-4 fw-bold">
                      {feature.title}
                    </Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                    <Link to={feature.link}>
                      <motion.div
                        // whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button
                          variant="warning"
                          className="w-100 mt-3 fw-medium"
                        >
                          Learn More
                        </Button>
                      </motion.div>
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Start your fitness journey */}
      <Container
        fluid
        className="text-center border border-warning rounded-5  py-5"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="fw-bold display-5 mb-3">
            Start Your Fitness Journey Today
          </h2>
          <p className="fs-5 mb-4">
            Join thousands of users who are already achieving their fitness
            goals
          </p>
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="warning"
                size="lg"
                className="px-4 py-2 fw-bold rounded-pill text-dark"
              >
                Get Started
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </Container>
    </Container>
  )
}

export default Home
