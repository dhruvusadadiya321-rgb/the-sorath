const express = require('express');
const router = express.Router();

// Models Import (Tamara path mujab)
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// GET Dashboard Stats
router.get('/', async (req, res) => {
  try {
    // 1. Badha counts ek sathe lavo (Parallel Execution)
    const [productCount, userCount, orderCount, revenueData] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } } // Revenue Calculation
      ])
    ]);

    // Revenue value check (jo order na hoy to 0)
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalSales : 0;

    res.json({
      products: productCount,
      users: userCount,
      orders: orderCount,
      revenue: totalRevenue
    });

  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching stats" });
  }
});

module.exports = router;