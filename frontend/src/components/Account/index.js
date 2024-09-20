import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Account.css'

// Dummy data for user account
const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  membershipType: 'Gold',
};

function Account() {
  const [user, setUser] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add logic to save user data here
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  return (
    <Container className='acount-section'>
      <h1 className="text-center my-4">Your Account</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMembership">
                  <Form.Label>Membership Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="membershipType"
                    value={user.membershipType}
                    onChange={handleChange}
                    readOnly={!editMode}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  {editMode ? (
                    <>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                      <Button variant="secondary" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => setEditMode(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
