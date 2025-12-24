const mongoose = require('mongoose');
const Product = require('./models/Product');

// Database Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/the-sorath'; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to Database for Seeding...'))
  .catch(err => {
    console.error('❌ DB Error:', err);
    process.exit(1);
  });

// --- 1. CLOTHING DATA (Updated with Ratings & Reviews) ---
const clothingProducts = [
  // --- Sherwanis ---
  {
    name: "Royal Gold Sherwani",
    category: "Sherwani",
    price: 18999,
    image: "/images/products/sherwani_gold.jpg",
    description: "Premium gold sherwani for the groom.",
    rating: 4.8,
    numReviews: 15,
    countInStock: 10
  },
  {
    name: "Premium Ivory Sherwani",
    category: "Sherwani",
    price: 21000,
    image: "/images/products/sherwani_ivory.jpg",
    description: "Elegant ivory finish with intricate embroidery.",
    rating: 4.9,
    numReviews: 22,
    countInStock: 5
  },
  {
    name: "Traditional Maroon Sherwani",
    category: "Sherwani",
    price: 16500,
    image: "/images/products/sherwani_maroon.jpg",
    description: "Classic maroon velvet sherwani.",
    rating: 4.6,
    numReviews: 30,
    countInStock: 8
  },

  // --- Jodhpuris ---
  {
    name: "Classic Black Jodhpuri",
    category: "Jodhpuri",
    price: 8999,
    image: "/images/products/jodhpuri_black.jpg",
    description: "Timeless black jodhpuri suit.",
    rating: 4.7,
    numReviews: 18,
    countInStock: 12
  },
  {
    name: "Royal Blue Jodhpuri",
    category: "Jodhpuri",
    price: 9500,
    image: "/images/products/jodhpuri_blue.jpg",
    description: "Royal blue suit suitable for receptions.",
    rating: 4.5,
    numReviews: 14,
    countInStock: 15
  },
  {
    name: "Elegant Grey Jodhpuri",
    category: "Jodhpuri",
    price: 9200,
    image: "/images/products/jodhpuri_grey.jpg",
    description: "Modern grey jodhpuri for a subtle look.",
    rating: 4.3,
    numReviews: 9,
    countInStock: 20
  },

  // --- Indo-Western ---
  {
    name: "Cream Indo-Western Set",
    category: "Indo-Western",
    price: 12999,
    image: "/images/products/indo_cream.jpg",
    description: "Fusion wear for sangeet or engagement.",
    rating: 4.8,
    numReviews: 25,
    countInStock: 7
  },
  {
    name: "Wine Velvet Indo-Western",
    category: "Indo-Western",
    price: 13500,
    image: "/images/products/indo_wine.jpg",
    description: "Rich wine color velvet fabric.",
    rating: 4.9,
    numReviews: 11,
    countInStock: 4
  },

  // --- Kurtas ---
  {
    name: "Emerald Green Kurta",
    category: "Kurta",
    price: 2500,
    image: "/images/products/kurta_green.jpg",
    description: "Simple yet elegant green kurta.",
    rating: 4.2,
    numReviews: 45,
    countInStock: 50
  },
  {
    name: "Haldi Special Yellow Kurta",
    category: "Kurta",
    price: 2200,
    image: "/images/products/kurta_yellow.jpg",
    description: "Bright yellow kurta perfect for Haldi ceremony.",
    rating: 4.7,
    numReviews: 60,
    countInStock: 35
  },
];

