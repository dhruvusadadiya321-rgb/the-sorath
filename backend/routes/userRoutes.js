const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. GET ALL USERS (Admin Mate)
router.get('/', async (req, res) => {
  try {
    // Badha users find karo (password sivay)
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// 2. DELETE USER (Admin Mate)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;