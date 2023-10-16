import React from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/QuestoPages/HomePage';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
      
     </div>
  );
}

export default App;
