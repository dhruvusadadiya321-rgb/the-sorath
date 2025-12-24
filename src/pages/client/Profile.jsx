import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiLogOut, FiEdit2, FiSave, FiMapPin, FiShoppingCart } from 'react-icons/fi';

// Context Imports
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Profile = () => {
  const navigate = useNavigate();
  
  // Context Data
  const { user, logout, login } = useAuth(); // Login function update mate
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  // Local State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Redirect if not logged in & Load Data
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '9876543210', // Dummy phone if not in DB
        address: user.address || 'Surat, Gujarat' // Dummy address
      });
    }
  }, [user, navigate]);

  // Theme Colors
  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    white: '#ffffff',
    border: '#e5e7eb'
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Ahiya API call kari sakay (Update User), atyare local update kariye
    const updatedUser = { ...user, ...formData };
    login(updatedUser); // Context update
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  if (!user) return null;

  return (
    <div style={{ padding: '40px 20px', background: '#f9f9f9', minHeight: '85vh', fontFamily: "'Poppins', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: theme.dark, margin: 0 }}>
            My Account
          </h1>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '10px 20px', border: `1px solid #ff4444`, 
              color: '#ff4444', background: 'transparent', borderRadius: '5px', 
              cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            <FiLogOut /> Logout
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* LEFT COLUMN: User Details Card */}
          <div style={{ background: theme.white, padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ 
                width: '100px', height: '100px', background: theme.gold, color: theme.dark,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '40px', margin: '0 auto 15px', border: `4px solid ${theme.light}`
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 style={{ margin: '0 0 5px 0', color: theme.dark }}>{user.name}</h2>
              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{user.isAdmin ? 'Administrator' : 'Premium Member'}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiUser color={theme.gold} /> Personal Details
              </h3>
              <button 
                onClick={() => isEditing ? document.getElementById('profileForm').requestSubmit() : setIsEditing(true)}
                style={{ background: 'transparent', border: 'none', color: theme.gold, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {isEditing ? <><FiSave /> Save</> : <><FiEdit2 /> Edit</>}
              </button>
            </div>

            <form id="profileForm" onSubmit={handleSave}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '5px' }}>Full Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ ...inputStyle, borderColor: isEditing ? theme.gold : theme.border }} 
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '5px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  disabled // Email change na thay
                  style={{ ...inputStyle, background: '#f0f0f0', cursor: 'not-allowed' }} 
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '5px' }}>Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ ...inputStyle, borderColor: isEditing ? theme.gold : theme.border }} 
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '5px' }}>Default Address</label>
                <textarea 
                  value={formData.address} 
                  disabled={!isEditing}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows="2"
                  style={{ ...inputStyle, borderColor: isEditing ? theme.gold : theme.border, resize: 'none' }} 
                />
              </div>
            </form>

          </div>

          {/* RIGHT COLUMN: Stats & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Dashboard Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={statCardStyle}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', color: theme.gold }}>
                  {cartItems.length}
                </div>
                <div style={{ color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                  <FiShoppingCart /> In Cart
                </div>
              </div>
              
              <div style={statCardStyle}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', color: theme.gold }}>
                  {wishlistItems.length}
                </div>
                <div style={{ color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                  <FiHeart /> Wishlist
                </div>
              </div>

              <div style={{ ...statCardStyle, gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: theme.dark }}>My Orders</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>Track your royal packages</div>
                </div>
                <div style={{ background: theme.gold, color: theme.dark, padding: '10px', borderRadius: '50%' }}>
                  <FiPackage size={24} />
                </div>
              </div>
            </div>

            {/* Address / Quick Links */}
            <div style={{ background: theme.white, padding: '25px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', flex: 1 }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 20px 0', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>
                Account Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Link to="/orders" style={linkStyle}><FiPackage /> View Order History</Link>
                <Link to="/wishlist" style={linkStyle}><FiHeart /> My Wishlist</Link>
                <Link to="/cart" style={linkStyle}><FiShoppingCart /> Go to Cart</Link>
                <Link to="/contact" style={linkStyle}><FiMapPin /> Help & Support</Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  width: '100%', padding: '12px', borderRadius: '8px', 
  border: '1px solid #eee', fontSize: '14px', fontFamily: 'inherit',
  boxSizing: 'border-box'
};

const statCardStyle = {
  background: '#fff', padding: '20px', borderRadius: '15px', 
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center'
};

const linkStyle = {
  textDecoration: 'none', color: '#555', display: 'flex', alignItems: 'center', 
  gap: '12px', fontSize: '15px', padding: '10px', borderRadius: '8px',
  transition: '0.2s', background: '#f8f9fa'
};

export default Profile;