import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser, FiLogOut, FiSettings, FiBox, FiShield } from 'react-icons/fi'; // FiShield import karyu
import { FaCrown, FaGlassCheers } from 'react-icons/fa';

// Context Imports
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, logout } = useAuth(); 
  const { cartItems } = useCart();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme Colors
  const colors = {
    gold: '#d4af37',
    goldLight: '#f0c450',
    goldDark: '#b8941f',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    white: '#ffffff'
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/accessories', label: 'Accessories' },
    { to: '/about', label: 'About' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutClick = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header style={{
        fontFamily: "'Poppins', sans-serif",
        position: 'sticky', top: 0, zIndex: 1000,
        transition: 'all 0.3s ease',
        background: colors.white,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : '0 2px 10px rgba(0,0,0,0.03)',
        borderBottom: `1px solid ${colors.gold}15`,
        height: '80px'
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center',
          height: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 20px'
        }}>
          
          {/* 1. LEFT - Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to} to={link.to}
                style={{
                  textDecoration: 'none',
                  color: isActive(link.to) ? colors.gold : colors.dark,
                  fontWeight: isActive(link.to) ? '700' : '500',
                  fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = colors.gold}
                onMouseLeave={(e) => { if (!isActive(link.to)) e.target.style.color = colors.dark; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 2. CENTER - Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaGlassCheers style={{ color: colors.gold, fontSize: '24px' }} />
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', margin: 0, color: colors.dark, letterSpacing: '2px', lineHeight: '1', fontWeight: '700' }}>
                    THE <span style={{ color: colors.gold }}>SORATH</span>
                  </h1>
                </div>
                <div style={{ fontSize: '10px', color: colors.gold, letterSpacing: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
                  WEDDING BOUTIQUE
                </div>
              </div>
            </Link>
          </div>

          {/* 3. RIGHT - Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
            
            {/* Admin Link (Only visible if user is logged in as Admin) */}
            {user && user.isAdmin && (
              <Link to="/admin/dashboard" style={{
                color: '#e74c3c', fontWeight: 'bold', fontSize: '13px', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #e74c3c',
                padding: '5px 10px', borderRadius: '5px'
              }}>
                <FiShield /> ADMIN
              </Link>
            )}

            <Link to="/wishlist" className="icon-btn" style={{ color: colors.dark }}>
              <FiHeart size={22} />
            </Link>

            <Link to="/cart" className="icon-btn" style={{ position: 'relative', color: colors.dark }}>
              <FiShoppingCart size={22} />
              {cartItems?.length > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: colors.gold, color: colors.dark,
                  fontSize: '10px', fontWeight: 'bold',
                  width: '18px', height: '18px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${colors.white}`
                }}>
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* === USER PROFILE SECTION === */}
            <div style={{ position: 'relative' }}>
              {user ? (
                // Jo User Logged In Hoy
                <div onClick={() => setShowUserMenu(!showUserMenu)} style={{ cursor: 'pointer' }}>
                  <div style={{ 
                    width: '38px', height: '38px', background: colors.gold,
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${colors.white}`, boxShadow: `0 4px 12px ${colors.gold}30`
                  }}>
                    <span style={{ fontWeight: 'bold', color: colors.dark }}>{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              ) : (
                // Jo Logged In NA Hoy -> To Login Button
                <Link to="/login" style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${colors.gold}`, color: colors.gold,
                  transition: 'all 0.3s ease'
                }}>
                  <FiUser size={18} />
                </Link>
              )}

              {/* === USER DROPDOWN MENU === */}
              {user && showUserMenu && (
                <div style={{
                  position: 'absolute', top: '55px', right: '0', width: '220px',
                  background: colors.white, boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  borderRadius: '12px', padding: '12px 0', zIndex: 100,
                  border: `1px solid ${colors.gold}20`, overflow: 'hidden'
                }}>
                  {/* Header */}
                  <div style={{ padding: '0 20px 12px 20px', borderBottom: `1px solid ${colors.gold}10`, marginBottom: '8px' }}>
                    <div style={{ fontWeight: '700', color: colors.dark, fontSize: '16px' }}>{user.name}</div>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{user.email}</div>
                    {user.isAdmin && (
                      <div style={{ fontSize: '10px', color: '#e74c3c', fontWeight: 'bold', marginTop: '5px' }}>ADMINISTRATOR</div>
                    )}
                  </div>

                  {/* Menu Options */}
                  <Link to="/profile" className="menu-item" onClick={() => setShowUserMenu(false)}>
                    <FiUser size={16} /> My Profile
                  </Link>
                  
                  <Link to="/orders" className="menu-item" onClick={() => setShowUserMenu(false)}>
                    <FiBox size={16} /> My Orders
                  </Link>

                  {/* ADMIN LINK IN DROPDOWN ALSO */}
                  {user.isAdmin && (
                    <Link to="/admin/dashboard" className="menu-item" onClick={() => setShowUserMenu(false)} style={{color: '#e74c3c'}}>
                      <FiShield size={16} /> Admin Panel
                    </Link>
                  )}

                  <div onClick={handleLogoutClick} className="menu-item" style={{ color: '#ff4444', borderTop: `1px solid ${colors.gold}10`, marginTop: '8px' }}>
                    <FiLogOut size={16} /> Logout
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <style>{`
        .icon-btn { transition: all 0.3s ease; display: flex; alignItems: 'center'; justify-content: 'center'; }
        .icon-btn:hover { color: ${colors.gold} !important; transform: translateY(-2px); }
        
        .menu-item {
          display: flex; alignItems: center; gap: 10px;
          padding: 10px 20px; color: ${colors.dark};
          text-decoration: none; font-size: 14px; fontWeight: 500;
          transition: all 0.2s ease; cursor: pointer;
        }
        .menu-item:hover { background: ${colors.gold}10; padding-left: 25px; color: ${colors.gold}; }
        
        @media (max-width: 900px) { nav { gap: 15px !important; } nav a { font-size: 12px !important; } }
        @media (max-width: 768px) { header > div { grid-template-columns: 1fr auto 1fr !important; } nav { display: none !important; } }
      `}</style>
    </>
  );
};

export default Navbar;