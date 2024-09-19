import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

// Dummy user data for login validation
const dummyUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123'
};

function Login() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Validate login credentials
    if (username === dummyUser.username && email === dummyUser.email && password === dummyUser.password) {
      navigate('/'); // Navigate to home route upon successful login
    } else {
      setError('Invalid credentials, please try again!');
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100vh' }}>
      <Card style={{ width: '100%' , maxWidth:'30rem', minWidth:'15rem' }}>
        <Card.Body>
          <Form onSubmit={handleLogin}>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>} {/* Display error message if any */}
            <div className="d-flex">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button variant="success" type="submit" className="ms-3" onClick={()=> navigate('/signup')}>
                SignUp
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );  
}

export default Login;