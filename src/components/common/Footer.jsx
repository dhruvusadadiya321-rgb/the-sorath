import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiPhone, FiMail, FiMapPin, FiChevronRight, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Theme Colors
  const colors = {
    gold: '#d4af37',
    goldLight: '#f0c450',
    dark: '#1a1a1a',
    darkLight: '#2a2a2a',
    white: '#ffffff',
    grey: '#94a3b8',
    greyLight: '#cbd5e1'
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer style={{ 
      background: `linear-gradient(135deg, ${colors.dark} 0%, #000000 100%)`,
      color: colors.white,
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      borderTop: `4px solid ${colors.gold}`
    }}>
      
      {/* Decorative Gold Glow */}
      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
        boxShadow: `0 0 30px 5px ${colors.gold}40`
      }} />

      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '70px 20px 30px' }}>
        
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ 
                width: '45px', height: '45px', background: colors.gold, color: colors.dark, 
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '24px', fontWeight: 'bold' 
              }}>
                S
              </div>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0, lineHeight: 1 }}>
                  THE <span style={{ color: colors.gold }}>SORATH</span>
                </h2>
                <span style={{ fontSize: '10px', letterSpacing: '3px', color: colors.greyLight }}>WEDDING BOUTIQUE</span>
              </div>
            </div>
            <p style={{ color: colors.grey, fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
              Discover the finest collection of Sherwanis, Jodhpuris, and royal accessories. 
              Crafted for the modern groom who values tradition.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" style={{ 
                  width: '35px', height: '35px', borderRadius: '50%', border: `1px solid ${colors.grey}`, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.gold, transition: '0.3s'
                }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 style={{ color: colors.gold, fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCrown size={16} /> COLLECTIONS
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Shop All', link: '/shop' },
                { name: 'Royal Accessories', link: '/accessories' },
                { name: 'Sherwanis', link: '/shop?cat=Sherwani' },
                { name: 'Jodhpuris', link: '/shop?cat=Jodhpuri' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link to={item.link} style={{ textDecoration: 'none', color: colors.greyLight, fontSize: '14px', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiChevronRight size={12} color={colors.gold} /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 style={{ color: colors.gold, fontSize: '18px', marginBottom: '20px' }}>CUSTOMER CARE</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'My Cart', link: '/cart', icon: <FiShoppingBag size={12} /> },
                { name: 'Wishlist', link: '/wishlist', icon: <FiHeart size={12} /> },
                { name: 'Login / Register', link: '/login' },
                { name: 'Shipping Policy', link: '#' },
                { name: 'Contact Us', link: '#' }
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '12px' }}>
                  <Link to={item.link} style={{ textDecoration: 'none', color: colors.greyLight, fontSize: '14px', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {item.icon || <FiChevronRight size={12} color={colors.gold} />} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 style={{ color: colors.gold, fontSize: '18px', marginBottom: '20px' }}>GET IN TOUCH</h3>
            <div style={{ color: colors.greyLight, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <FiMapPin color={colors.gold} size={18} />
                <span>101, Royal Plaza, Varachha Road,<br/>Surat, Gujarat - 395006</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FiPhone color={colors.gold} size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <FiMail color={colors.gold} size={18} />
                <span>info@thesorath.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ fontSize: '14px', marginBottom: '10px', color: colors.white }}>Subscribe for Updates</h4>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', padding: '5px' }}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'white', padding: '8px', flex: 1, outline: 'none', fontSize: '13px' }}
                  required
                />
                <button type="submit" style={{ background: colors.gold, border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  GO
                </button>
              </form>
              {subscribed && <p style={{ color: colors.gold, fontSize: '12px', marginTop: '5px' }}>Thanks for subscribing!</p>}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <p style={{ color: colors.grey, fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()} The Sorath. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '20px', filter: 'grayscale(100%) brightness(200%)' }} />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '20px', filter: 'grayscale(100%) brightness(200%)' }} />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" style={{ height: '20px', filter: 'grayscale(100%) brightness(200%)' }} />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;