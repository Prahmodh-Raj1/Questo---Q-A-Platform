import React from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/QuestoPages/HomePage';
import Question from './components/AddQuestion/Question';
import ViewPage from './components/ViewQuestion/ViewPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}></Route>
        <Route path='/add-question' element={<Question/>}></Route>
        <Route path='/question' element={<ViewPage/>}></Route>
        </Routes>
      </BrowserRouter>
      
     </div>
  );
}

export default App;
