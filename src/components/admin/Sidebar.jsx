import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// 👇 Ahiya FiShoppingBag ane FiUsers add karya che
import { FiGrid, FiBox, FiPlusSquare, FiImage, FiLogOut, FiShoppingBag, FiUsers } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    text: '#ecf0f1',
    activeBg: '#d4af37',
    activeText: '#1a1a1a'
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid /> },
    { name: 'All Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Add Product', path: '/admin/product/new', icon: <FiPlusSquare /> },
    { name: 'Slider / Header', path: '/admin/slider', icon: <FiImage /> }, 
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> }, // Have aa work karse
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },          // Have aa pan work karse
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ width: '260px', background: theme.dark, minHeight: '100vh', padding: '20px', color: theme.text, position: 'fixed', left: 0, top: 0, overflowY: 'auto' }}>
      
      {/* Brand Logo */}
      <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: `1px solid ${theme.gold}30`, paddingBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", margin: 0, color: theme.gold }}>THE SORATH</h2>
        <span style={{ fontSize: '10px', letterSpacing: '2px', opacity: 0.7 }}>ADMIN PANEL</span>
      </div>

      {/* Menu Links */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item.name} style={{ marginBottom: '10px' }}>
            <Link to={item.path} style={{
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '15px',
              padding: '12px 20px', borderRadius: '8px',
              background: isActive(item.path) ? theme.activeBg : 'transparent',
              color: isActive(item.path) ? theme.activeText : theme.text,
              fontWeight: isActive(item.path) ? 'bold' : 'normal',
              transition: '0.3s'
            }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout (Bottom) */}
      <div style={{ position: 'absolute', bottom: '20px', width: '85%' }}>
        <button style={{
          width: '100%', padding: '12px', background: '#c0392b', color: 'white', border: 'none',
          borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
        }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;