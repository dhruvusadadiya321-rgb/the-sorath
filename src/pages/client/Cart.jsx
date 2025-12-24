import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiLock, FiTruck, FiShield, FiGift } from 'react-icons/fi';
import { FaCrown, FaGlassCheers } from 'react-icons/fa';

// 1. Context Import Karo
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();

  // 2. Context mathi Real Data lavo
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Premium Wedding Theme Colors
  const theme = {
    gold: '#d4af37',
    goldLight: '#f0c450',
    goldDark: '#b8941f',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    white: '#ffffff',
    border: '#e5e7eb',
    success: '#4CAF50',
    error: '#ff4444'
  };

  // Calculate Totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const discount = subtotal > 100000 ? 0.1 * subtotal : 0; // 10% discount above 1L
  const total = subtotal + shipping - discount;

  // Empty Cart UI - Premium Version
  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #f0c450 0%, #d4af37 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)'
        }}>
          <FiShoppingBag style={{ fontSize: '50px', color: theme.dark }} />
        </div>
        
        <h2 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '36px', 
          color: theme.dark,
          marginBottom: '15px'
        }}>
          Your Royal Cart Awaits
        </h2>
        
        <p style={{ 
          color: '#666', 
          fontSize: '16px', 
          maxWidth: '400px',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Begin your journey to the perfect wedding look. Discover premium sherwanis, lehengas, and more.
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
            letterSpacing: '0.5px'
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
    <div className="cart-page" style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(26, 26, 26, 0.05) 0%, transparent 70%)',
        zIndex: 0
      }} />

      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '60px 20px 80px',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '42px', 
            color: theme.dark,
            marginBottom: '10px',
            position: 'relative',
            display: 'inline-block'
          }}>
            <span style={{ 
              position: 'absolute',
              bottom: '-5px',
              left: '0',
              right: '0',
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)`
            }} />
            Your Wedding Collection
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            marginTop: '20px'
          }}>
            Curating the perfect look for your special day
          </p>
        </div>

        {/* Cart Content */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* LEFT: Cart Items */}
          <div>
            {/* Cart Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: `2px solid ${theme.gold}20`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaCrown style={{ color: theme.gold, fontSize: '20px' }} />
                <span style={{ 
                  fontWeight: '600', 
                  fontSize: '18px',
                  color: theme.dark
                }}>
                  {cartItems.length} Premium Item{cartItems.length > 1 ? 's' : ''}
                </span>
              </div>
              <button 
                onClick={() => navigate('/shop')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  border: `1px solid ${theme.gold}`,
                  color: theme.gold,
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
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

            {/* Cart Items List */}
            <div style={{ 
              background: theme.white,
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              border: `1px solid ${theme.gold}15`
            }}>
              {cartItems.map((item) => (
                <div key={item._id || item.id} style={{ 
                  display: 'grid',
                  gridTemplateColumns: '120px 2fr 1fr 1fr 60px',
                  alignItems: 'center',
                  padding: '25px',
                  gap: '20px',
                  borderBottom: `1px solid ${theme.gold}10`,
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${theme.gold}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.white;
                  }}
                >
                  {/* Premium Badge */}
                  {item.premium && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
                      color: theme.dark,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '10px',
                      fontWeight: '800',
                      letterSpacing: '1px',
                      zIndex: 2
                    }}>
                      PREMIUM
                    </div>
                  )}

                  {/* Image */}
                  <div style={{ 
                    width: '120px', 
                    height: '140px', 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)',
                    position: 'relative'
                  }}>
                    <img 
                      src={item.image || "https://via.placeholder.com/150"} 
                      alt={item.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <Link to={`/product/${item._id || item.id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ 
                        margin: '0 0 8px 0', 
                        fontSize: '18px', 
                        color: theme.dark,
                        fontWeight: '700',
                        transition: 'color 0.3s ease'
                      }}
                        onMouseEnter={(e) => e.target.style.color = theme.gold}
                        onMouseLeave={(e) => e.target.style.color = theme.dark}
                      >
                        {item.name}
                      </h3>
                    </Link>
                    <p style={{ 
                      margin: 0, 
                      color: '#666', 
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}>
                      {item.category}
                    </p>
                    {item.size && (
                      <div style={{ 
                        display: 'flex', 
                        gap: '15px',
                        marginTop: '10px'
                      }}>
                        <span style={{
                          fontSize: '13px',
                          color: theme.dark,
                          padding: '4px 10px',
                          background: `${theme.gold}10`,
                          borderRadius: '6px'
                        }}>
                          Size: {item.size}
                        </span>
                        {item.color && (
                          <span style={{
                            fontSize: '13px',
                            color: theme.dark,
                            padding: '4px 10px',
                            background: `${theme.gold}10`,
                            borderRadius: '6px'
                          }}>
                            Color: {item.color}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontWeight: '800', 
                      fontSize: '20px',
                      background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      ₹{item.price.toLocaleString()}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#666',
                      marginTop: '5px'
                    }}>
                      per item
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      border: `2px solid ${theme.gold}40`,
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}>
                      <button 
                        onClick={() => updateQuantity(item._id || item.id, 'dec')}
                        style={{ 
                          padding: '10px 15px', 
                          background: 'transparent', 
                          border: 'none', 
                          cursor: 'pointer',
                          color: theme.gold,
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = `${theme.gold}15`}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <FiMinus />
                      </button>
                      <span style={{ 
                        padding: '0 20px', 
                        fontWeight: '700',
                        fontSize: '16px',
                        color: theme.dark,
                        minWidth: '50px',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item._id || item.id, 'inc')}
                        style={{ 
                          padding: '10px 15px', 
                          background: 'transparent', 
                          border: 'none', 
                          cursor: 'pointer',
                          color: theme.gold,
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = `${theme.gold}15`}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button 
                    onClick={() => removeFromCart(item._id || item.id)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: theme.error,
                      cursor: 'pointer', 
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.2)';
                      e.target.style.color = '#ff0000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.color = theme.error;
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ 
              background: theme.white,
              borderRadius: '20px',
              boxShadow: '0 25px 70px rgba(0,0,0,0.1)',
              padding: '30px',
              border: `1px solid ${theme.gold}15`
            }}>
              {/* Order Summary Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                marginBottom: '25px',
                paddingBottom: '20px',
                borderBottom: `2px solid ${theme.gold}20`
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.dark,
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  ₹
                </div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '20px', 
                    color: theme.dark,
                    fontWeight: '700'
                  }}>
                    Order Summary
                  </h3>
                  <p style={{ 
                    margin: '5px 0 0 0', 
                    fontSize: '13px', 
                    color: '#666' 
                  }}>
                    Complete your royal wedding look
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: `1px dashed ${theme.gold}20`
                }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span style={{ fontWeight: '600', color: theme.dark }}>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                    paddingBottom: '15px',
                    borderBottom: `1px dashed ${theme.gold}20`
                  }}>
                    <span style={{ color: theme.success, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FiGift /> Royal Discount
                    </span>
                    <span style={{ fontWeight: '600', color: theme.success }}>
                      - ₹{discount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: `1px dashed ${theme.gold}20`
                }}>
                  <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FiTruck /> Shipping
                  </span>
                  <span style={{ fontWeight: '600', color: shipping === 0 ? theme.success : theme.dark }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {/* Total */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: `2px solid ${theme.gold}30`
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: theme.dark }}>
                    Total Amount
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '28px', 
                      fontWeight: '800',
                      background: `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldDark} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: '1'
                    }}>
                      ₹{total.toLocaleString()}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#666',
                      marginTop: '5px'
                    }}>
                      Including all taxes
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/checkout')}
                style={{ 
                  width: '100%', 
                  padding: '18px 20px', 
                  background: `linear-gradient(135deg, ${theme.dark} 0%, #2a2a2a 100%)`,
                  color: theme.gold, 
                  border: 'none', 
                  borderRadius: '12px',
                  fontSize: '16px', 
                  fontWeight: '700', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
                  e.target.style.background = `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`;
                  e.target.style.color = theme.dark;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                  e.target.style.background = `linear-gradient(135deg, ${theme.dark} 0%, #2a2a2a 100%)`;
                  e.target.style.color = theme.gold;
                }}
              >
                <FiLock size={18} /> PROCEED TO CHECKOUT
              </button>

              {/* Security & Features */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                marginTop: '25px',
                paddingTop: '25px',
                borderTop: `1px solid ${theme.gold}15`
              }}>
                <div style={{ textAlign: 'center' }}>
                  <FiShield style={{ 
                    fontSize: '20px', 
                    color: theme.gold,
                    marginBottom: '8px'
                  }} />
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    Secure Payment
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <FiTruck style={{ 
                    fontSize: '20px', 
                    color: theme.gold,
                    marginBottom: '8px'
                  }} />
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    Free Shipping
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <FaCrown style={{ 
                    fontSize: '20px', 
                    color: theme.gold,
                    marginBottom: '8px'
                  }} />
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    Premium Quality
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div style={{ 
                marginTop: '25px', 
                fontSize: '12px', 
                color: '#888', 
                textAlign: 'center',
                lineHeight: '1.5'
              }}>
                <p>100% Authentic Wedding Attire • Free Alterations • Premium Packaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cart-page > div > div {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          .cart-page > div > div > div:first-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
          
          .cart-page > div > div > div:first-child > div:last-child > div {
            grid-template-columns: 100px 1fr !important;
          }
          
          .cart-page > div > div > div:first-child > div:last-child > div > div:nth-child(3),
          .cart-page > div > div > div:first-child > div:last-child > div > div:nth-child(4) {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .cart-page > div > div > div:first-child > div:first-child {
            flex-direction: column !important;
            gap: 15px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;