import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// customer pages
import Signin from './pages/user/SigninPage';
import Signup from './pages/user/SignupPage';
import GalleryPage from './pages/user/GalleryPage';
import ProductDetailPage from './pages/user/ProductDetailPage'
import CartPage from './pages/user/CartPage';
import ChekOutPage from './pages/user/ChekOutPage';
import PlaceOrderPage from './pages/user/PlaceOrderPage';
import UserProfile from './pages/user/UserProfile';

// admin pages
import AdminLayout from './pages/admin/AdminLayout';
import ProductList from './pages/admin/ProductsManagement'
import OrderManagement from './pages/admin/OrderManagement'
import CategoryManagement from './pages/admin/CategoryManagement'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* customer */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ChekOutPage />} />
          <Route path="/placeOrder" element={<PlaceOrderPage />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* admin - AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
