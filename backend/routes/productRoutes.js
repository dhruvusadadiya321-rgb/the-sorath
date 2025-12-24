const express = require('express');
const router = express.Router();
// Tamara Product Model no path check karjo. Jo models folder 'backend' ma hoy to aa barabar che.
const Product = require('../models/ProductModel'); // athva '../models/productModel' check karjo

// 1. GET All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2. GET Single Product by ID (Aa code TAMARO MISSING hato)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    // Jo ID format khotu hoy to aa error avse
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;