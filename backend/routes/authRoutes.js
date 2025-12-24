const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // 1. Aa line Umero (Import JWT)

// Secret Key (Production ma .env file ma rakhvi joie, pan atyare ahiya chalase)
const JWT_SECRET = 'maro_secret_key_123'; 

// 1. REGISTER USER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    
    // Register vakhte pan token moklo
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token, // <--- Token Added
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// 2. LOGIN USER (IMP UPDATE)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (user && user.password === password) {
      
      // 2. Token Generate Karo
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token, // <--- 3. Ahiya Token Frontend ne moklo
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// 3. UPDATE PROFILE
router.put('/profile', async (req, res) => {
  const { email, name, phone, address, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      if (newPassword) user.password = newPassword; 

      const updatedUser = await user.save();
      
      // Update vakhte pan token mokli do (optional)
      const token = jwt.sign({ id: updatedUser._id }, JWT_SECRET, { expiresIn: '30d' });

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isAdmin: updatedUser.isAdmin,
        token: token, // Token added
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;