// --- 2. ACCESSORIES DATA (Already has Ratings) ---
const accessoriesProducts = [
  // --- SAFAS (TURBANS) ---
  {
    name: "Maroon Velvet Royal Safa",
    image: "/images/products/Maroon Velvet Royal Safa.jpg",
    description: "Premium maroon velvet safa with golden lace border.",
    category: "Accessories",
    price: 1800,
    countInStock: 25,
    rating: 4.8,
    numReviews: 12
  },
  {
    name: "Peach Floral Wedding Safa",
    image: "/images/products/Peach Floral Wedding Safa.jpg",
    description: "Lightweight peach safa with floral print for summer weddings.",
    category: "Accessories",
    price: 1200,
    countInStock: 30,
    rating: 4.5,
    numReviews: 8
  },
  {
    name: "Cream & Gold Jodhpuri Safa",
    image: "/images/products/Cream & Gold Jodhpuri Safa.jpg",
    description: "Classic cream safa with gold stripes, Jodhpuri style.",
    category: "Accessories",
    price: 1600,
    countInStock: 20,
    rating: 4.7,
    numReviews: 15
  },
  {
    name: "Banarasi Silk Safa",
    image: "/images/products/Banarasi Silk Safa.jpg",
    description: "Rich Banarasi silk fabric safa in multicolor.",
    category: "Accessories",
    price: 2100,
    countInStock: 10,
    rating: 4.9,
    numReviews: 5
  },

  // --- MOJARIS (FOOTWEAR) ---
  {
    name: "Maroon Velvet Mojari",
    image: "/images/products/Maroon Velvet Mojari.jpg",
    description: "Matching maroon velvet mojari with zardosi work.",
    category: "Accessories",
    price: 2800,
    countInStock: 15,
    rating: 4.6,
    numReviews: 10
  },
  {
    name: "Antique Gold Mojari",
    image: "/images/products/Antique Gold Mojari.jpg",
    description: "Traditional antique gold finish mojari.",
    category: "Accessories",
    price: 2400,
    countInStock: 18,
    rating: 4.3,
    numReviews: 6
  },
  {
    name: "Cream Leather Jutti",
    image: "/images/products/Cream Leather Jutti.jpg",
    description: "Simple and elegant cream leather jutti for comfort.",
    category: "Accessories",
    price: 1900,
    countInStock: 40,
    rating: 4.5,
    numReviews: 20
  },

  // --- MALAS (NECKLACES) ---
  {
    name: "Seven Layer Pearl Mala",
    image: "/images/products/Seven Layer Pearl Mala.jpg",
    description: "Grand seven-layer pearl necklace for the groom.",
    category: "Accessories",
    price: 3500,
    countInStock: 8,
    rating: 5.0,
    numReviews: 4
  },
  {
    name: "Emerald Green Groom Mala",
    image: "/images/products/Emerald Green Groom Mala.jpg",
    description: "Contrast emerald green stones with pearls.",
    category: "Accessories",
    price: 2900,
    countInStock: 12,
    rating: 4.7,
    numReviews: 9
  },
  {
    name: "Ruby Red Stone Mala",
    image: "/images/products/Ruby Red Stone Mala.jpg",
    description: "Royal red ruby stone necklace for sherwani.",
    category: "Accessories",
    price: 3100,
    countInStock: 10,
    rating: 4.8,
    numReviews: 7
  },

  // --- BROOCH & KALGI ---
  {
    name: "Kundan Kalgi for Safa",
    image: "/images/products/Kundan Kalgi for Safa.jpg",
    description: "Premium Kundan Kalgi with feather for Safa.",
    category: "Accessories",
    price: 1500,
    countInStock: 25,
    rating: 4.6,
    numReviews: 11
  },
  {
    name: "Antique Lion Brooch",
    image: "/images/products/Antique Lion Brooch.jpg",
    description: "Gold plated lion head brooch with chain.",
    category: "Accessories",
    price: 950,
    countInStock: 50,
    rating: 4.4,
    numReviews: 18
  },
  {
    name: "Diamond Studded Buttons",
    image: "/images/products/Diamond Studded Buttons.jpg",
    description: "Set of 7 diamond studded buttons for Jodhpuri suit.",
    category: "Accessories",
    price: 2200,
    countInStock: 30,
    rating: 4.9,
    numReviews: 14
  },

  // --- STOLES ---
  {
    name: "Embroidered Maroon Stole",
    image: "/images/products/Embroidered Maroon Stole.jpg",
    description: "Heavy embroidered velvet stole in maroon.",
    category: "Accessories",
    price: 3200,
    countInStock: 15,
    rating: 4.7,
    numReviews: 6
  },
  {
    name: "Beige Silk Dupatta",
    image: "/images/products/Beige Silk Dupatta.jpg",
    description: "Elegant beige silk dupatta with golden border.",
    category: "Accessories",
    price: 1800,
    countInStock: 22,
    rating: 4.5,
    numReviews: 9
  }
];

// --- MAIN SEED FUNCTION ---
const seedDB = async () => {
  try {
    // 1. Delete Existing Data
    await Product.deleteMany({});
    console.log("🗑️  Old Data Deleted.");

    // 2. Combine Both Arrays
    const allProducts = [...clothingProducts, ...accessoriesProducts];

    // 3. Insert All Data
    await Product.insertMany(allProducts);
    console.log(`✅ Success! Total ${allProducts.length} Products added to DB.`);

  } catch (e) {
    console.log("❌ Error:", e);
  } finally {
    mongoose.connection.close(); // Connection Close
    console.log("👋 Connection Closed.");
  }
};

// Run Function
seedDB();