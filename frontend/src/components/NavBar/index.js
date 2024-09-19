import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom';
import { LuDumbbell } from "react-icons/lu";

function NavBar({isLogin, onLogout, isOwner }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout action here
    onLogout();
    navigate('/test'); // Redirect to login page after logout
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">Bros<LuDumbbell />Gym</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/classes">Classes</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={Link} to="/account">Account</Nav.Link>
            {isOwner && <Nav.Link as={Link} to="/members">Members</Nav.Link>}
          </Nav>
          <Nav>
            <Button variant={isLogin ? "outline-primary":"outline-danger"} onClick={handleLogout}>
              {isLogin ? "Login" : "LogOut"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;






