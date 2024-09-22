import Class from '../models/classModel.js'; // Adjust the import based on your model's path

class ClassController {
    // Create (Add) a new class
    static async addClass(req, res) {
        try {
            const newClass = new Class(req.body); // Create a new class document
            await newClass.save(); // Save to the database
            res.status(201).json({ message: 'Class added successfully', data: newClass });
        } catch (error) {
            res.status(500).json({ message: 'Error adding class', error: error.message });
        }
    }

    // Read (Get all classes)
    static async getClasses(req, res) {
        try {
            const classes = await Class.find(); // Fetch all classes from the database
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching classes', error: error.message });
        }
    }
    // findOne({ name: className });
    // Read (Get a single class by ID)
    static async getClassById(req, res) {
        try {
            const classItem = await Class.findOne({id:req.params.id}); // Find class by ID
            if (!classItem) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json(classItem);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching class', error: error.message });
        }
    }

    // Update (Edit a class)
    static async updateClass(req, res) {
        try {
            const updatedClass = await Class.findOneAndUpdate({id:req.params.id}, req.body, { new: true, runValidators: true });
            if (!updatedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json({ message: 'Class updated successfully', data: updatedClass });
        } catch (error) {
            res.status(500).json({ message: 'Error updating class', error: error.message });
        }
    }

    // Delete (Remove a class)
    static async deleteClass(req, res) {
        try {
            const classItem = await Class.findOneAndDelete({id:req.params.id}); // Find and delete class by ID
            if (!classItem) {
                return res.status(404).json({ message: 'Class not found' });
            }
            res.status(200).json({ message: 'Class deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting class', error: error.message });
        }
    }
}

export default ClassController;
