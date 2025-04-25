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
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
