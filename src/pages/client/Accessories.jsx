import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFilter } from 'react-icons/fi';
import ProductCard from '../../components/client/ProductCard';
import { API_URL } from '../../config';

const Accessories = () => {
  const [products, setProducts] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
  };

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products`);
        
        const keywords = ['accessory', 'accessories', 'safa', 'turban', 'mojari', 'shoe', 'footwear', 'mala', 'necklace', 'brooch', 'kalgi', 'stole', 'dupatta', 'jewelry'];

        const accessoriesData = data.filter(item => {
          const category = item.category ? item.category.toLowerCase() : '';
          const name = item.name ? item.name.toLowerCase() : '';
          const desc = item.description ? item.description.toLowerCase() : '';

          return keywords.some(key => category.includes(key) || name.includes(key) || desc.includes(key));
        });

        setProducts(accessoriesData);
        setFilteredAccessories(accessoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === 'All') {
      setFilteredAccessories(products);
    } else {
      const lowerType = type.toLowerCase();
      const filtered = products.filter(item => 
        (item.category && item.category.toLowerCase().includes(lowerType)) ||
        (item.name && item.name.toLowerCase().includes(lowerType)) ||
        (item.description && item.description.toLowerCase().includes(lowerType))
      );
      setFilteredAccessories(filtered);
    }
  };

  const filters = ['All', 'Safa', 'Mojari', 'Mala', 'Brooch', 'Stole'];

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ color: theme.gold, fontFamily: 'Playfair Display' }}>Loading Accessories...</h3>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: theme.light, minHeight: '100vh' }}>
      
      <div style={{ 
        height: '40vh', 
        backgroundImage: 'url("https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dw7e6158fe/wedding%20blogs/Manyavar%20Apparel%20-%20How%20to%20Choose%20the%20Right%20Safa%20for%20the%20Wedding%20Procession_D.jpg")',
        backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'relative', color: '#fff', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', marginBottom: '10px' }}>Royal Accessories</h1>
          <p style={{ letterSpacing: '2px', textTransform: 'uppercase', color: theme.gold }}>The Perfect Finishing Touch</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '50px 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '40px' }}>
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => handleFilter(filter)}
              style={{
                padding: '10px 30px', borderRadius: '30px', 
                border: `1px solid ${activeFilter === filter ? theme.gold : '#ddd'}`,
                background: activeFilter === filter ? theme.gold : 'transparent',
                color: activeFilter === filter ? theme.dark : '#666',
                fontWeight: '600', cursor: 'pointer', transition: '0.3s',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              {filter === 'All' && <FiFilter />}
              {filter}
            </button>
          ))}
        </div>

        {filteredAccessories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
            <h3>No Accessories Found.</h3>
            <button 
              onClick={() => handleFilter('All')} 
              style={{ marginTop: '10px', background: 'transparent', border: 'none', color: theme.gold, cursor: 'pointer', textDecoration: 'underline' }}
            >
              View All
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredAccessories.map(product => (
              <ProductCard key={product._id} product={product} viewMode="grid" />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Accessories;