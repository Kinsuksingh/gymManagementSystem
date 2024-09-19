import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


function SignUp() {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for signup
  const handleRegister = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Mocking a successful registration
    if (username && email && password) {
      // For real-world use, you would send data to backend here
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/Login'), 2000); // Redirect to login page after successful registration
    } else {
      setError('Please fill in all fields!');
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100vh' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Create Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>} {/* Display error message if any */}
            {success && <p className="text-success">{success}</p>} {/* Display success message if any */}

            <div className="d-flex">
              <Button variant="primary" type="submit">
                SignUp
              </Button>
              <Button variant="secondary" className="ms-3" onClick={() => navigate('/Login')}>
                Back to Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
