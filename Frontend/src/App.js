import './App.css';
import rootReducer from "./store/rootReducer";
import React from 'react';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import { Auth } from './auth/auth';
import Footer from './components/footer';
import FlipCartPlusZone from './pages/user/flipcart-plus-zone';
import GiftCardsStore from './pages/user/gift-cards-store';
import CartItem from './pages/user/cart';
import BecomeASeller from './pages/user/become-a-seller';
import UserProfile from './pages/user/user-profile';
import HomePage from './pages/user/home-page';
import ProductCotegory from './pages/user/category/subcategory';
import AdminProductList from './pages/admin/product-list';
import AdminDashboard from './pages/admin/dashboard';
import UserList from './pages/admin/userlist';
import WishList from './pages/user/wish-list';

const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/account" element={<Auth />} />
            {/* <Route path='/product-list' element={<ProductList />} /> */}
            <Route path='/:category/:subcategory' element={<ProductCotegory />} />
            <Route path="/plus" element={<FlipCartPlusZone />} />
            <Route path="/gift-cards-store" element={<GiftCardsStore />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/become-a-seller" element={<BecomeASeller />} />

            {/* admin section routes */}
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/user-list' element={<UserList />} />
            <Route path='/admin/product-list' element={<AdminProductList />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
