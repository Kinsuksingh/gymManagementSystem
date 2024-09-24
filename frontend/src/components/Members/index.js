import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Alert, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaExclamationCircle, FaPlusCircle, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';

function Members({ isOwner }) {
  const [members, setMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState({}); // Store loading state for each member
  const [serverError, setServerError] = useState('');
  const [formError, setFormError] = useState('');
  const [newMember, setNewMember] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    membershipType: '',
    paymentMode: '',
    workoutExperience: '',
    membershipStart: '',
    membershipEnd: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoadingAdd(true); // Consider changing this to a loading state for fetching members if needed
    try {
      const response = await axios.get('/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setServerError('Failed to load members. Please try again.');
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
    setIsEdit(false);
    setCurrentUserId(null);
  };

  const handleShow = () => setShow(true);

  const resetForm = () => {
    setNewMember({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      membershipType: '',
      paymentMode: '',
      workoutExperience: '',
      membershipStart: '',
      membershipEnd: '',
    });
    setFormError('');
    setServerError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { userId, firstName, lastName, email, membershipType, paymentMode } = newMember;
    if (!userId || !firstName || !lastName || !email || !membershipType || !paymentMode) {
      setFormError('All fields are required.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSaveMember = async () => {
    if (!validateForm()) return; // Exit if form is invalid
    setLoadingAdd(true);
    setServerError(''); // Clear any previous server error

    try {
      if (isEdit) {
        await axios.put(`/api/members/${currentUserId}`, newMember);
      } else {
        await axios.post('/api/members', newMember);
      }
      fetchMembers();
      handleClose();
    } catch (error) {
      console.error('Error saving member:', error);
      setServerError('Error occurred while saving. Please fill start and end date field try again .');
    } finally {
      setLoadingAdd(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will return date in "yyyy-MM-dd" format
  };

  const handleEditMember = (member) => {
    setIsEdit(true);
    setCurrentUserId(member.userId); // Use userId for editing
    setNewMember({
      userId: member.userId,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      membershipType: member.membershipType,
      paymentMode: member.paymentMode,
      workoutExperience: member.workoutExperience,
      membershipStart: formatDate(member.membershipStart), // Format date here
      membershipEnd: formatDate(member.membershipEnd), 
    });
    handleShow();
  };

  const handleRemoveMember = async (userId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setLoadingRemove(prev => ({ ...prev, [userId]: true })); // Set loading for this member
      setServerError('');
      try {
        await axios.delete(`/api/members/${userId}`); // Remove based on userId
        fetchMembers();
      } catch (error) {
        console.error('Error removing member:', error);
        setServerError('Error occurred while removing. Please try again.');
      } finally {
        setLoadingRemove(prev => ({ ...prev, [userId]: false })); // Reset loading for this member
      }
    }
  };

  if (!isOwner) {
    return (
      <Container>
        <h1 className="text-center my-4">Access Denied</h1>
        <p className="text-center">Sorry, you are not authorized to access this page.</p>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "65px" }}>
      <h1 className="text-center my-4">Our Members</h1>
      <Button 
        variant="success" 
        onClick={handleShow} 
        className="mb-4"
        disabled={loadingAdd} // Use loadingAdd for the button
      >
        <FaPlusCircle className='mb-1' /> Add Member
      </Button>

      {members.length === 0 ? (
        <Col className="text-center">
          <FaExclamationCircle size={100} className="mb-3" />
          <h3>{serverError ? "Internal Server Error" : "No members found. Please add members."}</h3>
        </Col>
      ) : (
        <Row>
          {members.map(member => (
            <Col md={4} key={member.userId} className="mb-4"> {/* Use userId as the key */}
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FaUserCircle size={75} className="me-3" /> {/* Placeholder for member photo */}
                    <div>
                      <Card.Title className="mb-2 text-muted">UserId: <strong>{member.userId}</strong></Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{member.firstName} {member.lastName}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">{member.email}</Card.Subtitle>
                    </div>
                  </div>
                  <Card.Text>
                    Membership Type: <strong>{member.membershipType}</strong><br />
                    Payment Mode: <strong>{member.paymentMode}</strong><br />
                    Workout Experience: <strong>{member.workoutExperience}</strong><br />
                    Membership: <strong>{member.membershipStart} to {member.membershipEnd}</strong>
                  </Card.Text>
                  <Button 
                    variant="warning" 
                    className="me-2" 
                    onClick={() => handleEditMember(member)}
                    disabled={loadingAdd} // Use loadingAdd for the button
                  >
                    <FaEdit className='mb-1' /> Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleRemoveMember(member.userId)} // Remove based on userId
                    disabled={loadingRemove[member.userId]} // Disable if this member is loading
                  >
                    {loadingRemove[member.userId] ? <><Spinner animation="border" size="sm" /> Removing...</> : !loadingRemove[member.userId] && <><FaTrash className='mb-1' /> Remove</>} 
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Member' : 'Add New Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" name="userId" value={newMember.userId} onChange={handleChange} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" value={newMember.firstName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" value={newMember.lastName} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={newMember.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Membership Type</Form.Label>
              <Form.Control type="text" name="membershipType" value={newMember.membershipType} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Control type="text" name="paymentMode" value={newMember.paymentMode} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Workout Experience</Form.Label>
              <Form.Control type="text" name="workoutExperience" value={newMember.workoutExperience} onChange={handleChange} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Membership Start</Form.Label>
                  <Form.Control type="date" name="membershipStart" value={newMember.membershipStart} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Membership End</Form.Label>
                  <Form.Control type="date" name="membershipEnd" value={newMember.membershipEnd} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            {formError && <Alert variant="danger">{formError}</Alert>}
            {serverError && <Alert variant="danger">{serverError}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loadingAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveMember} disabled={loadingAdd}>
            {loadingAdd ? <><Spinner animation="border" size="sm" /> {isEdit ? 'Updating...' : 'Adding...'}</> : isEdit ? 'Save Changes' : 'Add Member'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Members;
