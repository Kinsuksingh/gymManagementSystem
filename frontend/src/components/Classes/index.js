import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {Container,Col,Row,Alert,Card,Button,Modal,Form,Spinner } from 'react-bootstrap';
import { FaExclamationCircle, FaEdit, FaTrashAlt, FaPlusCircle, FaPlayCircle } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import './Classes.css';

function Classes({ isOwner }) {
    const [serverErr, setServerErr] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingRemove, setLoadingRemove] = useState({});
    const [loadingFetch, setLoadingFetch] = useState(true);
    const [classes, setClasses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newClass, setNewClass] = useState({
        id: '',
        name: '',
        instructor: '',
        schedule: '',
        description: '',
        image: ''
    });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Track if editing or adding
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                setServerErr(false);
                const response = await axios.get('/api/classes');
                await delay(400);
                setClasses(response.data);
            } catch (error) {
                setServerErr(true);
                console.error('Error fetching classes:', error);
            } finally {
                setLoadingFetch(false);
            }
        };

        fetchClasses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass({ ...newClass, [name]: value });
        setError('');
    };

    const handleAddClass = async () => {
        if (!newClass.name || !newClass.instructor || !newClass.schedule || !newClass.description) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoadingAdd(true);
        const classWithId = {
            id: uuidv4(),
            name: newClass.name,
            instructor: newClass.instructor,
            schedule: newClass.schedule,
            description: truncateDescription(newClass.description),
            image: newClass.image
        };

        try {
            await axios.post('/api/classes', classWithId);
            setClasses([...classes, classWithId]);
            resetModal();
        } catch (error) {
            console.error('Error adding class:', error);
        } finally {
            setLoadingAdd(false);
        }
    };

    const handleEditClass = async () => {
        if (!newClass.name || !newClass.instructor || !newClass.schedule || !newClass.description) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoadingAdd(true);
        const updatedClass = {
            ...newClass,
            description: truncateDescription(newClass.description)
        };

        try {
            await axios.put(`/api/classes/${newClass.id}`, updatedClass);
            setClasses(classes.map(classItem => classItem.id === newClass.id ? updatedClass : classItem));
            resetModal();
        } catch (error) {
            console.error('Error editing class:', error);
        } finally {
            setLoadingAdd(false);
        }
    };

    const handleRemoveClass = async (id) => {
        setLoadingRemove((prev) => ({ ...prev, [id]: true }));
        try {
            await axios.delete(`/api/classes/${id}`);
            setClasses(classes.filter(classItem => classItem.id !== id));
        } catch (error) {
            console.error('Error removing class:', error);
        } finally {
            setLoadingRemove((prev) => ({ ...prev, [id]: false }));
        }
    };

    const openEditModal = (classItem) => {
        setNewClass(classItem);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetModal = () => {
        setNewClass({ id: '', name: '', instructor: '', schedule: '', description: '', image: '' });
        setIsEditing(false);
        setShowModal(false);
    };

    const truncateDescription = (text) => {
        if (text.length <= 60) return text;
        return text.substring(0, 70) + '...';
    };

    return (
        <Container className='classes-section'>
            <h1 className="text-center my-4">Gym Classes</h1>
            {isOwner && (
                <Button variant="success" onClick={() => setShowModal(true)} className="mb-4">
                    <FaPlusCircle className='mb-1' /> Add Class
                </Button>
            )}

            {loadingFetch ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    {classes.length === 0 ? (
                        <Col className="text-center">
                            <FaExclamationCircle size={100} className="mb-3" />
                            <h3>{serverErr ? "Internal Server Error" : "Classes not available"}</h3>
                        </Col>
                    ) : (
                        classes.map(classItem => (
                            <Col md={4} key={classItem.id} className="mb-4">
                                <Card>
                                    {classItem.image ? (
                                        <Card.Img variant="top" src={classItem.image} alt={classItem.name} className="card-img" />
                                    ) : (
                                        <div className="text-center">
                                            <FaRegImage size={200} />
                                        </div>
                                    )}
                                    <Card.Body>
                                        <Card.Title>{classItem.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Instructor: {classItem.instructor}</Card.Subtitle>
                                        <Card.Text>
                                            Schedule: <strong>{classItem.schedule}</strong>
                                        </Card.Text>
                                        <Card.Text>
                                            Description: {classItem.description}
                                        </Card.Text>
                                    </Card.Body>
                                    {isOwner ? (
                                        <div className='d-flex m-3'>
                                            <Button className='me-2' variant="warning" onClick={() => openEditModal(classItem)}>
                                                <FaEdit className='mb-1' /> Edit
                                            </Button>
                                            <Button variant="danger" onClick={() => handleRemoveClass(classItem.id)} disabled={loadingRemove[classItem.id]}>
                                                {loadingRemove[classItem.id] ? (
                                                    <>
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                        Removing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaTrashAlt className='mb-1' /> Remove Class
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button className='m-2' variant="success">
                                            <FaPlayCircle /> Start Now
                                        </Button>
                                    )}
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            )}

            <Modal show={showModal} onHide={resetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Class' : 'Add New Class'}</Modal.Title>
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
                    {error && <Alert className='text-center' variant="danger">{error}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={isEditing ? handleEditClass : handleAddClass} disabled={loadingAdd}>
                        {loadingAdd ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {isEditing ? 'Updating...' : 'Adding...'}
                            </>
                        ) : (
                            isEditing ? 'Save Changes' : 'Add Class'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Classes;
