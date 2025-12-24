import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiEye, FiHeart, FiShare2 } from 'react-icons/fi';
import { BsStars, BsLightningFill } from 'react-icons/bs'; 

// 1. Context Imports
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext'; 

const animationsStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translate3d(0, 30px, 0); }
    to { opacity: 1; transform: none; }
  }
  .hover-underline-animation { display: inline-block; position: relative; }
  .hover-underline-animation::after {
    content: ''; position: absolute; width: 100%; transform: scaleX(0);
    height: 2px; bottom: 0; left: 0; background-color: #D4AF37;
    transform-origin: bottom right; transition: transform 0.3s ease-out;
  }
  .product-card:hover .hover-underline-animation::after {
    transform: scaleX(1); transform-origin: bottom left;
  }
`;

const ProductCard = ({ product, viewMode, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 2. Context Functions
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist(); 

  const theme = {
    gold: '#d4af37',
    goldDark: '#B4932A',
    black: '#1a1a1a',
    white: '#ffffff',
    textGrey: '#666666',
    border: '#e0e0e0',
    saleRed: '#D32F2F'
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Check if item is in wishlist
  const isWishlisted = isInWishlist(product._id || product.id);

  const cardStyle = {
    background: theme.white,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 5px 15px rgba(0,0,0,0.05)',
    border: `1px solid ${isHovered ? theme.gold : theme.border}`,
    display: 'flex',
    flexDirection: viewMode === 'list' ? 'row' : 'column',
    height: viewMode === 'list' ? '280px' : '530px',
    width: '100%',
    maxWidth: viewMode === 'list' ? '100%' : '350px',
    margin: 'auto',
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
    animation: `fadeInUp 0.6s ease backwards ${index * 0.1}s`
  };

  return (
    <>
      <style>{animationsStyles}</style>
      <div
        className="product-card"
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* --- Badges --- */}
        {discountPercentage > 0 ? (
           <div style={badgeStyle(theme.saleRed, theme.white)}>
             <BsLightningFill /> -{discountPercentage}% SALE
           </div>
        ) : product.premium && (
          <div style={badgeStyle(theme.black, theme.gold)}>
            <BsStars /> PREMIUM
          </div>
        )}

        {/* --- Image Section --- */}
        <div style={{
          height: viewMode === 'list' ? '100%' : '320px',
          width: viewMode === 'list' ? '280px' : '100%',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f4f4f4'
        }}>
          <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 3,
              opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateX(0)' : 'translateX(20px)', transition: 'all 0.3s ease'
          }}>
            
            {/* Wishlist Button */}
            <IconButton 
              onClick={() => addToWishlist(product)}
              theme={theme}
              icon={
                <FiHeart 
                  fill={isWishlisted ? theme.saleRed : "none"} 
                  color={isWishlisted ? theme.saleRed : theme.black} 
                />
              } 
            />
            
            <IconButton icon={<FiShare2 />} theme={theme} onClick={() => alert("Shared!")} />
          </div>

          <Link to={`/product/${product._id || product.id}`}>
            <img
              src={product.image || "https://via.placeholder.com/400x500?text=Wedding+Wear"}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.8s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1.0)'
              }}
            />
          </Link>
        </div>

        {/* --- Details Section --- */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: theme.textGrey, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '5px' }}>
              {product.category || "Sherwani"}
            </span>
            <Link to={`/product/${product._id || product.id}`} style={{ textDecoration: 'none' }}>
              <h3 className="hover-underline-animation" style={{
                fontSize: '18px', fontWeight: '600', color: theme.black, margin: '5px 0 5px 0',
                fontFamily: "'Playfair Display', serif",
                display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', height: '44px'
              }}>
                {product.name}
              </h3>
            </Link>

            {/* --- NEW: RATING STARS SECTION --- */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
              <span style={{ color: '#ffc107', fontSize: '14px', letterSpacing: '2px' }}>
                {'★'.repeat(Math.round(product.rating || 0))} 
                <span style={{ color: '#e4e5e9' }}>
                  {'★'.repeat(5 - Math.round(product.rating || 0))}
                </span>
              </span>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: '500' }}>
                ({product.numReviews || 0})
              </span>
            </div>
            {/* ---------------------------------- */}

            <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: theme.goldDark, marginRight: '10px' }}>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '14px', color: '#aaa', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button
              onClick={() => addToCart(product)} 
              style={{
                flex: 3,
                height: '45px',
                background: isHovered ? theme.gold : theme.black,
                color: isHovered ? theme.black : theme.gold,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isHovered ? `0 5px 15px ${theme.gold}66` : 'none'
              }}
            >
              <FiShoppingCart /> Add to Cart
            </button>

            <Link
              to={`/product/${product._id || product.id}`}
              style={{
                flex: 1,
                height: '45px',
                border: `1px solid ${theme.border}`,
                background: 'transparent',
                borderRadius: '4px',
                color: theme.black,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '18px'
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = theme.gold; e.target.style.color = theme.goldDark; }}
              onMouseLeave={(e) => { e.target.style.borderColor = theme.border; e.target.style.color = theme.black; }}
            >
              <FiEye />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const badgeStyle = (bgColor, textColor) => ({
  position: 'absolute', top: '15px', left: '0',
  background: bgColor, color: textColor,
  padding: '4px 12px', fontSize: '10px', fontWeight: '700',
  letterSpacing: '1px', textTransform: 'uppercase', zIndex: 2,
  borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', gap: '5px',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
});

const IconButton = ({ icon, theme, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '35px', height: '35px',
        background: hover ? theme.gold : theme.white,
        color: hover ? theme.white : theme.black,
        border: 'none', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.3s ease',
        transform: hover ? 'scale(1.1)' : 'scale(1)'
      }}
    >
      {icon}
    </button>
  );
};

export default ProductCard;