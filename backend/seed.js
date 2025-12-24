const mongoose = require('mongoose');
const Product = require('./models/Product');

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/the-sorath')
  .then(() => console.log('Mongo Connection Open for Seeding'))
  .catch(err => console.log(err));

// Aapno Product Data
const seedProducts = [
  // --- Sherwanis ---
  {
    name: "Royal Gold Sherwani",
    category: "Sherwani",
    price: 18999,
    image: "/images/products/sherwani_gold.jpg",
    description: "Premium gold sherwani for the groom."
  },
  {
    name: "Premium Ivory Sherwani",
    category: "Sherwani",
    price: 21000,
    image: "/images/products/sherwani_ivory.jpg",
    description: "Elegant ivory finish with intricate embroidery."
  },
  {
    name: "Traditional Maroon Sherwani",
    category: "Sherwani",
    price: 16500,
    image: "/images/products/sherwani_maroon.jpg",
    description: "Classic maroon velvet sherwani."
  },

  // --- Jodhpuris ---
  {
    name: "Classic Black Jodhpuri",
    category: "Jodhpuri",
    price: 8999,
    image: "/images/products/jodhpuri_black.jpg",
    description: "Timeless black jodhpuri suit."
  },
  {
    name: "Royal Blue Jodhpuri",
    category: "Jodhpuri",
    price: 9500,
    image: "/images/products/jodhpuri_blue.jpg",
    description: "Royal blue suit suitable for receptions."
  },
  {
    name: "Elegant Grey Jodhpuri",
    category: "Jodhpuri",
    price: 9200,
    image: "/images/products/jodhpuri_grey.jpg",
    description: "Modern grey jodhpuri for a subtle look."
  },

  // --- Indo-Western ---
  {
    name: "Cream Indo-Western Set",
    category: "Indo-Western",
    price: 12999,
    image: "/images/products/indo_cream.jpg",
    description: "Fusion wear for sangeet or engagement."
  },
  {
    name: "Wine Velvet Indo-Western",
    category: "Indo-Western",
    price: 13500,
    image: "/images/products/indo_wine.jpg",
    description: "Rich wine color velvet fabric."
  },

  // --- Kurtas ---
  {
    name: "Emerald Green Kurta",
    category: "Kurta",
    price: 2500,
    image: "/images/products/kurta_green.jpg",
    description: "Simple yet elegant green kurta."
  },
  {
    name: "Haldi Special Yellow Kurta",
    category: "Kurta",
    price: 2200,
    image: "/images/products/kurta_yellow.jpg",
    description: "Bright yellow kurta perfect for Haldi ceremony."
  },
];

// Data Database ma nakhva mate nu function
const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Junu badhu delete karse (optional)
    await Product.insertMany(seedProducts); // Navu add karse
    console.log("✅ Badhi Products Database ma add thai gai che!");
  } catch (e) {
    console.log("Error:", e);
  } finally {
    mongoose.connection.close(); // Connection bandh karse
  }
};

seedDB();