import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiClock, FiCheckCircle, FiChevronRight, FiShoppingBag } from 'react-icons/fi';
import { API_URL } from '../../config';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    border: '#e5e7eb',
    green: '#27ae60',
    blue: '#2980b9'
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo?.token}` }
        };

        const { data } = await axios.get(`${API_URL}/orders/myorders?email=${user.email}`, config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading your royal orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', color: '#ddd', marginBottom: '20px' }}><FiShoppingBag /></div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark }}>No Orders Yet</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>Start your journey with our exclusive collection.</p>
        <button onClick={() => navigate('/shop')} style={{ padding: '12px 30px', background: theme.gold, color: theme.dark, border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', background: '#f9f9f9', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '30px', borderBottom: `2px solid ${theme.gold}`, display: 'inline-block', paddingBottom: '10px' }}>
          My Order History
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
              
              <div style={{ background: '#f8f9fa', padding: '15px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Order Placed</div>
                  <div style={{ fontWeight: '600', color: theme.dark }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Total Amount</div>
                  <div style={{ fontWeight: '600', color: theme.dark }}>₹{order.totalPrice?.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Order ID</div>
                  <div style={{ fontWeight: '600', color: '#666' }}>#{order._id.slice(-6).toUpperCase()}</div>
                </div>
                <div>
                    <div style={{ 
                      padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                      background: order.isDelivered ? `${theme.green}20` : `${theme.blue}20`,
                      color: order.isDelivered ? theme.green : theme.blue,
                      display: 'flex', alignItems: 'center', gap: '5px'
                    }}>
                      {order.isDelivered ? <FiCheckCircle /> : <FiClock />}
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </div>
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: index !== order.orderItems.length - 1 ? '20px' : '0' }}>
                    <img 
                      src={item.image || "https://via.placeholder.com/80"} 
                      alt={item.name} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0', color: theme.dark }}>{item.name}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Qty: {item.quantity}</p>
                      <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: theme.gold }}>₹{item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/product/${item.product}`)}
                      style={{ background: 'transparent', border: `1px solid ${theme.border}`, padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', color: theme.dark, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      View Item <FiChevronRight />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;