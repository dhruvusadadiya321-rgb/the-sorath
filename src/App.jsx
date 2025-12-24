import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './components/admin/AdminLayout'; // Check path (components ma che ke layouts ma)

// Pages - Client
import Home from './pages/client/Home';
import Shop from './pages/client/Shop';
import ProductDetails from './pages/client/ProductDetails';
import Cart from './pages/client/Cart';
import Wishlist from './pages/client/Wishlist';
import Checkout from './pages/client/Checkout';
import Login from './pages/client/Login';
import Profile from './pages/client/Profile'; 
import Orders from './pages/client/Orders';
import Settings from './pages/client/Settings';
import Accessories from './pages/client/Accessories'; 
import About from './pages/client/About';

// Pages - Admin (NEW IMPORTS)
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';     // New
import SliderManage from './pages/admin/SliderManage'; // New
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              
              {/* === CLIENT (USER) SIDE ROUTES === */}
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="settings" element={<Settings />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path="accessories" element={<Accessories />} />
                <Route path="about" element={<About />} />
              </Route>

              {/* === ADMIN SIDE ROUTES === */}
              {/* Note: AdminLayout ma <Outlet /> hovu jaruri che aa rite vaparva mate */}
              <Route path="/admin" element={<AdminLayout />}>
                
                {/* Default: Dashboard */}
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Products */}
                <Route path="products" element={<Products />} />
                <Route path="product/new" element={<AddProduct />} />
                
                {/* Slider */}
                <Route path="slider" element={<SliderManage />} />
                
                {/* Orders */}
               <Route path="orders" element={<AdminOrders />} />
               <Route path="users" element={<AdminUsers />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;