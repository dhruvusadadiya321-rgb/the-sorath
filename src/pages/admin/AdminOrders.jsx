import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiTruck, FiSearch, FiFilter, FiEye, FiDownload, FiPrinter, FiClock, FiUser, FiDollarSign, FiPackage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('latest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    revenue: 0
  });
  const navigate = useNavigate();

  const theme = {
    gold: '#d4af37',
    goldLight: '#f0c450',
    goldDark: '#b8941f',
    dark: '#1a1a1a',
    darkLight: '#2a2a2a',
    light: '#f8f9fa',
    white: '#ffffff',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#f59e0b',
    blue: '#3b82f6',
    purple: '#8b5cf6'
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterAndSortOrders();
    setCurrentPage(1);
  }, [orders, searchTerm, statusFilter, dateRange, sortBy]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/orders`, config);
      setOrders(data);
      
      const total = data.length;
      const pending = data.filter(o => !o.isDelivered).length;
      const delivered = data.filter(o => o.isDelivered).length;
      const revenue = data.reduce((sum, order) => sum + order.totalPrice, 0);
      
      setStats({ total, pending, delivered, revenue });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let result = [...orders];

    if (searchTerm) {
      result = result.filter(order => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user_info?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (order.user_info?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(order => {
        if (statusFilter === 'pending') return !order.isDelivered;
        if (statusFilter === 'delivered') return order.isDelivered;
        if (statusFilter === 'paid') return order.isPaid;
        return true;
      });
    }

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      
      result = result.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-high':
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'price-low':
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      default:
        break;
    }

    setFilteredOrders(result);
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const markAsDeliveredHandler = async (id) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };

        await axios.put(`${API_URL}/orders/${id}/deliver`, {}, config);
        
        setOrders(orders.map(order => 
             order._id === id ? { ...order, isDelivered: true, isPaid: true } : order
        ));
      } catch (error) {
        alert('Error updating order status');
      }
    }
  };

  const getStatusColor = (order) => {
    if (order.isDelivered) return theme.green;
    if (order.isPaid && !order.isDelivered) return theme.yellow;
    return theme.red;
  };

  const getStatusText = (order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid && !order.isDelivered) return 'Processing';
    return 'Pending';
  };

  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleExport = () => {
    if (filteredOrders.length === 0) {
        alert("No data to export");
        return;
    }

    const headers = ["Order ID", "Date", "Customer Name", "Email", "Items", "Total Price", "Status"];
    
    const rows = filteredOrders.map(order => [
        order._id,
        new Date(order.createdAt).toLocaleDateString(),
        `"${order.user_info?.name || 'Guest'}"`,
        order.user_info?.email || 'N/A',
        order.orderItems?.length || 0,
        order.totalPrice,
        order.isDelivered ? "Delivered" : "Pending"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px', height: '60px',
            border: `3px solid ${theme.gold}20`,
            borderTopColor: theme.gold,
            borderRadius: '50%', margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }} />
          <h3 style={{ color: theme.dark, fontFamily: 'Playfair Display' }}>Loading Orders Dashboard</h3>
          <p style={{ color: '#666' }}>Fetching order data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '30px',
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
      minHeight: '100vh'
    }} className="print-container">
      
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '40px', flexWrap: 'wrap', gap: '20px'
      }} className="no-print">
        <div>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", fontSize: '32px', 
            color: theme.dark, marginBottom: '10px'
          }}>
            Order Management
          </h1>
          <p style={{ color: '#666' }}>Manage and track all customer orders</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleExport}
            style={{
              padding: '12px 25px', background: theme.dark, color: theme.white,
              border: 'none', borderRadius: '10px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <FiDownload /> Export CSV
          </button>
          
          <button 
            onClick={() => window.print()}
            style={{
              padding: '12px 25px', background: theme.white, color: theme.dark,
              border: `2px solid ${theme.gold}`, borderRadius: '10px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '10px', fontWeight: '600', transition: 'all 0.3s ease'
            }}
          >
            <FiPrinter /> Print Report
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '25px', marginBottom: '40px'
      }} className="stats-section">
        {[
          { title: 'Total Orders', value: stats.total, icon: <FaRegStar />, color: theme.blue, trend: '+12%' },
          { title: 'Pending Orders', value: stats.pending, icon: <FiClock />, color: theme.yellow, trend: '+5%' },
          { title: 'Delivered', value: stats.delivered, icon: <FiCheckCircle />, color: theme.green, trend: '+18%' },
          { title: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: <FiDollarSign />, color: theme.purple, trend: '+22%' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: theme.white, borderRadius: '20px', padding: '25px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: `1px solid ${stat.color}20`,
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '50px', height: '50px', background: `${stat.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: stat.color }}>
                {stat.icon}
              </div>
              <div style={{ padding: '5px 12px', background: `${stat.color}15`, borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: stat.color }}>
                {stat.trend}
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: theme.dark, marginBottom: '5px', lineHeight: '1' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: theme.white, borderRadius: '20px', padding: '25px',
        marginBottom: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        border: `1px solid ${theme.gold}15`
      }} className="no-print">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h3 style={{ fontSize: '20px', color: theme.dark, display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
            <FiFilter /> Order Filters
          </h3>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Showing {filteredOrders.length} orders
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Search Orders</label>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search by ID, name, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '12px 45px 12px 15px', border: `2px solid ${theme.gold}30`, borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
              <FiSearch style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: theme.gold }} />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: '100%', padding: '12px 15px', border: `2px solid ${theme.gold}30`, borderRadius: '10px', fontSize: '14px', background: theme.white, color: theme.dark, cursor: 'pointer', outline: 'none' }}>
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%', padding: '12px 15px', border: `2px solid ${theme.gold}30`, borderRadius: '10px', fontSize: '14px', background: theme.white, color: theme.dark, cursor: 'pointer', outline: 'none' }}>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{
        background: theme.white, borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: `1px solid ${theme.gold}15`
      }}>
        <div style={{ overflowX: 'auto', minHeight: '400px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${theme.gold}08`, borderBottom: `1px solid ${theme.gold}15` }}>
                {['ORDER ID', 'CUSTOMER', 'DATE', 'ITEMS', 'TOTAL', 'STATUS', 'ACTIONS'].map((header, index) => (
                  <th key={index} style={{ padding: '20px 25px', textAlign: 'left', color: theme.dark, fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap' }} className={header === 'ACTIONS' ? 'no-print' : ''}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.3 }}>📦</div>
                    <h3 style={{ marginBottom: '10px', color: theme.dark }}>No Orders Found</h3>
                    <p>Try adjusting your filters or search term</p>
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: `1px solid ${theme.gold}10`, transition: 'all 0.3s ease', cursor: 'pointer' }} 
                      onClick={() => navigate(`/admin/order/${order._id}`)}>
                    
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ fontWeight: '600', color: theme.dark, fontSize: '14px' }}>#{order._id.substring(0, 8)}</div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>{order._id}</div>
                    </td>
                    
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ fontWeight: '600', color: theme.dark, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', background: `${theme.gold}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.gold }}>
                          <FiUser size={16} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '2px' }}>{order.user_info?.name || 'Guest User'}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{order.user_info?.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ fontSize: '14px', color: theme.dark, fontWeight: '500' }}>{formatDate(order.createdAt)}</div>
                    </td>
                    
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ padding: '6px 12px', background: `${theme.blue}10`, borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: theme.blue, width: 'fit-content' }}>
                        {order.orderItems?.length || 0} items
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: theme.goldDark }}>
                        ₹{order.totalPrice?.toLocaleString() || '0'}
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px 25px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: `${getStatusColor(order)}15`, color: getStatusColor(order), borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                        {getStatusText(order) === 'Delivered' && <FiCheckCircle />}
                        {getStatusText(order) === 'Processing' && <FiPackage />}
                        {getStatusText(order) === 'Pending' && <FiClock />}
                        {getStatusText(order)}
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px 25px' }} className="no-print">
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/order/${order._id}`); }} 
                          style={{ padding: '8px 16px', background: theme.dark, color: theme.white, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FiEye size={14} /> View
                        </button>
                        
                        {!order.isDelivered && (
                          <button onClick={(e) => { e.stopPropagation(); markAsDeliveredHandler(order._id); }} 
                            style={{ padding: '8px 16px', background: `${theme.green}15`, color: theme.green, border: `1px solid ${theme.green}30`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FiTruck size={14} /> Deliver
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length > 0 && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '30px', padding: '20px', background: theme.white,
          borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
        }} className="no-print">
          <div style={{ color: '#666', fontSize: '14px' }}>
            Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px', background: currentPage === 1 ? '#eee' : theme.white,
                  border: `1px solid ${theme.gold}30`, borderRadius: '8px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  color: theme.dark, fontWeight: '600', display: 'flex', alignItems: 'center'
                }}>
              <FiChevronLeft /> Previous
            </button>
            
            <div style={{ padding: '8px 16px', background: theme.gold, color: theme.dark, borderRadius: '8px', fontWeight: '600' }}>
              {currentPage} / {totalPages}
            </div>
            
            <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px', background: currentPage === totalPages ? '#eee' : theme.white,
                  border: `1px solid ${theme.gold}30`, borderRadius: '8px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  color: theme.dark, fontWeight: '600', display: 'flex', alignItems: 'center'
                }}>
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          table { min-width: 1000px; }
          .container { padding: 15px !important; }
        }
        @media print {
            .no-print { display: none !important; }
            .print-container { background: white !important; padding: 0 !important; }
            table { width: 100% !important; border: 1px solid #ccc; }
            th, td { border: 1px solid #ddd; padding: 10px !important; }
            body { -webkit-print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
};

export default AdminOrders;