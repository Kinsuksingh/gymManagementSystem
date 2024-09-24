// controllers/memberController.js
import Member from '../models/memberModal.js';

class MemberController {
  // Fetch all members
  static async getAllMembers(req, res) {
    try {
      const members = await Member.find();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create a new member
  static async createMember(req, res) {
    const { userId, firstName, lastName, email, membershipType, paymentMode, workoutExperience, membershipStart, membershipEnd } = req.body;

    try {
      const newMember = new Member({
        userId,
        firstName,
        lastName,
        email,
        membershipType,
        paymentMode,
        workoutExperience,
        membershipStart,
        membershipEnd,
    });

      await newMember.save();
      res.status(201).json(newMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update a member by ID
  static async updateMember(req, res) {
    try {
      const member = await Member.findOne({userId:req.params.id});
      if (!member) return res.status(404).json({ message: 'Member not found' });

      Object.assign(member, req.body); // Update with new data
      const updatedMember = await member.save();
      res.json(updatedMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a member by ID
  static async deleteMember(req, res) {
    try {
      const member = await Member.findOne({userId:req.params.id});
      if (!member) return res.status(404).json({ message: 'Member not found' });

      await member.deleteOne();
      res.json({ message: 'Member removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default MemberController;
