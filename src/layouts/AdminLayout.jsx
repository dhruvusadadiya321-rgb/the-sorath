import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiGrid, FiBox, FiShoppingBag, FiLogOut, FiHome } from 'react-icons/fi';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Security Check: Jo Admin na hoy to Home par mokli do
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const theme = {
    dark: '#1a1a1a',
    gold: '#d4af37',
    light: '#f4f6f8'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* 1. SIDEBAR */}
      <aside style={{ width: '250px', background: theme.dark, color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: theme.gold, textAlign: 'center', marginBottom: '40px', fontFamily: "'Playfair Display', serif" }}>
          ADMIN PANEL
        </h2>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <AdminLink to="/admin/dashboard" icon={<FiGrid />} text="Dashboard" />
          <AdminLink to="/admin/products" icon={<FiBox />} text="Products" />
          <AdminLink to="/admin/add-product" icon={<FiBox />} text="Add Product" />
          <AdminLink to="/admin/orders" icon={<FiShoppingBag />} text="Orders" />
          <AdminLink to="/" icon={<FiHome />} text="Go to Website" />
        </nav>

        <button 
          onClick={() => { logout(); navigate('/login'); }}
          style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main style={{ flex: 1, background: theme.light, padding: '30px', overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
};

// Helper Component for Sidebar Links
const AdminLink = ({ to, icon, text }) => (
  <Link to={to} style={{ 
    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', 
    color: '#ddd', textDecoration: 'none', borderRadius: '5px', transition: '0.3s' 
  }}
  onMouseEnter={(e) => { e.target.style.background = '#333'; e.target.style.color = '#d4af37'; }}
  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ddd'; }}
  >
    {icon} {text}
  </Link>
);

export default AdminLayout;