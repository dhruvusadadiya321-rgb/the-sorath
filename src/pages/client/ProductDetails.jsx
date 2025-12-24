import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiCheck, FiStar, FiArrowLeft } from 'react-icons/fi';
import { BsLightningFill } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { API_URL } from '../../config';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const colors = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    accent: '#6C63FF',
    success: '#4CAF50',
    danger: '#FF6584'
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError('Could not load product details.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const imageGallery = product?.images?.length > 0 
    ? product.images 
    : [
        product?.image || "https://via.placeholder.com/800",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590422749842-2d176717462a?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop"
      ];

  const specifications = [
    { label: 'Category', value: product?.category || 'Wedding Wear' },
    { label: 'Material', value: 'Premium Fabric' }, 
    { label: 'Rating', value: `${product?.rating || 0} / 5` },
    { label: 'Stock Status', value: product?.countInStock > 0 ? 'In Stock' : 'Out of Stock' },
    { label: 'Warranty', value: '1 Year' },
    { label: 'Product ID', value: id?.slice(-6).toUpperCase() }
  ];

  const dbReviews = product?.reviews || [];
  const dummyReviews = [
    { _id: 1, name: 'Aarav Sharma', rating: 5, createdAt: '2024-01-15', comment: 'Excellent quality! Exceeded expectations.' },
    { _id: 2, name: 'Priya Patel', rating: 4, createdAt: '2024-01-10', comment: 'Beautiful product, perfect for gifting.' },
    { _id: 3, name: 'Rohan Verma', rating: 5, createdAt: '2024-01-05', comment: 'Authentic craftsmanship. Highly recommended!' }
  ];
  const reviewsToShow = dbReviews.length > 0 ? dbReviews : dummyReviews;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', border: '4px solid rgba(212, 175, 55, 0.1)', borderTopColor: colors.gold, borderRadius: '50%', margin: '0 auto 30px', animation: 'spin 1s linear infinite' }} />
          <h3 style={{ color: colors.dark, fontFamily: "'Playfair Display', serif", marginBottom: '10px' }}>Loading Premium Details</h3>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: colors.dark, fontFamily: "'Playfair Display', serif" }}>Product Not Found</h2>
          <button onClick={() => navigate('/shop')} style={{ marginTop: '20px', padding: '12px 30px', background: colors.gold, color: colors.dark, border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Back to Shop</button>
        </div>
      </div>
    );
  }

  const isProductInWishlist = isInWishlist(product._id || product.id);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef1ff 100%)', padding: '20px', fontFamily: "'Poppins', sans-serif" }}>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto 30px', padding: '20px 0' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: `1px solid ${colors.gold}`, color: colors.gold, padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease', marginBottom: '20px' }}>
          <FiArrowLeft /> Back
        </button>
        <div style={{ background: colors.gold, color: colors.dark, padding: '8px 20px', borderRadius: '20px', display: 'inline-block', fontWeight: '600', fontSize: '14px', letterSpacing: '1px', marginLeft: '15px' }}>
          PREMIUM COLLECTION
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', background: '#fff', borderRadius: '20px', boxShadow: '0 20px 60px rgba(108, 99, 255, 0.1)', overflow: 'hidden' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '600px' }}>
          
          <div style={{ flex: '1', minWidth: '300px', padding: '40px' }}>
            <div style={{ height: '450px', background: '#f9f9f9', borderRadius: '15px', overflow: 'hidden', marginBottom: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={imageGallery[selectedImage]} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '20px' }} />
              <div style={{ position: 'absolute', top: '20px', right: '20px', background: colors.gold, color: colors.dark, padding: '8px 16px', borderRadius: '30px', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <BsLightningFill /> EXCLUSIVE
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
              {imageGallery.map((img, index) => (
                <div key={index} onClick={() => setSelectedImage(index)} style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${selectedImage === index ? colors.gold : '#eee'}`, flexShrink: 0 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '300px', padding: '40px', borderLeft: '1px solid #eee' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', color: colors.accent, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <div style={{ display: 'flex', color: colors.gold }}>
                  {[...Array(5)].map((_, i) => <FiStar key={i} fill={i < Math.round(product.rating || 0) ? colors.gold : "none"} stroke={colors.gold} />)}
                </div>
                <span style={{ color: '#666', fontSize: '14px' }}>({product.numReviews || 0} reviews)</span>
              </div>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: '700', color: colors.dark, marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>{product.name}</h1>

            <div style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '36px', fontWeight: '800', color: colors.gold }}>₹{product.price.toLocaleString()}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
              {[{ icon: <FiTruck />, text: 'Free Shipping' }, { icon: <FiShield />, text: '1 Year Warranty' }, { icon: <FiCheck />, text: 'Authentic Certificate' }, { icon: <FiCheck />, text: 'Premium Packaging' }].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                  <div style={{ color: colors.gold }}>{f.icon}</div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Quantity</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', border: `2px solid ${colors.gold}`, borderRadius: '10px', overflow: 'hidden' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: colors.gold }}>-</button>
                  <input type="text" value={quantity} readOnly style={{ width: '40px', height: '40px', border: 'none', textAlign: 'center', fontSize: '16px', fontWeight: '600' }} />
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: colors.gold }}>+</button>
                </div>
                <div style={{ fontSize: '14px', color: product.countInStock > 0 ? colors.success : colors.danger, fontWeight: 'bold' }}>
                    {product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <button onClick={() => addToCart(product, quantity)} disabled={product.countInStock === 0} style={{ flex: '2', padding: '18px 30px', background: product.countInStock > 0 ? `linear-gradient(135deg, ${colors.gold} 0%, #f0c450 100%)` : '#ccc', color: colors.dark, border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minWidth: '200px' }}>
                <FiShoppingCart /> {product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
              </button>
              <button onClick={() => addToWishlist(product)} style={{ width: '60px', background: isProductInWishlist ? colors.danger : '#f8f9ff', color: isProductInWishlist ? '#fff' : colors.dark, border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiHeart fill={isProductInWishlist ? 'white' : 'none'} />
              </button>
              <button onClick={() => alert("Shared!")} style={{ width: '60px', background: '#f8f9ff', color: colors.dark, border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiShare2 />
              </button>
            </div>

          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '20px 40px', background: 'transparent', border: 'none', borderBottom: `3px solid ${activeTab === tab ? colors.gold : 'transparent'}`, fontWeight: '600', fontSize: '16px', color: activeTab === tab ? colors.dark : '#666', cursor: 'pointer', textTransform: 'capitalize' }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: '40px' }}>
            {activeTab === 'description' && (
              <div>
                <h3 style={{ marginBottom: '20px', color: colors.dark }}>Product Description</h3>
                <p style={{ color: '#666', lineHeight: '1.8' }}>{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {specifications.map((spec, index) => (
                  <div key={index} style={{ background: '#f8f9ff', padding: '20px', borderRadius: '10px' }}>
                    <div style={{ color: '#666', fontSize: '14px' }}>{spec.label}</div>
                    <div style={{ color: colors.dark, fontWeight: '600' }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h3 style={{ marginBottom: '20px', color: colors.dark }}>Customer Reviews</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {reviewsToShow.map((review) => (
                    <div key={review._id} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <strong style={{ color: colors.dark }}>{review.name}</strong>
                        <div style={{ display: 'flex', color: colors.gold }}>
                          {[...Array(5)].map((_, i) => <FiStar key={i} fill={i < review.rating ? colors.gold : "none"} size={14} />)}
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
                      <div style={{ color: '#666' }}>{review.comment}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;