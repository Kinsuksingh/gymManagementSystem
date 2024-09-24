// routes/members.js
import express from 'express';
import MemberController from '../controllers/memberController.js';

const router = express.Router();

// Route to fetch all members
router.get('/', MemberController.getAllMembers);

// Route to create a new member
router.post('/', MemberController.createMember);

// Route to update a member by ID
router.put('/:id', MemberController.updateMember);

// Route to delete a member by ID
router.delete('/:id', MemberController.deleteMember);

export default router;
