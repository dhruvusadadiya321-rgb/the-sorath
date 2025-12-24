import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiPlus, FiSave, FiImage, FiType } from 'react-icons/fi';
import { API_URL } from '../../config';

const SliderManage = () => {
  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    danger: '#e74c3c'
  };

  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({ image: '', title: '', subtitle: '' });
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/slides`);
      setSlides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slides:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (!newSlide.image) return alert('Please enter image URL');

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${API_URL}/api/slides`, newSlide, config);
      
      setNewSlide({ image: '', title: '', subtitle: '' });
      fetchSlides();
      alert('Slide Added Successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding slide');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this slide?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        await axios.delete(`${API_URL}/api/slides/${id}`, config);
        fetchSlides(); 
      } catch (error) {
        alert('Error deleting slide');
      }
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, margin: 0 }}>
          Slider Management
        </h1>
        <p style={{ color: '#666' }}>Manage your homepage banner images and text.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, borderBottom: `2px solid ${theme.gold}`, paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiPlus /> Add New Slide
          </h3>
          
          <form onSubmit={handleAddSlide} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            
            <div>
              <label style={{ fontWeight: '500', display: 'block', marginBottom: '8px' }}>Image URL</label>
              <div style={{ position: 'relative' }}>
                <FiImage style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder="https://image-link.com..." 
                  value={newSlide.image}
                  onChange={(e) => setNewSlide({...newSlide, image: e.target.value})}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontWeight: '500', display: 'block', marginBottom: '8px' }}>Main Title</label>
              <div style={{ position: 'relative' }}>
                <FiType style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder="Ex: Royal Collection" 
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({...newSlide, title: e.target.value})}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontWeight: '500', display: 'block', marginBottom: '8px' }}>Subtitle</label>
              <input 
                type="text" 
                placeholder="Ex: For the special day" 
                value={newSlide.subtitle}
                onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})}
                style={{ ...inputStyle, paddingLeft: '15px' }}
                required
              />
            </div>

            {newSlide.image && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px dashed #ccc' }}>
                <img src={newSlide.image} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              </div>
            )}

            <button type="submit" style={btnStyle(theme.gold, theme.dark)}>
              <FiSave /> Add to Slider
            </button>

          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0 }}>Current Active Slides ({slides.length})</h3>
          
          {loading ? (
            <p>Loading Slides...</p>
          ) : (
            <>
            {slides.map((slide) => (
                <div key={slide._id} style={{ 
                  background: '#fff', borderRadius: '15px', overflow: 'hidden', 
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center'
                }}>
                  <img 
                    src={slide.image} 
                    alt="Slide" 
                    style={{ width: '120px', height: '100px', objectFit: 'cover' }} 
                  />
                  
                  <div style={{ padding: '20px', flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', color: theme.dark }}>{slide.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{slide.subtitle}</p>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <button 
                      onClick={() => handleDelete(slide._id)}
                      style={{ 
                        background: '#ffebee', color: theme.danger, border: 'none', 
                        width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = theme.danger + '20'}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {!loading && slides.length === 0 && <p style={{ color: '#888' }}>No slides active.</p>}
        </div>

      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '10px 10px 10px 35px', borderRadius: '8px',
  border: '1px solid #ddd', outline: 'none', fontSize: '14px', boxSizing: 'border-box'
};

const btnStyle = (bg, color) => ({
  background: bg, color: color, padding: '12px', border: 'none', borderRadius: '8px',
  fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px'
});

export default SliderManage;