import React from 'react';
import { Container, Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Homepage.css';

const Homepage = () => {
  const carouselItems = [
    {
      title: "Track Your Progress",
      description: "Monitor your fitness journey with detailed analytics and progress tracking",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Custom Workout Plans",
      description: "Create and follow personalized workout routines tailored to your goals",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Exercise Library",
      description: "Access a comprehensive database of exercises with proper form guidance",
      image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const features = [
    {
      title: "Exercise Tracking",
      description: "Log and track your exercises with detailed metrics",
      icon: "💪",
      link: "/exercises"
    },
    {
      title: "Workout Splits",
      description: "Create and manage your workout splits",
      icon: "📊",
      link: "/splits"
    },
    {
      title: "Progress Analytics",
      description: "View your progress with interactive charts",
      icon: "📈",
      link: "/profile"
    }
  ];

  return (
    <Container fluid className="homepage-container">
      {/* Hero Section with Carousel */}
      <Carousel 
        className="hero-carousel"
        fade={false}
        interval={5000}
        controls={true}
        indicators={true}
        pause="hover"
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <motion.div
              className="carousel-content"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
              />
              <Carousel.Caption>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
      <Container className="features-section">
        <Row className="justify-content-center">
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="feature-card">
                  <Card.Body>
                    <div className="feature-icon">{feature.icon}</div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                    <Link to={feature.link}>
                      <Button variant="primary" className="feature-button">
                        Learn More
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Call to Action Section */}
      <Container className="cta-section text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Start Your Fitness Journey Today</h2>
          <p>Join thousands of users who are already achieving their fitness goals</p>
          <Link to="/auth/register">
            <Button variant="primary" size="lg" className="cta-button">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Container>
  );
};

export default Homepage;
