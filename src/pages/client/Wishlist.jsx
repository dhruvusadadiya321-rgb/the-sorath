import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft, FiEye, FiShare2 } from 'react-icons/fi';
import { FaCrown, FaGlassCheers, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Premium Wedding Theme Colors
  const theme = {
    gold: '#d4af37',
    goldLight: '#f0c450',
    goldDark: '#b8941f',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    white: '#ffffff',
    border: '#e5e7eb',
    pink: '#FF6584',
    success: '#4CAF50'
  };

  // Empty State - Premium Version
  if (wishlistItems.length === 0) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 101, 132, 0.08) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div style={{
          width: '140px',
          height: '140px',
          background: 'linear-gradient(135deg, #FF6584 0%, #FFC107 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(255, 101, 132, 0.3)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiHeart style={{ fontSize: '48px', color: theme.pink }} />
          </div>
        </div>
        
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '36px', 
          color: theme.dark,
          marginBottom: '15px',
          position: 'relative',
          zIndex: 1
        }}>
          Your Wedding Wishlist Awaits
        </h2>
        
        <p style={{ 
          color: '#666', 
          fontSize: '16px', 
          maxWidth: '400px',
          marginBottom: '30px',
          lineHeight: '1.6',
          position: 'relative',
          zIndex: 1
        }}>
          Save your favorite royal wedding attire here. Perfect for planning your special day.
        </p>
        
        <button 
          onClick={() => navigate('/shop')}
          style={{ 
            padding: '16px 40px', 
            background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
            color: theme.dark, 
            border: 'none', 
            borderRadius: '50px',
            cursor: 'pointer', 
            fontWeight: '700',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
          }}
        >
          <FaGlassCheers /> Explore Wedding Collection
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px 80px'
    }}>
      
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255, 101, 132, 0.05) 0%, transparent 70%)',
        zIndex: 0
      }} />

      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Header */}
        <div style={{ 
          marginBottom: '50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '42px', 
              color: theme.dark,
              marginBottom: '10px',
              position: 'relative'
            }}>
              <span style={{ 
                position: 'absolute',
                bottom: '-5px',
                left: '0',
                width: '80px',
                height: '3px',
                background: theme.gold
              }} />
              Wedding Wishlist
            </h1>
            <p style={{ 
              color: '#666', 
              fontSize: '16px',
              marginTop: '20px'
            }}>
              Curate your perfect wedding look with {wishlistItems.length} premium items
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => navigate('/shop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'transparent',
                border: `2px solid ${theme.gold}`,
                color: theme.gold,
                padding: '12px 24px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.gold;
                e.target.style.color = theme.dark;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = theme.gold;
              }}
            >
              <FiArrowLeft /> Continue Shopping
            </button>
          </div>
        </div>

        {/* Wishlist Counter */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '30px',
          padding: '15px 25px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 101, 132, 0.1) 100%)',
          borderRadius: '15px',
          border: `1px solid ${theme.gold}20`,
          maxWidth: 'fit-content'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: theme.pink,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.white,
            fontSize: '20px'
          }}>
            <FaRegHeart />
          </div>
          <div>
            <div style={{ fontWeight: '600', color: theme.dark }}>
              {wishlistItems.length} Saved Item{wishlistItems.length > 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              Your curated wedding collection
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {wishlistItems.map((product) => (
            <div 
              key={product._id || product.id} 
              style={{ 
                background: theme.white,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                border: `1px solid ${theme.gold}15`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.08)';
              }}
            >
              
              {/* Premium Badge */}
              {product.premium && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
                  color: theme.dark,
                  padding: '6px 15px',
                  borderRadius: '20px',
                  fontSize: '10px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaCrown /> PREMIUM
                </div>
              )}

              {/* Image */}
              <div 
                style={{ 
                  height: '280px', 
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }} 
                onClick={() => navigate(`/product/${product._id || product.id}`)}
              >
                <img 
                  src={product.image || "https://via.placeholder.com/400"} 
                  alt={product.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Action Buttons Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  zIndex: 3
                }}>
                  {/* Remove Button */}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      removeFromWishlist(product._id || product.id); 
                    }}
                    style={{ 
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.pink,
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.pink;
                      e.target.style.color = theme.white;
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.color = theme.pink;
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <FiTrash2 />
                  </button>

                  {/* Quick View Button */}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation();
                      navigate(`/product/${product._id || product.id}`);
                    }}
                    style={{ 
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.gold,
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.gold;
                      e.target.style.color = theme.dark;
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.color = theme.gold;
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <FiEye />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div style={{ padding: '25px' }}>
                {/* Category */}
                <div style={{ 
                  fontSize: '12px',
                  color: theme.gold,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{
                    padding: '4px 10px',
                    background: `${theme.gold}10`,
                    borderRadius: '20px'
                  }}>
                    {product.category}
                  </span>
                </div>

                {/* Product Name */}
                <Link to={`/product/${product._id || product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    margin: '0 0 15px 0', 
                    color: theme.dark, 
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: '1.4',
                    transition: 'color 0.3s ease'
                  }}
                    onMouseEnter={(e) => e.target.style.color = theme.gold}
                    onMouseLeave={(e) => e.target.style.color = theme.dark}
                  >
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '15px',
                  borderBottom: `1px solid ${theme.gold}20`
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '800',
                      background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: '1'
                    }}>
                      ₹{product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#999',
                        textDecoration: 'line-through',
                        marginTop: '5px'
                      }}>
                        ₹{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: theme.gold,
                    fontSize: '14px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ fontSize: '14px' }}>★</span>
                    ))}
                    <span style={{ color: '#666', fontSize: '12px', marginLeft: '5px' }}>
                      ({(Math.random() * 100 + 20).toFixed(0)})
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => { 
                      addToCart(product); 
                      removeFromWishlist(product._id || product.id); 
                    }}
                    style={{ 
                      flex: 2,
                      padding: '14px 20px',
                      background: theme.dark,
                      color: theme.gold,
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.gold;
                      e.target.style.color = theme.dark;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = theme.dark;
                      e.target.style.color = theme.gold;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <FiShoppingCart /> Move to Cart
                  </button>

                  <button 
                    onClick={() => alert('Shared!')}
                    style={{ 
                      width: '50px',
                      background: `${theme.gold}10`,
                      border: `1px solid ${theme.gold}30`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.gold,
                      fontSize: '18px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.gold;
                      e.target.style.color = theme.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${theme.gold}10`;
                      e.target.style.color = theme.gold;
                    }}
                  >
                    <FiShare2 />
                  </button>
                </div>

                {/* Quick Info */}
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${theme.gold}10`
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>Delivery</div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: theme.success }}>Free</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>Returns</div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: theme.gold }}>30 Days</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div style={{ 
          marginTop: '60px',
          padding: '30px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(255, 101, 132, 0.05) 100%)',
          borderRadius: '20px',
          textAlign: 'center',
          border: `1px solid ${theme.gold}15`
        }}>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            color: theme.dark,
            marginBottom: '15px'
          }}>
            Planning Your Perfect Wedding Look?
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            maxWidth: '600px',
            margin: '0 auto 30px',
            lineHeight: '1.6'
          }}>
            Your wishlist helps you curate and compare premium wedding attire. 
            Save items from different collections and plan your complete wedding wardrobe.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/wedding-men')}
              style={{
                padding: '12px 30px',
                background: theme.dark,
                color: theme.gold,
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.gold;
                e.target.style.color = theme.dark;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = theme.dark;
                e.target.style.color = theme.gold;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Explore Groom Collection
            </button>
            <button 
              onClick={() => navigate('/wedding-women')}
              style={{
                padding: '12px 30px',
                background: theme.dark,
                color: theme.pink,
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.pink;
                e.target.style.color = theme.dark;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = theme.dark;
                e.target.style.color = theme.pink;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Explore Bridal Collection
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .container > div:first-child > div:last-child {
            width: 100%;
            margin-top: 20px;
          }
          
          .container > div:first-child > div:last-child > button {
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          
          .container > div:last-child > div {
            flex-direction: column !important;
          }
          
          .container > div:last-child > div > button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Wishlist;