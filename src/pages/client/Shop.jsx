import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFilter, FiGrid, FiList, FiSearch } from 'react-icons/fi';
import { useCart } from '../../context/CartContext'; 
import ProductCard from '../../components/client/ProductCard'; 
import { API_URL } from '../../config';

const Shop = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    text: '#333333',
    shadow: '0 10px 30px rgba(0,0,0,0.08)'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API_URL}/api/products`),
          axios.get(`${API_URL}/api/categories`)
        ]);

        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to load products. Check server connection.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ color: theme.gold, fontFamily: 'Playfair Display' }}>Loading Royal Collection...</h3>
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="shop-page" style={{ minHeight: '100vh', background: theme.light, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
      
      <div style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1550614000-4b9519e00664?q=80&w=2070&auto=format&fit=crop")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        color: '#fff',
        marginBottom: '50px'
      }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: '10px' }}>
          The <span style={{ color: theme.gold }}>Royal</span> Collection
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Where Tradition Meets Elegance</p>

        <div style={{ maxWidth: '500px', margin: '30px auto 0', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search sherwanis, accessories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '15px 50px', borderRadius: '50px', border: 'none',
              fontSize: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', outline: 'none'
            }}
          />
          <FiSearch style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: theme.gold, fontSize: '20px' }} />
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px 60px' }}>
        
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: theme.shadow, marginBottom: '40px', gap: '20px'
        }}>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.dark, fontWeight: '600' }}>
              <FiFilter color={theme.gold} /> Filters:
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectStyle}
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={selectStyle}
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ fontSize: '14px', fontWeight: '500', color: '#666' }}>Max: ₹{priceRange[1].toLocaleString()}</span>
               <input
                 type="range" min="0" max="100000" step="1000"
                 value={priceRange[1]}
                 onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                 style={{ accentColor: theme.gold, cursor: 'pointer', width: '100px' }}
               />
            </div>

            <div style={{ background: '#f8f9fa', padding: '5px', borderRadius: '8px', display: 'flex' }}>
              <button onClick={() => setViewMode('grid')} style={{ ...viewBtnStyle, background: viewMode === 'grid' ? '#fff' : 'transparent', boxShadow: viewMode === 'grid' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none' }}>
                <FiGrid />
              </button>
              <button onClick={() => setViewMode('list')} style={{ ...viewBtnStyle, background: viewMode === 'list' ? '#fff' : 'transparent', boxShadow: viewMode === 'list' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none' }}>
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
            <FiSearch size={40} color="#ddd" />
            <h3>No products found matching criteria.</h3>
            <p>Try resetting filters or searching for something else.</p>
          </div>
        ) : (
          <div style={{
            display: viewMode === 'grid' ? 'grid' : 'flex',
            flexDirection: viewMode === 'list' ? 'column' : 'unset',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                viewMode={viewMode} 
                handleAddToCart={() => addToCart(product)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const selectStyle = {
  padding: '10px 15px', borderRadius: '8px', border: '1px solid #eee',
  background: '#f8f9fa', color: '#333', outline: 'none', cursor: 'pointer',
  minWidth: '150px'
};

const viewBtnStyle = {
  padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#1a1a1a', display: 'flex', alignItems: 'center'
};

export default Shop;