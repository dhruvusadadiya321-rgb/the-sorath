import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FiCheckCircle, FiMapPin, FiCreditCard, FiTruck, FiLock } from 'react-icons/fi';
// 👇 1. Config Import
import { API_URL } from '../../config';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    address: '', city: '', zip: '', state: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    border: '#e5e7eb'
  };

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/shop');
    }
  }, [cartItems, navigate, orderPlaced]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name || '',
        email: user.email || '' 
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if(!formData.firstName || !formData.address || !formData.phone || !formData.email) {
        alert("Please fill in all shipping details.");
        return;
    }

    setLoading(true);

    try {
        const orderData = {
            user_info: formData,
            orderItems: cartItems.map(item => ({
                product: item._id || item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity
            })),
            paymentMethod: paymentMethod,
            totalPrice: total
        };

        // 👇 Token Logic Added (Optional but recommended)
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo?.token}` // Token moklo
            }
        };

        // 👇 API URL Updated
        await axios.post(`${API_URL}/orders`, orderData, config);

        setOrderPlaced(true);
        clearCart(); 
        
    } catch (error) {
        console.error("Order Error:", error);
        alert("Order Failed! Check console for details.");
    } finally {
        setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '60px', color: 'green', marginBottom: '20px' }}>
                <FiCheckCircle />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark }}>Order Placed Successfully!</h1>
            <p style={{ color: '#666', fontSize: '18px', maxWidth: '500px' }}>
                Thank you, <b>{formData.firstName}</b>! Your royal attire will be shipped to <b>{formData.city}</b> soon.
            </p>
            <button onClick={() => navigate('/orders')} style={{ marginTop: '30px', padding: '15px 40px', background: theme.gold, border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                View My Orders
            </button>
        </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', background: '#f9f9f9', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
            Secure Checkout
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          
          <div style={{ flex: '2', minWidth: '350px' }}>
            <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '15px', marginTop: 0 }}>
                    <FiMapPin color={theme.gold} /> Shipping Address
                </h3>

                <form id="checkout-form" onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required style={inputStyle} />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} style={inputStyle} />
                    
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        style={{ ...inputStyle, gridColumn: 'span 2', background: '#f0f0f0' }} 
                        readOnly 
                    />
                    
                    <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required style={{ ...inputStyle, gridColumn: 'span 2' }} />
                    <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleInputChange} required style={{ ...inputStyle, gridColumn: 'span 2' }} />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required style={inputStyle} />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required style={inputStyle} />
                    <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleInputChange} required style={inputStyle} />
                </form>

                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '15px', marginTop: '40px' }}>
                    <FiCreditCard color={theme.gold} /> Payment Method
                </h3>
                
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ ...paymentOptionStyle, borderColor: paymentMethod === 'cod' ? theme.gold : theme.border, background: paymentMethod === 'cod' ? '#fffdf5' : '#fff' }}>
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                        <span style={{ fontWeight: '600' }}>Cash on Delivery (COD)</span>
                        <FiTruck style={{ marginLeft: 'auto' }} />
                    </label>

                    <label style={{ ...paymentOptionStyle, borderColor: paymentMethod === 'online' ? theme.gold : theme.border, background: paymentMethod === 'online' ? '#fffdf5' : '#fff' }}>
                        <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                        <span style={{ fontWeight: '600' }}>Online Payment (UPI / Card)</span>
                        <FiLock style={{ marginLeft: 'auto' }} />
                    </label>
                </div>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Your Order</h3>
                
                <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', borderBottom: `1px solid ${theme.border}` }}>
                    {cartItems.map(item => (
                        <div key={item._id || item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                            <img src={item.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity} | Size: {item.size || 'Free'}</div>
                                <div style={{ fontSize: '14px', color: theme.dark }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#666' }}>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ color: '#666' }}>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', borderTop: `1px solid ${theme.border}`, paddingTop: '20px' }}>
                    <span>Total</span>
                    <span style={{ color: theme.gold }}>₹{total.toLocaleString()}</span>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{ 
                        width: '100%', padding: '18px', 
                        background: loading ? '#999' : theme.dark,
                        color: '#fff', border: 'none', borderRadius: '8px', 
                        fontSize: '16px', fontWeight: 'bold', marginTop: '30px', cursor: loading ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {loading ? 'PROCESSING...' : 'PLACE ORDER'}
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const inputStyle = {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none'
};

const paymentOptionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    border: '1px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s'
};

export default Checkout;