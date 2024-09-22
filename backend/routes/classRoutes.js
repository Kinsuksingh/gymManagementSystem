import express from 'express';
import ClassController from '../controllers/classController.js'; // Adjust the path

const router = express.Router();

router.post('/classes', ClassController.addClass); // Create class
router.get('/classes', ClassController.getClasses); // Read all classes
router.get('/classes/:id', ClassController.getClassById); // Read class by ID
router.put('/classes/:id', ClassController.updateClass); // Update class by ID
router.delete('/classes/:id', ClassController.deleteClass); // Delete class by ID

export default router;

