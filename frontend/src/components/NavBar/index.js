import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuDumbbell } from "react-icons/lu";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import LoginModal from '../LoginModal';

function NavBar({onLogout, isOwner, settingUserType }) {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogin(false)
    onLogout();
    navigate('/'); // Redirect to home page after logout
  };

  const handleLoginClick = () => {
    setShowModal(true); // Show modal when Login is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand as={Link} to="/">Bros<LuDumbbell />Gym</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/classes">Classes</Nav.Link>
              {isOwner && <Nav.Link as={Link} to="/members">Members</Nav.Link>}
              <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
              <Nav.Link as={Link} to="/account">Account</Nav.Link>
            </Nav>
            <Nav>
              <Button
                variant={isLogin ? "outline-danger" : "outline-primary"}
                onClick={isLogin ? handleLogout : handleLoginClick}
              >
                {isLogin ? "Logout" : "Login"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for login */}
      <LoginModal settingIsLogin={(value)=>{setIsLogin(value)}} show={showModal} handleClose={handleCloseModal} settingUserType={(type) => settingUserType(type)} />
    </>
  );
}

export default NavBar;



