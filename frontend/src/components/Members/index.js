import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// Dummy data for members
const initialMembers = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', membershipType: 'Gold', paymentMode: 'Credit Card', workoutExperience: 'Intermediate', membershipStart: '2023-01-01', membershipEnd: '2023-12-31' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', membershipType: 'Silver', paymentMode: 'Cash', workoutExperience: 'Beginner', membershipStart: '2023-02-01', membershipEnd: '2023-11-30' },
  // Add more dummy data as needed
];

function Members({ isOwner }) {
  const [members, setMembers] = useState(initialMembers);
  const [show, setShow] = useState(false);
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    membershipType: '',
    paymentMode: '',
    workoutExperience: '',
    membershipStart: '',
    membershipEnd: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value
    });
  };

  const handleAddMember = () => {
    setMembers([...members, { ...newMember, id: members.length + 1 }]);
    handleClose();
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  if (!isOwner || !isOwner) {
    return (
      <Container>
        <h1 className="text-center my-4">Access Denied</h1>
        <p className="text-center">Sorry, you are not authorized to access this page.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center my-4">Our Members</h1>
      {isOwner && (
        <Button variant="success" onClick={handleShow} className="mb-4">Add Member</Button>
      )}
      <Row>
        {members.map(member => (
          <Col md={4} key={member.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{member.firstName} {member.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.email}</Card.Subtitle>
                <Card.Text>
                  Membership Type: <strong>{member.membershipType}</strong><br />
                  Payment Mode: <strong>{member.paymentMode}</strong><br />
                  Workout Experience: <strong>{member.workoutExperience}</strong><br />
                  Membership: <strong>{member.membershipStart} to {member.membershipEnd}</strong>
                </Card.Text>
                {isOwner && (
                  <Button variant="danger" onClick={() => handleRemoveMember(member.id)}>Remove Member</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={newMember.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={newMember.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={newMember.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Membership Type</Form.Label>
              <Form.Control type="text" name="membershipType" value={newMember.membershipType} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="membershipStart" value={newMember.membershipStart} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="membershipEnd" value={newMember.membershipEnd} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mode of Payment</Form.Label>
              <Form.Control type="text" name="paymentMode" value={newMember.paymentMode} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Workout Experience</Form.Label>
              <Form.Control type="text" name="workoutExperience" value={newMember.workoutExperience} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMember}>
            Add Member
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Members;
