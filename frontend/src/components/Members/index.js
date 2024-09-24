import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';  // For loading spinner
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';  // Icons from react-icons

function Members({ isOwner }) {
  const [members, setMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Loader state
  const [serverError, setServerError] = useState(''); // Server error state
  const [formError, setFormError] = useState('');     // Form error state
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

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setServerError('Failed to load members. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
    setIsEdit(false);
    setCurrentMemberId(null);
  };

  const handleShow = () => setShow(true);

  const resetForm = () => {
    setNewMember({
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
    const { firstName, lastName, email, membershipType, paymentMode } = newMember;
    if (!firstName || !lastName || !email || !membershipType || !paymentMode) {
      setFormError('All fields are required.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSaveMember = async () => {
    if (!validateForm()) return; // Exit if form is invalid
    setIsLoading(true);
    setServerError(''); // Clear any previous server error

    try {
      if (isEdit) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Adding delay for UX
        await axios.put(`/api/members/${currentMemberId}`, newMember);
      } else {
        await axios.post('/api/members', newMember);
      }
      fetchMembers();
      handleClose();
    } catch (error) {
      console.error('Error saving member:', error);
      setServerError('Error occurred while saving. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = (member) => {
    setIsEdit(true);
    setCurrentMemberId(member._id);
    setNewMember({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      membershipType: member.membershipType,
      paymentMode: member.paymentMode,
      workoutExperience: member.workoutExperience,
      membershipStart: member.membershipStart,
      membershipEnd: member.membershipEnd,
    });
    handleShow();
  };

  const handleRemoveMember = async (id) => {
    setIsLoading(true);
    setServerError(''); // Clear any previous server error
    try {
      await axios.delete(`/api/members/${id}`);
      fetchMembers();
    } catch (error) {
      console.error('Error removing member:', error);
      setServerError('Error occurred while removing. Please try again.');
    } finally {
      setIsLoading(false);
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
      {serverError && <p className="text-danger text-center">{serverError}</p>}
      {members.length === 0 ? (
        <p className="text-center">No members found. Please add members.</p>
      ) : (
        <Row>
          {members.map(member => (
            <Col md={4} key={member._id} className="mb-4">
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
                    <>
                      <Button 
                        variant="primary" 
                        className="me-2" 
                        onClick={() => handleEditMember(member)}
                        disabled={isLoading}  // Disable when loading
                      >
                        {isLoading ? <Spinner animation="border" size="sm" /> : <FaEdit />} Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={() => handleRemoveMember(member._id)} 
                        disabled={isLoading}  // Disable when loading
                      >
                        {isLoading ? <Spinner animation="border" size="sm" /> : <FaTrash />} Remove
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Button 
        variant="success" 
        onClick={handleShow} 
        className="mb-4"
        disabled={isLoading}  // Disable when loading
      >
        {isLoading ? <Spinner animation="border" size="sm" /> : <FaPlus />} Add Member
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Member' : 'Add New Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formError && <p className="text-danger">{formError}</p>}
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
            {serverError && <p className="text-danger">{serverError}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSaveMember} 
            disabled={isLoading}  // Disable when loading
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : (isEdit ? 'Update Member' : 'Add Member')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Members;
