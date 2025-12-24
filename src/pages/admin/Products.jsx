import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiPackage, FiAlertCircle, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { API_URL } from '../../config';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();

  const theme = {
    gold: '#d4af37',
    dark: '#1a1a1a',
    light: '#f8f9fa',
    white: '#ffffff',
    danger: '#ef4444',
    success: '#10b981',
    blue: '#3b82f6'
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this product?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
        
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        await axios.delete(`${API_URL}/api/products/${id}`, config);
        
        setProducts(products.filter(product => product._id !== id));
        alert('Product Deleted Successfully');
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Error deleting product. Check if you are Admin.');
      }
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '50px', height: '50px', border: `3px solid ${theme.gold}`, borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: theme.dark, fontSize: '32px', margin: '0 0 10px 0' }}>
            Product Inventory
            </h1>
            <p style={{ color: '#666', margin: 0 }}>Manage your catalog, stock and pricing</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
            <button 
                onClick={fetchProducts}
                style={{ background: theme.white, border: `1px solid ${theme.gold}`, color: theme.dark, padding: '12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                <FiRefreshCw /> Refresh
            </button>

            <Link to="/admin/product/new" style={{ textDecoration: 'none' }}>
            <button style={{
                background: theme.gold, color: theme.dark, border: 'none', padding: '12px 25px',
                borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
                cursor: 'pointer', boxShadow: '0 5px 15px rgba(212, 175, 55, 0.3)', transition: 'all 0.3s ease'
            }}>
                <FiPlus size={18} /> Add Product
            </button>
            </Link>
        </div>
      </div>

      <div style={{ background: theme.white, padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: '20px' }} />
            <input 
                type="text" 
                placeholder="Search by Name, Category or Brand..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                    border: `1px solid #eee`, 
                    padding: '12px 15px 12px 45px', 
                    borderRadius: '10px', 
                    width: '100%', 
                    fontSize: '15px', 
                    outline: 'none',
                    background: '#f9fafb'
                }}
            />
        </div>
        <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '14px', fontWeight: '500' }}>
            <span>Total: <b>{filteredProducts.length}</b> Items</span>
            <span>Page: <b>{currentPage}</b> of <b>{totalPages}</b></span>
        </div>
      </div>

      <div style={{ background: theme.white, borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center', color: '#888' }}>
            <div style={{ background: '#f8f9fa', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <FiPackage size={40} color="#ccc" />
            </div>
            <h3>No products found</h3>
            <p>Try adjusting your search or add a new product.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                <tr>
                    <th style={thStyle}>PRODUCT</th>
                    <th style={thStyle}>CATEGORY / BRAND</th>
                    <th style={thStyle}>PRICE</th>
                    <th style={thStyle}>STOCK STATUS</th>
                    <th style={thStyle}>CREATED AT</th>
                    <th style={{ ...thStyle, textAlign: 'right', paddingRight: '30px' }}>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.map((product) => (
                    <tr key={product._id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'all 0.2s' }} className="hover-row">
                    
                    <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee', background: '#fff' }}>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div>
                            <div style={{ fontWeight: '600', color: theme.dark, fontSize: '15px' }}>{product.name}</div>
                            <small style={{ color: '#888' }}>ID: {product._id.substring(0, 10)}...</small>
                        </div>
                    </td>

                    <td style={{ padding: '20px' }}>
                        <div style={{ fontWeight: '500' }}>{product.category}</div>
                        <small style={{ color: '#666', background: '#f0f2f5', padding: '2px 8px', borderRadius: '4px' }}>
                            {product.brand || 'No Brand'}
                        </small>
                    </td>

                    <td style={{ padding: '20px', fontWeight: 'bold', color: theme.dark, fontSize: '16px' }}>
                        ₹{product.price?.toLocaleString()}
                    </td>

                    <td style={{ padding: '20px' }}>
                        {product.countInStock > 0 ? (
                        <span style={{ background: `${theme.success}15`, color: theme.success, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme.success }}></div>
                            In Stock ({product.countInStock})
                        </span>
                        ) : (
                        <span style={{ background: `${theme.danger}15`, color: theme.danger, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <FiAlertCircle /> Out of Stock
                        </span>
                        )}
                    </td>
                    
                    <td style={{ padding: '20px', color: '#666', fontSize: '14px' }}>
                        {product.createdAt ? product.createdAt.substring(0, 10) : 'N/A'}
                    </td>

                    <td style={{ padding: '20px', textAlign: 'right', paddingRight: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            
                            <button 
                                onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                style={actionBtnStyle(theme.blue)}
                                title="Edit Product"
                            >
                                <FiEdit />
                            </button>

                            <button 
                                onClick={() => handleDelete(product._id)}
                                style={actionBtnStyle(theme.danger)}
                                title="Delete Product"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px', gap: '10px' }}>
            <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ padding: '10px 15px', border: 'none', background: theme.white, borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: theme.dark }}
            >
                <FiChevronLeft />
            </button>
            <span style={{ fontWeight: '600', color: theme.dark }}>Page {currentPage} of {totalPages}</span>
            <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ padding: '10px 15px', border: 'none', background: theme.white, borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', color: theme.dark }}
            >
                <FiChevronRight />
            </button>
        </div>
      )}

    </div>
  );
};

const thStyle = {
  padding: '20px',
  textAlign: 'left',
  fontSize: '12px',
  color: '#888',
  fontWeight: '700',
  letterSpacing: '1px',
  textTransform: 'uppercase'
};

const actionBtnStyle = (color) => ({
  background: 'transparent',
  color: color,
  border: `1px solid ${color}40`,
  width: '38px',
  height: '38px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.3s',
  fontSize: '16px'
});

export default Products;