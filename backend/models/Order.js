const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_info: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  orderItems: [
    {
      name: String,
      quantity: Number,
      image: String,
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  paymentMethod: String,
  totalPrice: Number,
  isPaid: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Auto create/update time avse
});

module.exports = mongoose.model('Order', orderSchema);