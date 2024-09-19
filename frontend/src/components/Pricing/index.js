import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Pricing({ isOwner }) {
  const [showModal, setShowModal] = useState(false); // For showing the modal
  const [pricingPlans, setPricingPlans] = useState([
    { id: 1, duration: '1 Month', price: 30 },
    { id: 2, duration: '3 Months', price: 75 },
    { id: 3, duration: '6 Months', price: 140 },
    { id: 4, duration: '12 Months', price: 250 },
  ]);

  const [newPlan, setNewPlan] = useState({
    membershipType: '',
    duration: '',
    price: '',
    offers: ''
  });

  // Open/close modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({
      ...newPlan,
      [name]: value
    });
  };

  // Handle form submission to add new pricing
  const handleAddPricing = (e) => {
    e.preventDefault();
    const newPricing = {
      id: pricingPlans.length + 1,
      duration: newPlan.duration,
      price: newPlan.price,
      offers: newPlan.offers,
    };
    setPricingPlans([...pricingPlans, newPricing]);
    setNewPlan({ membershipType: '', duration: '', price: '', offers: '' });
    handleCloseModal();
  };

  // Handle removing pricing
  const handleRemovePricing = (id) => {
    const updatedPlans = pricingPlans.filter(plan => plan.id !== id);
    setPricingPlans(updatedPlans);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Membership Pricing</h1>

      {isOwner && (
        <div className="text-start mb-4">
          <Button variant="success" onClick={handleShowModal}>Add Pricing</Button>
        </div>
      )}

      <Row>
        {pricingPlans.map(plan => (
          <Col md={6} lg={3} key={plan.id} className="mb-4">
            <Card>
              <Card.Body className='text-center'>
                    <Card.Title>{plan.duration}</Card.Title>
                    <h3>₹{plan.price}</h3>
                    <p className="text-muted">per {plan.duration}</p>
                    {plan.offers && <h6 className="text-success">Offer: {plan.offers}</h6>}
                    {isOwner && <Button variant="primary" className="me-2">Sign Up</Button>}
                    {isOwner && (
                        <Button variant="danger" onClick={() => handleRemovePricing(plan.id)}>Remove</Button>
                    )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for adding new pricing */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Pricing Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPricing}>
            <Form.Group className="mb-3" controlId="formMembershipType">
              <Form.Label>Membership Type</Form.Label>
              <Form.Control
                type="text"
                name="membershipType"
                value={newPlan.membershipType}
                onChange={handleInputChange}
                placeholder="Enter membership type"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={newPlan.duration}
                onChange={handleInputChange}
                placeholder="Enter duration (e.g., 1 Month, 3 Months)"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price (INR)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newPlan.price}
                onChange={handleInputChange}
                placeholder="Enter price in INR"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOffers">
              <Form.Label>Offers (optional)</Form.Label>
              <Form.Control
                type="text"
                name="offers"
                value={newPlan.offers}
                onChange={handleInputChange}
                placeholder="Enter any offers"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Pricing
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Pricing;

