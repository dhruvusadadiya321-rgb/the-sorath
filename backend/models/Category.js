const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Home page par batava image joyse
  isFeatured: { type: Boolean, default: false } // Home page par 'Popular' tarike batavvu che ke nai
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);