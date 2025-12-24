import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiUser, FiShield, FiAlertTriangle } from 'react-icons/fi';
// API_URL ઈમ્પોર્ટ કર્યો (તમારી config ફાઈલ મુજબ)
import { API_URL } from '../../config'; 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo || !userInfo.token) {
          setError("No Login Token Found");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        // સુધારો: localhost ની જગ્યાએ API_URL વેરીએબલ
        const { data } = await axios.get(`${API_URL}/api/users`, config);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        // સુધારો: localhost ની જગ્યાએ API_URL વેરીએબલ
        await axios.delete(`${API_URL}/api/users/${id}`, config);
        
        setUsers(users.filter(user => user._id !== id));
        alert("User Deleted Successfully");
      } catch (error) {
        alert("Error deleting user: " + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Users...</div>;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>All Users</h1>
      
      {error && (
        <div style={{ background: '#ffebee', color: '#c0392b', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiAlertTriangle /> Error: {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
        
        {users.length === 0 && !error ? (
           <div style={{ padding: '30px', textAlign: 'center', color: '#888' }}>No Users Found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
              <tr>
                <th style={thStyle}>NAME</th>
                <th style={thStyle}>EMAIL</th>
                <th style={thStyle}>ROLE</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#d4af37', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    {user.name}
                  </td>
                  <td style={{ padding: '15px 20px', color: '#666' }}>{user.email}</td>
                  <td style={{ padding: '15px 20px' }}>
                    {user.isAdmin ? (
                      <span style={{ color: 'red', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', background: '#ffebee', width: 'fit-content', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                        <FiShield /> Admin
                      </span>
                    ) : (
                      <span style={{ color: 'green', display: 'flex', alignItems: 'center', gap: '5px', background: '#e8f5e9', width: 'fit-content', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                        <FiUser /> User
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                    {!user.isAdmin && (
                      <button onClick={() => handleDelete(user._id)} style={{ background: '#ffebee', color: '#e74c3c', border: 'none', width: '35px', height: '35px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiTrash2 />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const thStyle = { padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '600', letterSpacing: '1px' };

export default AdminUsers;