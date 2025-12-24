import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiUser, FiMail, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
// 👇 1. Config Import (Aa line add kari che)
import { API_URL } from '../../config';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  // States
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Theme Colors
  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    white: '#ffffff',
    border: '#e5e7eb'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLoginMode ? '/login' : '/register';
    
    try {
      // 👇 2. API Call Updated (Localhost hatavi ne API_URL mukyu)
      const { data } = await axios.post(`${API_URL}/auth${endpoint}`, formData);
      
      // Register Logic
      if (!isLoginMode) {
         alert("Registration Successful! Please Login with your details.");
         setIsLoginMode(true); 
         setLoading(false);
         return;
      }

      // Login Logic
      login(data); 
      alert(`Welcome back, ${data.name}!`); 

      if (data.isAdmin) {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/'); 
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4', padding: '20px' }}>
      
      <div style={{ background: theme.white, padding: '40px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
        
        {/* Header */}
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, marginBottom: '10px', fontSize: '32px' }}>
          {isLoginMode ? 'Welcome Back' : 'Join The Royalty'}
        </h1>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '15px' }}>
          {isLoginMode ? 'Please login to access your account' : 'Create an account to start your royal journey'}
        </p>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fff2f2', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #ffcdd2' }}>
            <FiAlertCircle /> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Name Field (Only for Register) */}
          {!isLoginMode && (
            <div style={inputContainerStyle}>
              <FiUser color="#999" size={20} />
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                onChange={handleChange} 
                style={inputStyle} 
                required={!isLoginMode} 
              />
            </div>
          )}

          {/* Email Field */}
          <div style={inputContainerStyle}>
            <FiMail color="#999" size={20} />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              onChange={handleChange} 
              style={inputStyle} 
              required 
            />
          </div>

          {/* Password Field */}
          <div style={inputContainerStyle}>
            <FiLock color="#999" size={20} />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              style={inputStyle} 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} 
            style={{
              background: theme.dark, 
              color: theme.gold, 
              border: 'none', 
              padding: '15px', 
              borderRadius: '8px',
              fontSize: '16px', 
              fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              marginTop: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              transition: '0.3s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : (isLoginMode ? 'LOGIN SECURELY' : 'CREATE ACCOUNT')}
            {!loading && <FiArrowRight />}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }} 
            style={{ color: theme.gold, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
          >
            {isLoginMode ? 'Sign Up' : 'Login'}
          </span>
        </div>

      </div>
    </div>
  );
};

// Styles
const inputContainerStyle = {
  display: 'flex', 
  alignItems: 'center', 
  gap: '15px',
  background: '#f9f9f9', 
  padding: '15px 20px', 
  borderRadius: '8px', 
  border: '1px solid #eee',
  transition: 'border 0.3s'
};

const inputStyle = {
  border: 'none', 
  background: 'transparent', 
  outline: 'none', 
  width: '100%', 
  fontSize: '15px',
  color: '#333'
};

export default Login;