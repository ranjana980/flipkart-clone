import './App.css';
import rootReducer from "./store/rootReducer";
import React from 'react';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import MainPage from './form/main-page';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './form/navbar';
import { ProductList } from './admin-product/product-list';

const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar/>
        <BrowserRouter>
          <Routes>
          <Route index element={<MainPage />} />
            <Route path='/ListForm' element={<ProductList />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
