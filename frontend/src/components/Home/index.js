import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Home.css'; // Custom styles (if needed)

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <Container>
          <h1>Welcome to The Bros Gym</h1>
          <p>Your journey to fitness starts here!</p>
          <Button variant="light" size="lg" href="/classes">
            Explore Classes
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Personal Training</Card.Title>
                  <Card.Text>
                    Get one-on-one training with our expert coaches to reach your fitness goals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Group Classes</Card.Title>
                  <Card.Text>
                    Join group classes for a motivating and social workout experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Nutrition Guidance</Card.Title>
                  <Card.Text>
                    Get personalized nutrition advice to complement your fitness routine.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Classes Section */}
      <section className="classes bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Our Classes</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Yoga</Card.Title>
                  <Card.Text>
                    Improve flexibility and relaxation with our yoga classes.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Strength Training</Card.Title>
                  <Card.Text>
                    Build muscle and strength with our specialized training sessions.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Cardio</Card.Title>
                  <Card.Text>
                    Boost your endurance and cardiovascular health with cardio workouts.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <Container>
          <h2 className="text-center mb-4">What Our Members Say</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <Card.Text>
                    "FitGym has transformed my life! The trainers are fantastic and the community is supportive."
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Jane Doe</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <Card.Text>
                    "I love the variety of classes offered at FitGym. It's the perfect place to stay fit and have fun."
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">John Smith</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <Card.Text>
                    "The best gym experience I've ever had. Highly recommend to anyone looking for a great workout."
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Emily Johnson</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta bg-dark text-white text-center py-5">
        <Container >
          <h2>Ready to Get Started?</h2>
          <p>Join us today and take the first step towards a healthier you!</p>
          <Button variant="light" size="lg">
            Sign Up Now
          </Button>
        </Container>
      </section>
    </div>
  );
}

export default Home;
