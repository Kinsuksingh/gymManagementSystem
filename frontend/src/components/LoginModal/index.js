import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Card } from 'react-bootstrap';

function LoginModal({ show, settingIsLogin, handleClose, settingUserType }) {
  const [userType, setUserType] = useState(''); // Tracks selected user type
  const [formData, setFormData] = useState({ username: '', userId: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, userId, password } = formData;

    if (userType === 'Gym Owner') {
      if (userId === '1' && password === 'okinsuk') { // Replace with real validation logic
        settingUserType(true);
        settingIsLogin(true);
        handleClose();
        navigate('/');
      } else {
        setError('Invalid owner credentials!');
      }
    } else if (userType === 'Regular Gym Goer') {
      if (username === 'kinsuk' && userId === '1') { // Replace with real validation logic
        settingUserType(false);
        settingIsLogin(true);
        handleClose();
        navigate('/');
      } else {
        setError('Invalid user credentials!');
      }
    } else {
      setError('Please select a user type!');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ width: '100%', maxWidth: '30rem', minWidth: '15rem' }}>
          <Card.Body>
            <Form.Group className="mb-3" controlId="userTypeSelect">
              <Form.Label>Select User Type</Form.Label>
              <Form.Select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                <option value="">Select...</option>
                <option value="Regular Gym Goer">Regular Gym Goer</option>
                <option value="Gym Owner">Gym Owner</option>
              </Form.Select>
            </Form.Group>

            <Form onSubmit={handleLogin}>
              {userType === 'Gym Owner' && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicOwnerId">
                    <Form.Label>Owner ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      placeholder="Enter owner ID"
                      value={formData.userId}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password (Owner)</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter owner password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="false"
                    />
                  </Form.Group>
                </>
              )}

              {userType === 'Regular Gym Goer' && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicUserId">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      placeholder="Enter user ID"
                      value={formData.userId}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {error && <p className="text-danger">{error}</p>}
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
