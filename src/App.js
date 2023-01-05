// import logo from './logo.svg';
import './App.css';
// import StudentList from './StudentList';
import rootReducer from "./store/rootReducer";
import React, { Fragment } from 'react';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import { Provider } from "react-redux";
import ListForm from './Form/ListForm';
import AddForm from './Form/AddForm';
import EditForm from './Form/EditForm';
import MainPage from './Form/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Form/Navbar';
import AdmimPage from './Form/admimPage';
const store = createStore(rootReducer, applyMiddleware(thunk));
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar/>
        <BrowserRouter>
          <Routes>
          <Route index element={<MainPage />} />
            <Route path='/ListForm' element={<ListForm />} />
            <Route path='/AddForm' element={<AddForm />} />
            <Route path='/EditForm' element={<EditForm />} />
            <Route path='/admimPage' element={<AdmimPage/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
