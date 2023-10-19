import React, { useEffect } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/QuestoPages/HomePage';
import Question from './components/AddQuestion/Question';
import ViewPage from './components/ViewQuestion/ViewPage';
import Index from './components/Auth/Index';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const auth = getAuth()

  /*useEffect(()=>{
    auth.onAuthStateChanged
  },[])*/
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}></Route>
        <Route path='/add-question' element={<Question/>}></Route>
        <Route path='/question' element={<ViewPage/>}></Route>
        <Route path='/auth' element={<Index/>}></Route>
        </Routes>
      </BrowserRouter>
      
     </div>
  );
}

export default App;
