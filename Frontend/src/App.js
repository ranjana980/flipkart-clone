import './App.css';
import rootReducer from "./store/rootReducer";
import React from 'react';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductList } from './admin-product/product-list';
import Navbar from './components/navbar';
import { Auth } from './auth/auth';
import Footer from './components/footer';
import Home from './components/home-page';
import HeaderMenu from './section-component/HeaderMenu';
import FlipCartPlusZone from './pages/flipcart-plus-zone';
import GiftCardsStore from './pages/gift-cards-store';
import CartItem from './pages/cart';
import BecomeASeller from './pages/become-a-seller';
import UserProfile from './pages/user-profile';

const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <HeaderMenu />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/account" element={<Auth />} />
            <Route path='/ListForm' element={<ProductList />} />
            <Route path="/plus" element={<FlipCartPlusZone />} />
            <Route path="/gift-cards-store" element={<GiftCardsStore />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/become-a-seller" element={<BecomeASeller />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
