import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiPlus, FiCheck, FiImage } from 'react-icons/fi';
// 👇 Import Config
import { API_URL } from '../../config'; 

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ name: '', image: '', isFeatured: false });
  const [loading, setLoading] = useState(false);

  // Theme
  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    red: '#ef4444',
    green: '#10b981'
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/categories`);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!newCat.name || !newCat.image) return alert('Please fill all fields');
    
    setLoading(true);
    try {
      // 1. Get Token
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          'Content-Type': 'application/json',
        },
      };

      // 2. API Call
      await axios.post(`${API_URL}/categories`, newCat, config);
      
      setNewCat({ name: '', image: '', isFeatured: false });
      fetchCategories();
      alert('Category Added Successfully! 🎉');

    } catch (error) {
      console.error(error);
      alert('Error adding category.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this category?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

        await axios.delete(`${API_URL}/categories/${id}`, config);
        fetchCategories();
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: "'Poppins', sans-serif" }}>
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, margin: '0 0 10px 0' }}>Manage Categories</h1>
        <p style={{ color: '#666', margin: 0 }}>Add or remove product categories.</p>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* --- ADD FORM --- */}
        <div style={{ flex: 1, minWidth: '300px', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: theme.dark }}>Add New Category</h3>
          
          <form onSubmit={handleAdd} style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Category Name</label>
              <input 
                type="text" placeholder="Ex: Sherwani" 
                value={newCat.name} 
                onChange={(e) => setNewCat({...newCat, name: e.target.value})} 
                required style={inputStyle} 
              />
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Image URL</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" placeholder="https://..." 
                  value={newCat.image} 
                  onChange={(e) => setNewCat({...newCat, image: e.target.value})} 
                  required style={{ ...inputStyle, paddingLeft: '35px' }} 
                />
                <FiImage style={{ position: 'absolute', left: '10px', top: '12px', color: '#999' }} />
              </div>
            </div>

            {/* Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
              <input 
                type="checkbox" 
                checked={newCat.isFeatured} 
                onChange={(e) => setNewCat({...newCat, isFeatured: e.target.checked})} 
                style={{ width: '18px', height: '18px', accentColor: theme.gold }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Feature on Home Page?</span>
            </label>

            <button type="submit" disabled={loading} style={{
              background: theme.gold, color: theme.dark, border: 'none', padding: '12px',
              borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1
            }}>
              {loading ? 'Adding...' : <><FiPlus /> Add Category</>}
            </button>
          </form>
        </div>

        {/* --- LIST --- */}
        <div style={{ flex: 2, minWidth: '300px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {categories.map(cat => (
              <div key={cat._id} style={{ background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', position: 'relative' }}>
                
                {/* Image */}
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Content */}
                <div style={{ padding: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: theme.dark }}>{cat.name}</h4>
                  
                  {cat.isFeatured ? (
                    <span style={{ fontSize: '12px', color: theme.green, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                      <FiCheck size={12} /> Featured
                    </span>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#999' }}>Standard</span>
                  )}
                </div>

                {/* Delete Button (Absolute) */}
                <button 
                  onClick={() => handleDelete(cat._id)}
                  title="Delete Category"
                  style={{ 
                    position: 'absolute', top: '10px', right: '10px',
                    background: 'rgba(255,255,255,0.9)', color: theme.red, border: 'none',
                    width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '10px 15px', borderRadius: '8px', 
  border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box'
};

export default AdminCategories;