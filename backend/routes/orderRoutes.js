const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. CREATE NEW ORDER (POST) - User
router.post('/', async (req, res) => {
  const { user_info, orderItems, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    try {
      const order = new Order({
        user_info,
        orderItems,
        paymentMethod,
        totalPrice
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: 'Order creation failed', error: error.message });
    }
  }
});

// 2. GET USER ORDERS (GET) - User (Potana orders jova)
router.get('/myorders', async (req, res) => {
  const { email } = req.query; 

  try {
    const orders = await Order.find({ 'user_info.email': email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// --- ADMIN ROUTES (NEW ADDED) ---

// 3. GET ALL ORDERS (GET) - Admin (Badha user na order jova)
router.get('/', async (req, res) => {
  try {
    // Populate kadhi nakhyu kem ke tamaro data 'user_info' ma save che
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all orders' });
  }
});
// 4. UPDATE ORDER TO DELIVERED (PUT) - Admin (Status badalva)
router.put('/:id/deliver', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.isPaid = true; // COD hoy to delivery time e paisa mali gaya em ganay
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;