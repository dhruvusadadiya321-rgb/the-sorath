const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// 1. Get All Categories
router.get('/', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// 2. Add Category (Admin)
router.post('/', async (req, res) => {
  const { name, image, isFeatured } = req.body;
  const category = new Category({ name, image, isFeatured });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// 3. Delete Category (Admin)
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category Deleted' });
});

module.exports = router;