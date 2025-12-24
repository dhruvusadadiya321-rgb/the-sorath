import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/client/Navbar';
import Footer from '../components/common/Footer'; 
const UserLayout = () => {
  return (
    <div className="user-layout">
      {/* Header */}
      <Navbar/>
      
      {/* Main Content */}
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>

      {/* New Big Footer */}
      <Footer /> 
    </div>
  );
};

export default UserLayout;