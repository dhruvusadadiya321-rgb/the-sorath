import React from 'react';
import { Outlet } from 'react-router-dom'; // <--- Aa jaruri che nested routes mate
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      
      {/* 1. Left Side: Sidebar */}
      <Sidebar />

      {/* 2. Right Side: Dynamic Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: '260px', // Sidebar ni width jitli jagya chhodi
        background: '#f4f6f8', 
        minHeight: '100vh',
        padding: '30px',
        width: 'calc(100% - 260px)' // Remaining width
      }}>
        
        {/* Ahiya badha admin pages (Dashboard, Products etc.) render thase */}
        <Outlet /> 
        
      </div>
    </div>
  );
};

export default AdminLayout;