import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiImage } from 'react-icons/fi';
// 👇 IMPORT CONFIG (Path tamara folder structure pramane adjust karjo)
import { API_URL } from '../../config'; 

const AddProduct = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Sherwani', // Default
    countInStock: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  // Theme Colors
  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    border: '#e5e7eb'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get Token from LocalStorage (Security mate)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (!userInfo || !userInfo.token) {
        alert('Please login as Admin to add products.');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Token mokalvu jaruri che
          'Content-Type': 'application/json',
        },
      };

      // 2. API Call using API_URL (Localhost hardcode nathi karyu)
      await axios.post(`${API_URL}/products`, formData, config);
      
      alert('Product Added Successfully! 🎉');
      navigate('/admin/products'); // Redirect back to list

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error adding product. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: "'Poppins', sans-serif", padding: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, margin: 0 }}>Add New Product</h1>
        <button 
          onClick={() => navigate('/admin/products')}
          style={{ background: 'transparent', border: `1px solid ${theme.dark}`, padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      {/* Form Container */}
      <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          
          {/* Name */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Name</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} required
              placeholder="Ex: Royal Blue Sherwani"
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {/* Price */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price (₹)</label>
              <input 
                type="number" name="price" value={formData.price} onChange={handleChange} required
                placeholder="Ex: 15000"
                style={inputStyle}
              />
            </div>
            
            {/* Stock */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Stock Quantity</label>
              <input 
                type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required
                placeholder="Ex: 10"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {/* Category */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                <option value="Sherwani">Sherwani</option>
                <option value="Jodhpuri">Jodhpuri</option>
                <option value="Indo-Western">Indo-Western</option>
                <option value="Accessories">Accessories</option>
                <option value="Kurta">Kurta</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Image URL</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" name="image" value={formData.image} onChange={handleChange} required
                  placeholder="https://image-link.com..."
                  style={{ ...inputStyle, paddingLeft: '40px' }}
                />
                <FiImage style={{ position: 'absolute', left: '12px', top: '14px', color: '#888' }} />
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div style={{ textAlign: 'center', padding: '10px', background: '#f9f9f9', borderRadius: '10px', border: '1px dashed #ccc' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Image Preview</p>
              <img src={formData.image} alt="Preview" 
                   style={{ height: '150px', objectFit: 'contain', borderRadius: '5px' }} 
                   onError={(e) => e.target.style.display = 'none'} // Jo image link khoti hoy to hide thay jay
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
            <textarea 
              name="description" value={formData.description} onChange={handleChange} required
              rows="4"
              placeholder="Enter product details..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              background: theme.gold, color: theme.dark, border: 'none', padding: '15px',
              borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              marginTop: '10px', opacity: loading ? 0.7 : 1, transition: '0.3s'
            }}
          >
            {loading ? 'Saving...' : <><FiSave /> Save Product</>}
          </button>

        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px 15px', borderRadius: '8px', 
  border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box'
};

export default AddProduct;