import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiLock, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
// 👇 Config Import
import { API_URL } from '../../config';

const Settings = () => {
  const { user, login } = useAuth(); 

  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileData, setProfileData] = useState({
    name: '', email: '', phone: '', address: ''
  });
  const [passData, setPassData] = useState({
    newPassword: '', confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    border: '#e5e7eb'
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (activeTab === 'security') {
      if (passData.newPassword !== passData.confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match!' });
        return;
      }
      if (passData.newPassword.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 chars' });
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        email: profileData.email, 
        name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        newPassword: activeTab === 'security' ? passData.newPassword : null
      };

      // 👇 API URL Updated here
      const { data } = await axios.put(`${API_URL}/auth/profile`, payload);

      login(data); 
      
      setMessage({ type: 'success', text: 'Profile Updated Successfully!' });
      if(activeTab === 'security') setPassData({ newPassword: '', confirmPassword: '' });

    } catch (error) {
      setMessage({ type: 'error', text: 'Update Failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f9f9f9', minHeight: '85vh', fontFamily: "'Poppins', sans-serif" }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '30px' }}>Account Settings</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <button 
                onClick={() => setActiveTab('general')}
                style={{ ...tabStyle, background: activeTab === 'general' ? `${theme.gold}20` : 'transparent', color: activeTab === 'general' ? theme.gold : '#555', borderLeft: activeTab === 'general' ? `4px solid ${theme.gold}` : '4px solid transparent' }}
              >
                <FiUser /> General Information
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                style={{ ...tabStyle, background: activeTab === 'security' ? `${theme.gold}20` : 'transparent', color: activeTab === 'security' ? theme.gold : '#555', borderLeft: activeTab === 'security' ? `4px solid ${theme.gold}` : '4px solid transparent' }}
              >
                <FiLock /> Security & Password
              </button>
            </div>
          </div>

          <div style={{ flex: '3', minWidth: '300px' }}>
            <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              
              <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px' }}>
                {activeTab === 'general' ? 'Edit Profile' : 'Change Password'}
              </h2>

              {message.text && (
                <div style={{ 
                  padding: '12px', borderRadius: '5px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px',
                  background: message.type === 'error' ? '#ffe6e6' : '#e6ffea', 
                  color: message.type === 'error' ? 'red' : 'green' 
                }}>
                  {message.type === 'error' ? <FiAlertCircle /> : <FiCheckCircle />} {message.text}
                </div>
              )}

              <form onSubmit={handleUpdate}>
                
                {activeTab === 'general' && (
                  <>
                    <div style={formGroup}>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} style={inputStyle} />
                    </div>
                    <div style={formGroup}>
                      <label style={labelStyle}>Email (Read Only)</label>
                      <input type="email" value={profileData.email} readOnly style={{ ...inputStyle, background: '#f5f5f5', cursor: 'not-allowed' }} />
                    </div>
                    <div style={formGroup}>
                      <label style={labelStyle}>Phone Number</label>
                      <input type="text" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} style={inputStyle} placeholder="+91..." />
                    </div>
                    <div style={formGroup}>
                      <label style={labelStyle}>Address</label>
                      <textarea value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} rows="3" style={{ ...inputStyle, resize: 'none' }} placeholder="Enter your full address" />
                    </div>
                  </>
                )}

                {activeTab === 'security' && (
                  <>
                    <div style={formGroup}>
                      <label style={labelStyle}>New Password</label>
                      <input type="password" value={passData.newPassword} onChange={(e) => setPassData({...passData, newPassword: e.target.value})} style={inputStyle} placeholder="Enter new password" />
                    </div>
                    <div style={formGroup}>
                      <label style={labelStyle}>Confirm Password</label>
                      <input type="password" value={passData.confirmPassword} onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})} style={inputStyle} placeholder="Confirm new password" />
                    </div>
                  </>
                )}

                <button type="submit" disabled={loading} style={{ 
                  marginTop: '20px', padding: '12px 25px', background: theme.gold, color: theme.dark, 
                  border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' 
                }}>
                  {loading ? 'Saving...' : <><FiSave /> Save Changes</>}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const tabStyle = {
  display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px 20px', 
  border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: '0.2s', textAlign: 'left'
};

const formGroup = { marginBottom: '15px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', color: '#666', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' };

export default Settings;