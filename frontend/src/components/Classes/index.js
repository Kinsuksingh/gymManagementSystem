import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Classes.css';

// Dummy data for classes
const initialClasses = [
    { id: 1, name: 'Yoga Class', instructor: 'Alice Johnson', schedule: 'Monday & Wednesday, 6 PM - 7 PM', description: 'A relaxing yoga class.', image: '' },
    { id: 2, name: 'Spin Class', instructor: 'Bob Brown', schedule: 'Tuesday & Thursday, 5 PM - 6 PM', description: 'High-energy spin class.', image: '' },
    { id: 3, name: 'Pilates', instructor: 'Charlie Davis', schedule: 'Friday, 7 AM - 8 AM', description: 'Core strengthening Pilates.', image: '' },
    { id: 4, name: 'Zumba', instructor: 'Jane Smith', schedule: 'Saturday, 10 AM - 11 AM', description: 'Fun dance workout.', image: '' },
    { id: 5, name: 'Body Pump', instructor: 'John Doe', schedule: 'Sunday, 9 AM - 10 AM', description: 'Full-body strength training.', image: '' },
];

function Classes({ isOwner }) {
    const [classes, setClasses] = useState(initialClasses);
    const [showModal, setShowModal] = useState(false);
    const [newClass, setNewClass] = useState({
        name: '',
        instructor: '',
        schedule: '',
        description: '',
        image: ''
});

  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass({ ...newClass, [name]: value });
  }

    const handleAddClass = () => {
        setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
        setNewClass({
            name: '',
            instructor: '',
            schedule: '',
            description: '',
            image: ''
        });
        setShowModal(false);
};

  const handleRemoveClass = (id) => {
    setClasses(classes.filter(classItem => classItem.id !== id));
  };

  return (
    <Container className='classes-section'>
      <h1 className="text-center my-4">Gym Classes</h1>
      {isOwner && (
        <Button variant="success" onClick={() => setShowModal(true)} className="mb-4">
          Add Class
        </Button>
      )}
      <Row>
        {classes.map(classItem => (
          <Col md={4} key={classItem.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{classItem.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Instructor: {classItem.instructor}</Card.Subtitle>
                <Card.Text>
                  Schedule: <strong>{classItem.schedule}</strong>
                </Card.Text>
                <Card.Text>
                  Description: {classItem.description}
                </Card.Text>
                {classItem.image ? (
                  <Card.Img variant="top" src={classItem.image} alt={classItem.name} />
                ) : (
                  <Card.Img variant="top" src="placeholder.jpg" alt="No image available" />
                )}
                {isOwner && (
                  <Button variant="danger" onClick={() => handleRemoveClass(classItem.id)}>Remove Class</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Class Title</Form.Label>
              <Form.Control type="text" name="name" value={newClass.name} onChange={handleInputChange} placeholder="Class Title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructor Name</Form.Label>
              <Form.Control type="text" name="instructor" value={newClass.instructor} onChange={handleInputChange} placeholder="Instructor Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Schedule</Form.Label>
              <Form.Control type="text" name="schedule" value={newClass.schedule} onChange={handleInputChange} placeholder="Schedule" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={newClass.description} onChange={handleInputChange} placeholder="Class Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class Image (URL)</Form.Label>
              <Form.Control type="text" name="image" value={newClass.image} onChange={handleInputChange} placeholder="Image URL (optional)" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddClass}>
            Add Class
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Classes;

