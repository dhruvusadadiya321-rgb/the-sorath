import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiShoppingBag, FiDollarSign, FiBox, FiActivity } from 'react-icons/fi';
import { API_URL } from '../../config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    white: '#ffffff',
    bg: '#f4f6f8'
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo ? userInfo.token : ''}`,
          },
        };

        const { data } = await axios.get(`${API_URL}/api/stats`, config);
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Dashboard...</div>;
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, marginBottom: '30px' }}>
        Admin Dashboard
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        <StatCard 
          icon={<FiBox />} 
          title="Total Products" 
          value={stats.products} 
          color="#e67e22" 
        />
        
        <StatCard 
          icon={<FiUsers />} 
          title="Total Users" 
          value={stats.users} 
          color="#9b59b6" 
        />
        
        <StatCard 
          icon={<FiShoppingBag />} 
          title="Total Orders" 
          value={stats.orders} 
          color="#3498db" 
        />
        
        <StatCard 
          icon={<FiDollarSign />} 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          color="#2ecc71" 
        />

      </div>

      <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <FiActivity color={theme.gold} size={20} />
          <h3 style={{ margin: 0, color: theme.dark }}>System Status</h3>
        </div>
        
        <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
          <p>✅ Database Connection: <strong>Active</strong></p>
          <p>✅ Product Catalog: <strong>{stats.products} items live</strong></p>
          <p>✅ Order System: <strong>Ready to accept orders</strong></p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div style={{ 
    background: '#fff', 
    padding: '25px', 
    borderRadius: '15px', 
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px',
    transition: 'transform 0.3s ease',
    cursor: 'default'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ 
      width: '60px', height: '60px', borderRadius: '50%', 
      background: `${color}15`, color: color, 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      fontSize: '24px' 
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>{title}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{value}</div>
    </div>
  </div>
);

export default Dashboard;